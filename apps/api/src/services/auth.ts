import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "./jwt.js";
import { createError } from "../middleware/errorHandler.js";
import { logger } from "../utils/logger.js";
import type { LoginResponse, User } from "@bookbiteflow/shared-types";

const prisma = new PrismaClient();

// ─── MOCK users for dev when database is unavailable ───
// MOCK — remove when PostgreSQL is connected
const MOCK_USERS = [
  {
    id: "mock-admin-001",
    email: "admin@zuno.com",
    name: "Super Admin",
    passwordHash: "$2a$12$LJ3rFvKwHMVrJY3sYOXzF.Py.GxC5UKk9kOYkDTPOqFfiVrZqy3Ge", // admin123
    role: "SUPER_ADMIN" as const,
    isActive: true,
    avatar: null,
    lastLogin: null,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date(),
  },
  {
    id: "mock-owner-001",
    email: "rajesh@goldenspoon.com",
    name: "Rajesh Kumar",
    passwordHash: "$2a$12$LJ3rFvKwHMVrJY3sYOXzF.Py.GxC5UKk9kOYkDTPOqFfiVrZqy3Ge", // owner123
    role: "RESTAURANT_OWNER" as const,
    isActive: true,
    avatar: null,
    lastLogin: null,
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date(),
  },
  {
    id: "mock-support-001",
    email: "support@zuno.com",
    name: "Support Agent",
    passwordHash: "$2a$12$LJ3rFvKwHMVrJY3sYOXzF.Py.GxC5UKk9kOYkDTPOqFfiVrZqy3Ge", // support123
    role: "CUSTOMER_SUPPORT" as const,
    isActive: true,
    avatar: null,
    lastLogin: null,
    createdAt: new Date("2024-06-01"),
    updatedAt: new Date(),
  },
];

// Track whether DB is available
let dbAvailable: boolean | null = null;

async function isDatabaseAvailable(): Promise<boolean> {
  if (dbAvailable !== null) return dbAvailable;
  try {
    // Check that the 'users' table actually exists, not just the connection.
    // The DB may be reachable (e.g. Supabase) but admin tables not yet migrated.
    const result = await prisma.$queryRaw<Array<{ exists: boolean }>>`
      SELECT EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'users'
      ) AS exists
    `;
    const tableExists = result[0]?.exists === true;
    if (tableExists) {
      dbAvailable = true;
      logger.info("✅ Database connection established (users table found)");
      return true;
    } else {
      dbAvailable = false;
      logger.warn("⚠️  Database reachable but 'users' table missing — using mock auth. Run 'prisma migrate dev' to create tables.");
      return false;
    }
  } catch {
    dbAvailable = false;
    logger.warn("⚠️  Database unavailable — using mock auth (no PostgreSQL needed for dev)");
    return false;
  }
}

/**
 * Authenticate a user with email + password.
 * Falls back to mock users if database is unavailable.
 */
export async function loginUser(
  email: string,
  password: string,
  _ipAddress?: string,
  _userAgent?: string
): Promise<LoginResponse> {
  const useDb = await isDatabaseAvailable();

  if (useDb) {
    // ─── Real database auth ───
    let dbUser = await prisma.user.findUnique({ where: { email } });

    if (!dbUser) {
      // Dynamic auto-registration in the database!
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      const name = email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      dbUser = await prisma.user.create({
        data: {
          email,
          name,
          passwordHash,
          role: "RESTAURANT_OWNER",
          isActive: true,
        },
      });
      logger.info(`✨ Dynamic user registered in database: ${email}`);
    }

    if (!dbUser.isActive) {
      throw createError(403, "Your account has been deactivated. Contact support.");
    }

    const isPasswordValid = await bcrypt.compare(password, dbUser.passwordHash);
    if (!isPasswordValid) {
      throw createError(401, "Invalid email or password.");
    }

    const tokenPayload = {
      userId: dbUser.id,
      email: dbUser.email,
      role: dbUser.role as any,
    };

    const accessToken = signAccessToken(tokenPayload);
    const refreshToken = signRefreshToken(tokenPayload);

    // Store refresh token in sessions table
    await prisma.session.create({
      data: {
        userId: dbUser.id,
        refreshToken,
        ipAddress: _ipAddress,
        userAgent: _userAgent,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    await prisma.user.update({
      where: { id: dbUser.id },
      data: { lastLogin: new Date() },
    });

    await prisma.auditLog.create({
      data: {
        userId: dbUser.id,
        action: "LOGIN",
        resource: "AUTH",
        ipAddress: _ipAddress,
        userAgent: _userAgent,
      },
    });

    const user: User = {
      id: dbUser.id,
      email: dbUser.email,
      name: dbUser.name,
      avatar: dbUser.avatar || undefined,
      role: dbUser.role as any,
      isActive: dbUser.isActive,
      lastLogin: dbUser.lastLogin?.toISOString(),
      createdAt: dbUser.createdAt.toISOString(),
      updatedAt: dbUser.updatedAt.toISOString(),
    };

    return { user, accessToken, refreshToken };
  }

  // ─── MOCK auth — no database required ───
  let mockUser = MOCK_USERS.find((u) => u.email === email);

  if (!mockUser) {
    // Dynamic auto-registration in mock list
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const name = email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    mockUser = {
      id: `mock-dynamic-${Date.now()}`,
      email,
      name,
      passwordHash,
      role: "RESTAURANT_OWNER" as const,
      isActive: true,
      avatar: null,
      lastLogin: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    MOCK_USERS.push(mockUser);
    logger.info(`✨ Mock user dynamically registered: ${email}`);
  }

  // For mock mode, accept the password if it's dynamic, otherwise check known
  const validPasswords: Record<string, string> = {
    "admin@zuno.com": "admin123",
    "rajesh@goldenspoon.com": "owner123",
    "support@zuno.com": "support123",
  };

  const expectedPassword = validPasswords[email];
  if (expectedPassword && expectedPassword !== password) {
    throw createError(401, "Invalid email or password.");
  } else if (!expectedPassword) {
    const isPasswordValid = await bcrypt.compare(password, mockUser.passwordHash);
    if (!isPasswordValid) {
      throw createError(401, "Invalid email or password.");
    }
  }

  const tokenPayload = {
    userId: mockUser.id,
    email: mockUser.email,
    role: mockUser.role as any,
  };

  const accessToken = signAccessToken(tokenPayload);
  const refreshToken = signRefreshToken(tokenPayload);

  const user: User = {
    id: mockUser.id,
    email: mockUser.email,
    name: mockUser.name,
    avatar: undefined,
    role: mockUser.role as any,
    isActive: mockUser.isActive,
    lastLogin: new Date().toISOString(),
    createdAt: mockUser.createdAt.toISOString(),
    updatedAt: mockUser.updatedAt.toISOString(),
  };

  logger.info(`🔓 Mock login: ${email} (${mockUser.role})`);
  return { user, accessToken, refreshToken };
}

/**
 * Refresh the access token using a valid refresh token.
 */
export async function refreshAccessToken(refreshToken: string) {
  const payload = verifyRefreshToken(refreshToken);

  const useDb = await isDatabaseAvailable();

  if (useDb) {
    const session = await prisma.session.findUnique({
      where: { refreshToken },
    });

    if (!session || session.expiresAt < new Date()) {
      throw createError(401, "Invalid or expired refresh token.");
    }

    const newAccessToken = signAccessToken({
      userId: payload.userId,
      email: payload.email,
      role: payload.role as any,
    });

    const newRefreshToken = signRefreshToken({
      userId: payload.userId,
      email: payload.email,
      role: payload.role as any,
    });

    await prisma.session.update({
      where: { id: session.id },
      data: {
        refreshToken: newRefreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  // MOCK — just re-sign tokens without session validation
  const newAccessToken = signAccessToken({
    userId: payload.userId,
    email: payload.email,
    role: payload.role as any,
  });

  const newRefreshToken = signRefreshToken({
    userId: payload.userId,
    email: payload.email,
    role: payload.role as any,
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
}

/**
 * Invalidate a refresh token (logout).
 */
export async function logoutUser(refreshToken: string, userId: string) {
  const useDb = await isDatabaseAvailable();

  if (useDb) {
    await prisma.session.deleteMany({
      where: { refreshToken, userId },
    });

    await prisma.auditLog.create({
      data: {
        userId,
        action: "LOGOUT",
        resource: "AUTH",
      },
    });
  }
  // MOCK — nothing to clean up in mock mode
  logger.info(`🔒 Logout: ${userId}`);
}

/**
 * Get user by ID.
 */
export async function getUserById(userId: string): Promise<User | null> {
  const useDb = await isDatabaseAvailable();

  if (useDb) {
    const dbUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!dbUser) return null;

    return {
      id: dbUser.id,
      email: dbUser.email,
      name: dbUser.name,
      avatar: dbUser.avatar || undefined,
      role: dbUser.role as any,
      isActive: dbUser.isActive,
      lastLogin: dbUser.lastLogin?.toISOString(),
      createdAt: dbUser.createdAt.toISOString(),
      updatedAt: dbUser.updatedAt.toISOString(),
    };
  }

  // MOCK — lookup from mock users
  const mockUser = MOCK_USERS.find((u) => u.id === userId);
  if (!mockUser) return null;

  return {
    id: mockUser.id,
    email: mockUser.email,
    name: mockUser.name,
    avatar: undefined,
    role: mockUser.role as any,
    isActive: mockUser.isActive,
    lastLogin: new Date().toISOString(),
    createdAt: mockUser.createdAt.toISOString(),
    updatedAt: mockUser.updatedAt.toISOString(),
  };
}

// ─── Database Seed Script ───
// Creates default Super Admin user, roles, and settings

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...\n");

  // ─── Create Super Admin User ───
  const passwordHash = await bcrypt.hash("admin123", 12);

  const superAdmin = await prisma.user.upsert({
    where: { email: "admin@bookbiteflow.com" },
    update: {},
    create: {
      email: "admin@bookbiteflow.com",
      name: "Super Admin",
      passwordHash,
      role: "SUPER_ADMIN",
      isActive: true,
    },
  });
  console.log(`✅ Super Admin created: ${superAdmin.email}`);

  // Create a demo restaurant owner
  const ownerHash = await bcrypt.hash("owner123", 12);
  const owner = await prisma.user.upsert({
    where: { email: "rajesh@goldenspoon.com" },
    update: {},
    create: {
      email: "rajesh@goldenspoon.com",
      name: "Rajesh Kumar",
      passwordHash: ownerHash,
      role: "RESTAURANT_OWNER",
      isActive: true,
    },
  });
  console.log(`✅ Restaurant Owner created: ${owner.email}`);

  // Create a demo support user
  const supportHash = await bcrypt.hash("support123", 12);
  const support = await prisma.user.upsert({
    where: { email: "support@bookbiteflow.com" },
    update: {},
    create: {
      email: "support@bookbiteflow.com",
      name: "Support Agent",
      passwordHash: supportHash,
      role: "CUSTOMER_SUPPORT",
      isActive: true,
    },
  });
  console.log(`✅ Support Agent created: ${support.email}`);

  // ─── Seed Role Permissions ───
  const allResources = [
    "RESTAURANTS", "CUSTOMERS", "ORDERS", "RESERVATIONS", "MENUS",
    "PAYMENTS", "ANALYTICS", "REVIEWS", "SETTINGS", "USERS",
    "SUPPORT_TICKETS", "FINANCE", "TABLES", "OFFERS", "NOTIFICATIONS",
  ] as const;

  const allActions = [
    "CREATE", "READ", "UPDATE", "DELETE", "APPROVE", "REJECT", "SUSPEND",
  ] as const;

  // Super Admin gets all permissions
  for (const resource of allResources) {
    for (const action of allActions) {
      await prisma.rolePermission.upsert({
        where: {
          role_resource_action: {
            role: "SUPER_ADMIN",
            resource,
            action,
          },
        },
        update: {},
        create: { role: "SUPER_ADMIN", resource, action },
      });
    }
  }
  console.log(`✅ Super Admin permissions seeded (${allResources.length * allActions.length} permissions)`);

  // Restaurant Owner: limited permissions
  const ownerPermissions = [
    { resource: "RESTAURANTS", actions: ["READ", "UPDATE"] },
    { resource: "ORDERS", actions: ["READ", "UPDATE"] },
    { resource: "MENUS", actions: ["CREATE", "READ", "UPDATE", "DELETE"] },
    { resource: "RESERVATIONS", actions: ["READ", "UPDATE"] },
    { resource: "TABLES", actions: ["READ", "UPDATE"] },
    { resource: "ANALYTICS", actions: ["READ"] },
    { resource: "REVIEWS", actions: ["READ"] },
    { resource: "PAYMENTS", actions: ["READ"] },
  ] as const;

  for (const perm of ownerPermissions) {
    for (const action of perm.actions) {
      await prisma.rolePermission.upsert({
        where: {
          role_resource_action: {
            role: "RESTAURANT_OWNER",
            resource: perm.resource,
            action,
          },
        },
        update: {},
        create: { role: "RESTAURANT_OWNER", resource: perm.resource, action },
      });
    }
  }
  console.log(`✅ Restaurant Owner permissions seeded`);

  // ─── Seed Default Settings ───
  const settings = [
    { key: "platform.commission_rate", value: "12", type: "number", description: "Platform commission percentage", category: "finance" },
    { key: "platform.tax_rate", value: "5", type: "number", description: "Default GST rate", category: "finance" },
    { key: "platform.currency", value: "INR", type: "string", description: "Default currency", category: "general" },
    { key: "platform.name", value: "BookBiteFlow", type: "string", description: "Platform name", category: "general" },
    { key: "notifications.email_enabled", value: "true", type: "boolean", description: "Enable email notifications", category: "notifications" },
    { key: "notifications.sms_enabled", value: "false", type: "boolean", description: "Enable SMS notifications", category: "notifications" },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }
  console.log(`✅ Default settings seeded (${settings.length} settings)`);

  console.log("\n🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

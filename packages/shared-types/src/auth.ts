// ─── User Roles ───
export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  RESTAURANT_OWNER = "RESTAURANT_OWNER",
  RESTAURANT_MANAGER = "RESTAURANT_MANAGER",
  SUPPORT_TEAM = "SUPPORT_TEAM",
  CUSTOMER_SUPPORT = "CUSTOMER_SUPPORT",
  FINANCE_TEAM = "FINANCE_TEAM",
  DELIVERY_MANAGER = "DELIVERY_MANAGER",
}

// ─── Permission Actions ───
export enum PermissionAction {
  CREATE = "CREATE",
  READ = "READ",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  APPROVE = "APPROVE",
  REJECT = "REJECT",
  SUSPEND = "SUSPEND",
}

// ─── Permission Resources ───
export enum PermissionResource {
  RESTAURANTS = "RESTAURANTS",
  CUSTOMERS = "CUSTOMERS",
  ORDERS = "ORDERS",
  RESERVATIONS = "RESERVATIONS",
  MENUS = "MENUS",
  PAYMENTS = "PAYMENTS",
  ANALYTICS = "ANALYTICS",
  REVIEWS = "REVIEWS",
  SETTINGS = "SETTINGS",
  USERS = "USERS",
  SUPPORT_TICKETS = "SUPPORT_TICKETS",
  FINANCE = "FINANCE",
  TABLES = "TABLES",
  OFFERS = "OFFERS",
  NOTIFICATIONS = "NOTIFICATIONS",
}

// ─── Auth Types ───
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  id: string;
  resource: PermissionResource;
  action: PermissionAction;
}

export interface Role {
  id: string;
  name: UserRole;
  description: string;
  permissions: Permission[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

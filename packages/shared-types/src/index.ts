// ─── Common API Response Types ───
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasMore: boolean;
  };
}

export interface ApiError {
  success: false;
  message: string;
  errors?: { field: string; message: string }[];
  statusCode: number;
}

// ─── Notification ───
export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  link?: string;
  createdAt: string;
}

// ─── Audit Log ───
export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

// ─── Settings ───
export interface Setting {
  key: string;
  value: string;
  type: "string" | "number" | "boolean" | "json";
  description: string;
  category: string;
}

// ─── Re-exports ───
export * from "./auth";
export * from "./restaurant";
export * from "./order";
export * from "./reservation";
export * from "./customer";
export * from "./menu";
export * from "./payment";
export * from "./analytics";

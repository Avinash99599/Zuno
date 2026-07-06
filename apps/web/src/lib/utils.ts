import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency in INR
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a number with Indian notation (lakhs, crores)
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-IN").format(num);
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
  });
}

/**
 * Get status color class
 */
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    ACTIVE: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
    OPEN: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
    COMPLETED: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
    READY: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
    DELIVERED: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
    PAID: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
    PUBLISHED: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
    AVAILABLE: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
    CONFIRMED: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
    PLACED: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
    BOOKED: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
    RESERVED: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
    PREPARING: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
    COOKING: "bg-orange-500/15 text-orange-700 dark:text-orange-400",
    BUSY: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
    OCCUPIED: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
    PENDING: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
    CANCELLED: "bg-red-500/15 text-red-700 dark:text-red-400",
    SUSPENDED: "bg-red-500/15 text-red-700 dark:text-red-400",
    REJECTED: "bg-red-500/15 text-red-700 dark:text-red-400",
    FAILED: "bg-red-500/15 text-red-700 dark:text-red-400",
    FLAGGED: "bg-red-500/15 text-red-700 dark:text-red-400",
    NO_SHOW: "bg-red-500/15 text-red-700 dark:text-red-400",
    REFUNDED: "bg-violet-500/15 text-violet-700 dark:text-violet-400",
    INACTIVE: "bg-gray-500/15 text-gray-700 dark:text-gray-400",
    CLOSED: "bg-gray-500/15 text-gray-700 dark:text-gray-400",
    HIDDEN: "bg-gray-500/15 text-gray-700 dark:text-gray-400",
    CLEANING: "bg-gray-500/15 text-gray-700 dark:text-gray-400",
    DINING: "bg-violet-500/15 text-violet-700 dark:text-violet-400",
  };
  return colors[status] || "bg-gray-500/15 text-gray-600 dark:text-gray-400";
}

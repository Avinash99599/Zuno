// ─── Dashboard Stats ───
export interface DashboardStats {
  restaurants: {
    total: number;
    active: number;
    inactive: number;
    pending: number;
  };
  customers: {
    total: number;
    newToday: number;
    activeToday: number;
  };
  orders: {
    totalToday: number;
    pending: number;
    preparing: number;
    ready: number;
    completed: number;
    cancelled: number;
  };
  reservations: {
    totalToday: number;
    upcoming: number;
    dining: number;
    completed: number;
  };
  revenue: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    thisYear: number;
    averageOrderValue: number;
  };
  tables: {
    totalOccupied: number;
    totalAvailable: number;
  };
  payments: {
    advancePending: number;
    pendingSettlement: number;
  };
}

// ─── Chart Data Points ───
export interface TimeSeriesDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface RevenueChartData {
  daily: TimeSeriesDataPoint[];
  weekly: TimeSeriesDataPoint[];
  monthly: TimeSeriesDataPoint[];
}

export interface OrderChartData {
  hourly: TimeSeriesDataPoint[];
  daily: TimeSeriesDataPoint[];
}

// ─── Activity Timeline ───
export interface ActivityItem {
  id: string;
  type:
    | "NEW_RESTAURANT"
    | "NEW_ORDER"
    | "NEW_RESERVATION"
    | "PAYMENT_RECEIVED"
    | "ORDER_COMPLETED"
    | "RESTAURANT_APPROVED"
    | "MENU_UPDATED"
    | "REVIEW_POSTED"
    | "CANCELLATION";
  title: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

// ─── Heatmap ───
export interface HeatmapData {
  hour: number; // 0-23
  day: number; // 0-6 (Sun-Sat)
  value: number;
}

// ─── Top Items ───
export interface TopItem {
  id: string;
  name: string;
  value: number;
  change?: number; // percentage change
  image?: string;
}

// ─── Analytics Overview ───
export interface AnalyticsOverview {
  revenue: RevenueChartData;
  orders: OrderChartData;
  topRestaurants: TopItem[];
  topMenuItems: TopItem[];
  topCustomers: TopItem[];
  peakHours: HeatmapData[];
  customerRetentionRate: number;
  cancellationRate: number;
  averageDiningTime: number;
  averagePreparationTime: number;
}

// ─── Reservation Status ───
export enum ReservationStatus {
  BOOKED = "BOOKED",
  CONFIRMED = "CONFIRMED",
  PREPARING_FOOD = "PREPARING_FOOD",
  CUSTOMER_STARTED_JOURNEY = "CUSTOMER_STARTED_JOURNEY",
  CUSTOMER_NEAR = "CUSTOMER_NEAR",
  CUSTOMER_ARRIVED = "CUSTOMER_ARRIVED",
  FOOD_READY = "FOOD_READY",
  DINING = "DINING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

// ─── Reservation Type ───
export enum ReservationType {
  WALK_IN = "WALK_IN",
  PRE_BOOKING = "PRE_BOOKING",
}

// ─── Occasion ───
export enum Occasion {
  BIRTHDAY = "BIRTHDAY",
  ANNIVERSARY = "ANNIVERSARY",
  DATE_NIGHT = "DATE_NIGHT",
  BUSINESS = "BUSINESS",
  FAMILY = "FAMILY",
  OTHER = "OTHER",
  NONE = "NONE",
}

// ─── Reservation ───
export interface Reservation {
  id: string;
  restaurantId: string;
  restaurantName: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  numberOfMembers: number;
  tableNumber?: number;
  status: ReservationStatus;
  type: ReservationType;
  expectedArrival: string;
  estimatedArrival?: string;
  specialRequest?: string;
  occasion: Occasion;
  orderId?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Reservation Stats ───
export interface ReservationStats {
  total: number;
  booked: number;
  confirmed: number;
  dining: number;
  completed: number;
  cancelled: number;
}

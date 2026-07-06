// ─── Order Status ───
export enum OrderStatus {
  PLACED = "PLACED",
  CONFIRMED = "CONFIRMED",
  PREPARING = "PREPARING",
  COOKING = "COOKING",
  PACKED = "PACKED",
  READY = "READY",
  SERVED = "SERVED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

// ─── Payment Method ───
export enum PaymentMethod {
  CASH = "CASH",
  CARD = "CARD",
  UPI = "UPI",
  WALLET = "WALLET",
  NET_BANKING = "NET_BANKING",
}

// ─── Order Item ───
export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  image?: string;
  quantity: number;
  price: number;
  customization?: string;
  extraInstructions?: string;
}

// ─── Order ───
export interface Order {
  id: string;
  restaurantId: string;
  restaurantName: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  advancePaid: number;
  remainingAmount: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  preparationTimer?: number; // in minutes
  kitchenETA?: string;
  orderNotes?: string;
  reservationId?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Order Stats ───
export interface OrderStats {
  total: number;
  pending: number;
  preparing: number;
  ready: number;
  completed: number;
  cancelled: number;
}

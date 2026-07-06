// ─── Payment Status ───
export enum PaymentStatus {
  PENDING = "PENDING",
  ADVANCE_PAID = "ADVANCE_PAID",
  COMPLETED = "COMPLETED",
  REFUNDED = "REFUNDED",
  FAILED = "FAILED",
  PARTIALLY_REFUNDED = "PARTIALLY_REFUNDED",
}

// ─── Payment ───
export interface Payment {
  id: string;
  orderId?: string;
  reservationId?: string;
  restaurantId: string;
  restaurantName: string;
  customerId: string;
  customerName: string;
  amount: number;
  advanceAmount: number;
  remainingAmount: number;
  taxAmount: number;
  serviceCharge: number;
  platformCommission: number;
  restaurantEarnings: number;
  paymentMethod: string;
  status: PaymentStatus;
  transactionId?: string;
  couponCode?: string;
  discountAmount: number;
  refundAmount: number;
  refundReason?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Invoice ───
export interface Invoice {
  id: string;
  paymentId: string;
  invoiceNumber: string;
  restaurantName: string;
  customerName: string;
  items: { name: string; qty: number; price: number }[];
  subtotal: number;
  taxAmount: number;
  serviceCharge: number;
  discount: number;
  total: number;
  generatedAt: string;
  pdfUrl?: string;
}

// ─── Payment Stats ───
export interface PaymentStats {
  totalRevenue: number;
  revenueToday: number;
  revenueThisMonth: number;
  averageOrderValue: number;
  pendingPayments: number;
  advancePayments: number;
  completedPayments: number;
  refundedAmount: number;
}

// ─── Settlement ───
export interface Settlement {
  id: string;
  restaurantId: string;
  restaurantName: string;
  amount: number;
  period: string;
  status: "PENDING" | "PROCESSED" | "FAILED";
  processedAt?: string;
}

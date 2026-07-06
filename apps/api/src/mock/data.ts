// ─── MOCK DATA ─────────────────────────────────────────────────────
// MOCK — replace when real API contract is confirmed
// This file provides realistic sample data for all external entities
// (restaurants, customers, orders, reservations) that would normally
// come from the Customer Website and Restaurant Website APIs.
// ─────────────────────────────────────────────────────────────────────

import type {
  Restaurant,
  RestaurantListItem,
  Customer,
  CustomerListItem,
  Order,
  Reservation,
  DashboardStats,
  RevenueChartData,
  OrderChartData,
  ActivityItem,
  HeatmapData,
  TopItem,
} from "@bookbiteflow/shared-types";

import {
  RestaurantStatus,
  KitchenStatus,
  PaymentMethod,
  OrderStatus,
  ReservationStatus,
  ReservationType,
  Occasion,
} from "@bookbiteflow/shared-types";

// ─── Mock Restaurants ───
export const mockRestaurants: Restaurant[] = [
  {
    id: "rest-001",
    name: "The Golden Spoon",
    ownerName: "Rajesh Kumar",
    email: "rajesh@goldenspoon.com",
    phone: "+91 98765 43210",
    location: { address: "123 MG Road", city: "Mumbai", state: "Maharashtra", zipCode: "400001", country: "India", lat: 19.076, lng: 72.8777 },
    gstNumber: "27AADCG1234A1Z5",
    openingHours: "10:00",
    closingHours: "23:00",
    status: RestaurantStatus.ACTIVE,
    rating: 4.5,
    totalReviews: 342,
    numberOfTables: 25,
    cuisine: ["North Indian", "Mughlai", "Chinese"],
    images: [],
    bannerImage: undefined,
    logo: undefined,
    kitchenStatus: KitchenStatus.OPEN,
    liveCapacity: 100,
    seatAvailability: 42,
    preparationTime: 25,
    averageRating: 4.5,
    totalEarnings: 2450000,
    monthlyEarnings: 320000,
    bankDetails: { accountName: "Golden Spoon Pvt Ltd", accountNumber: "1234567890", bankName: "HDFC Bank", ifscCode: "HDFC0001234" },
    taxRate: 5,
    serviceChargeRate: 10,
    platformCommissionRate: 12,
    isAcceptingOrders: true,
    isAcceptingReservations: true,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2025-07-01T08:30:00Z",
  },
  {
    id: "rest-002",
    name: "Sakura Japanese Kitchen",
    ownerName: "Aiko Tanaka",
    email: "aiko@sakurakitchen.com",
    phone: "+91 98765 43211",
    location: { address: "45 Brigade Road", city: "Bangalore", state: "Karnataka", zipCode: "560001", country: "India", lat: 12.9716, lng: 77.5946 },
    gstNumber: "29AADCS5678B2Z3",
    openingHours: "11:00",
    closingHours: "22:30",
    status: RestaurantStatus.ACTIVE,
    rating: 4.8,
    totalReviews: 189,
    numberOfTables: 18,
    cuisine: ["Japanese", "Sushi", "Ramen"],
    images: [],
    kitchenStatus: KitchenStatus.OPEN,
    liveCapacity: 72,
    seatAvailability: 28,
    preparationTime: 30,
    averageRating: 4.8,
    totalEarnings: 1890000,
    monthlyEarnings: 280000,
    taxRate: 5,
    serviceChargeRate: 12,
    platformCommissionRate: 12,
    isAcceptingOrders: true,
    isAcceptingReservations: true,
    createdAt: "2024-03-20T10:00:00Z",
    updatedAt: "2025-06-28T14:20:00Z",
  },
  {
    id: "rest-003",
    name: "Pizza Paradise",
    ownerName: "Marco Rossi",
    email: "marco@pizzaparadise.com",
    phone: "+91 98765 43212",
    location: { address: "78 Connaught Place", city: "New Delhi", state: "Delhi", zipCode: "110001", country: "India", lat: 28.6315, lng: 77.2167 },
    gstNumber: "07AADCP9012C3Z1",
    openingHours: "11:00",
    closingHours: "23:30",
    status: RestaurantStatus.ACTIVE,
    rating: 4.2,
    totalReviews: 567,
    numberOfTables: 30,
    cuisine: ["Italian", "Pizza", "Pasta"],
    images: [],
    kitchenStatus: KitchenStatus.BUSY,
    liveCapacity: 120,
    seatAvailability: 15,
    preparationTime: 20,
    averageRating: 4.2,
    totalEarnings: 3100000,
    monthlyEarnings: 410000,
    taxRate: 5,
    serviceChargeRate: 8,
    platformCommissionRate: 12,
    isAcceptingOrders: true,
    isAcceptingReservations: true,
    createdAt: "2023-11-05T10:00:00Z",
    updatedAt: "2025-07-02T09:15:00Z",
  },
  {
    id: "rest-004",
    name: "Spice Garden",
    ownerName: "Priya Nair",
    email: "priya@spicegarden.com",
    phone: "+91 98765 43213",
    location: { address: "22 Marine Drive", city: "Kochi", state: "Kerala", zipCode: "682001", country: "India", lat: 9.9312, lng: 76.2673 },
    openingHours: "09:00",
    closingHours: "22:00",
    status: RestaurantStatus.PENDING,
    rating: 0,
    totalReviews: 0,
    numberOfTables: 15,
    cuisine: ["Kerala", "South Indian", "Seafood"],
    images: [],
    kitchenStatus: KitchenStatus.CLOSED,
    liveCapacity: 60,
    seatAvailability: 60,
    preparationTime: 35,
    averageRating: 0,
    totalEarnings: 0,
    monthlyEarnings: 0,
    taxRate: 5,
    serviceChargeRate: 10,
    platformCommissionRate: 12,
    isAcceptingOrders: false,
    isAcceptingReservations: false,
    createdAt: "2025-07-01T10:00:00Z",
    updatedAt: "2025-07-01T10:00:00Z",
  },
  {
    id: "rest-005",
    name: "Dragon Wok",
    ownerName: "Chen Wei",
    email: "chen@dragonwok.com",
    phone: "+91 98765 43214",
    location: { address: "55 Park Street", city: "Kolkata", state: "West Bengal", zipCode: "700016", country: "India", lat: 22.5518, lng: 88.3532 },
    openingHours: "12:00",
    closingHours: "23:00",
    status: RestaurantStatus.SUSPENDED,
    rating: 3.8,
    totalReviews: 98,
    numberOfTables: 20,
    cuisine: ["Chinese", "Thai", "Pan-Asian"],
    images: [],
    kitchenStatus: KitchenStatus.CLOSED,
    liveCapacity: 80,
    seatAvailability: 80,
    preparationTime: 22,
    averageRating: 3.8,
    totalEarnings: 890000,
    monthlyEarnings: 0,
    taxRate: 5,
    serviceChargeRate: 10,
    platformCommissionRate: 12,
    isAcceptingOrders: false,
    isAcceptingReservations: false,
    createdAt: "2024-06-10T10:00:00Z",
    updatedAt: "2025-06-15T11:00:00Z",
  },
  {
    id: "rest-006",
    name: "Bistro 42",
    ownerName: "Arjun Mehta",
    email: "arjun@bistro42.com",
    phone: "+91 98765 43215",
    location: { address: "42 FC Road", city: "Pune", state: "Maharashtra", zipCode: "411004", country: "India", lat: 18.5204, lng: 73.8567 },
    openingHours: "10:00",
    closingHours: "23:00",
    status: RestaurantStatus.ACTIVE,
    rating: 4.6,
    totalReviews: 215,
    numberOfTables: 22,
    cuisine: ["Continental", "European", "Fusion"],
    images: [],
    kitchenStatus: KitchenStatus.OPEN,
    liveCapacity: 88,
    seatAvailability: 35,
    preparationTime: 28,
    averageRating: 4.6,
    totalEarnings: 1650000,
    monthlyEarnings: 245000,
    taxRate: 5,
    serviceChargeRate: 10,
    platformCommissionRate: 12,
    isAcceptingOrders: true,
    isAcceptingReservations: true,
    createdAt: "2024-02-18T10:00:00Z",
    updatedAt: "2025-07-03T16:45:00Z",
  },
];

export const mockRestaurantListItems: RestaurantListItem[] = mockRestaurants.map((r) => ({
  id: r.id,
  name: r.name,
  ownerName: r.ownerName,
  location: { city: r.location.city, state: r.location.state },
  status: r.status as RestaurantListItem["status"],
  rating: r.rating,
  cuisine: r.cuisine,
  logo: r.logo,
  kitchenStatus: r.kitchenStatus as RestaurantListItem["kitchenStatus"],
  totalEarnings: r.totalEarnings,
  createdAt: r.createdAt,
}));

// ─── Mock Customers ───
export const mockCustomers: Customer[] = [
  { id: "cust-001", name: "Aarav Sharma", email: "aarav@email.com", phone: "+91 99887 76655", totalOrders: 45, totalSpent: 67500, averageOrderValue: 1500, lastOrderDate: "2025-07-03T19:30:00Z", isActive: true, loyaltyPoints: 2250, preferredCuisines: ["North Indian", "Chinese"], dietaryPreferences: ["VEG"], createdAt: "2024-02-10T10:00:00Z", updatedAt: "2025-07-03T19:30:00Z" },
  { id: "cust-002", name: "Sneha Patel", email: "sneha@email.com", phone: "+91 99887 76656", totalOrders: 32, totalSpent: 48000, averageOrderValue: 1500, lastOrderDate: "2025-07-02T20:15:00Z", isActive: true, loyaltyPoints: 1600, preferredCuisines: ["Italian", "Japanese"], dietaryPreferences: ["NON_VEG"], createdAt: "2024-04-05T10:00:00Z", updatedAt: "2025-07-02T20:15:00Z" },
  { id: "cust-003", name: "Vikram Singh", email: "vikram@email.com", phone: "+91 99887 76657", totalOrders: 67, totalSpent: 134000, averageOrderValue: 2000, lastOrderDate: "2025-07-03T21:00:00Z", isActive: true, loyaltyPoints: 6700, preferredCuisines: ["Mughlai", "Continental"], dietaryPreferences: [], createdAt: "2023-12-20T10:00:00Z", updatedAt: "2025-07-03T21:00:00Z" },
  { id: "cust-004", name: "Meera Iyer", email: "meera@email.com", phone: "+91 99887 76658", totalOrders: 12, totalSpent: 14400, averageOrderValue: 1200, lastOrderDate: "2025-06-28T18:45:00Z", isActive: true, loyaltyPoints: 600, preferredCuisines: ["South Indian", "Kerala"], dietaryPreferences: ["VEG", "GLUTEN_FREE"], createdAt: "2025-01-15T10:00:00Z", updatedAt: "2025-06-28T18:45:00Z" },
  { id: "cust-005", name: "Rohan Das", email: "rohan@email.com", phone: "+91 99887 76659", totalOrders: 5, totalSpent: 6500, averageOrderValue: 1300, lastOrderDate: "2025-05-10T13:00:00Z", isActive: false, loyaltyPoints: 250, preferredCuisines: ["Chinese"], dietaryPreferences: [], createdAt: "2025-03-01T10:00:00Z", updatedAt: "2025-05-10T13:00:00Z" },
];

export const mockCustomerListItems: CustomerListItem[] = mockCustomers.map((c) => ({
  id: c.id, name: c.name, email: c.email, phone: c.phone, avatar: c.avatar,
  totalOrders: c.totalOrders, totalSpent: c.totalSpent, isActive: c.isActive, createdAt: c.createdAt,
}));

// ─── Mock Orders ───
export const mockOrders: Order[] = [
  {
    id: "ord-001", restaurantId: "rest-001", restaurantName: "The Golden Spoon", customerId: "cust-001", customerName: "Aarav Sharma", customerPhone: "+91 99887 76655",
    items: [
      { id: "oi-001", menuItemId: "mi-001", name: "Butter Chicken", quantity: 2, price: 450, customization: "Extra gravy" },
      { id: "oi-002", menuItemId: "mi-002", name: "Garlic Naan", quantity: 4, price: 80 },
      { id: "oi-003", menuItemId: "mi-003", name: "Mango Lassi", quantity: 2, price: 150 },
    ],
    totalAmount: 1520, advancePaid: 500, remainingAmount: 1020, paymentMethod: PaymentMethod.UPI, status: OrderStatus.PREPARING, preparationTimer: 25, kitchenETA: "15 mins",
    createdAt: "2025-07-04T04:30:00Z", updatedAt: "2025-07-04T04:35:00Z",
  },
  {
    id: "ord-002", restaurantId: "rest-002", restaurantName: "Sakura Japanese Kitchen", customerId: "cust-002", customerName: "Sneha Patel", customerPhone: "+91 99887 76656",
    items: [
      { id: "oi-004", menuItemId: "mi-004", name: "Salmon Sushi Roll", quantity: 2, price: 650 },
      { id: "oi-005", menuItemId: "mi-005", name: "Miso Ramen", quantity: 1, price: 480 },
    ],
    totalAmount: 1780, advancePaid: 1780, remainingAmount: 0, paymentMethod: PaymentMethod.CARD, status: OrderStatus.READY,
    createdAt: "2025-07-04T04:15:00Z", updatedAt: "2025-07-04T04:50:00Z",
  },
  {
    id: "ord-003", restaurantId: "rest-003", restaurantName: "Pizza Paradise", customerId: "cust-003", customerName: "Vikram Singh", customerPhone: "+91 99887 76657",
    items: [
      { id: "oi-006", menuItemId: "mi-006", name: "Margherita Pizza (Large)", quantity: 1, price: 550 },
      { id: "oi-007", menuItemId: "mi-007", name: "Pepperoni Pizza (Medium)", quantity: 1, price: 650 },
      { id: "oi-008", menuItemId: "mi-008", name: "Garlic Bread", quantity: 2, price: 180 },
    ],
    totalAmount: 1560, advancePaid: 0, remainingAmount: 1560, paymentMethod: PaymentMethod.CASH, status: OrderStatus.COOKING, preparationTimer: 20,
    createdAt: "2025-07-04T04:45:00Z", updatedAt: "2025-07-04T04:50:00Z",
  },
  {
    id: "ord-004", restaurantId: "rest-001", restaurantName: "The Golden Spoon", customerId: "cust-004", customerName: "Meera Iyer", customerPhone: "+91 99887 76658",
    items: [
      { id: "oi-009", menuItemId: "mi-009", name: "Paneer Tikka", quantity: 1, price: 380 },
      { id: "oi-010", menuItemId: "mi-010", name: "Dal Makhani", quantity: 1, price: 320 },
    ],
    totalAmount: 700, advancePaid: 700, remainingAmount: 0, paymentMethod: PaymentMethod.WALLET, status: OrderStatus.COMPLETED,
    createdAt: "2025-07-03T18:00:00Z", updatedAt: "2025-07-03T19:30:00Z",
  },
  {
    id: "ord-005", restaurantId: "rest-006", restaurantName: "Bistro 42", customerId: "cust-003", customerName: "Vikram Singh", customerPhone: "+91 99887 76657",
    items: [
      { id: "oi-011", menuItemId: "mi-011", name: "Grilled Salmon", quantity: 1, price: 850 },
      { id: "oi-012", menuItemId: "mi-012", name: "Caesar Salad", quantity: 1, price: 350 },
      { id: "oi-013", menuItemId: "mi-013", name: "Tiramisu", quantity: 2, price: 400 },
    ],
    totalAmount: 2000, advancePaid: 500, remainingAmount: 1500, paymentMethod: PaymentMethod.UPI, status: OrderStatus.PLACED,
    createdAt: "2025-07-04T05:00:00Z", updatedAt: "2025-07-04T05:00:00Z",
  },
];

// ─── Mock Reservations ───
export const mockReservations: Reservation[] = [
  {
    id: "res-001", restaurantId: "rest-001", restaurantName: "The Golden Spoon", customerId: "cust-001", customerName: "Aarav Sharma", customerPhone: "+91 99887 76655",
    date: "2025-07-04", time: "19:30", numberOfMembers: 4, tableNumber: 12, status: ReservationStatus.CONFIRMED, type: ReservationType.PRE_BOOKING,
    expectedArrival: "2025-07-04T19:30:00Z", specialRequest: "Window seat preferred", occasion: Occasion.BIRTHDAY,
    createdAt: "2025-07-03T10:00:00Z", updatedAt: "2025-07-03T12:00:00Z",
  },
  {
    id: "res-002", restaurantId: "rest-002", restaurantName: "Sakura Japanese Kitchen", customerId: "cust-002", customerName: "Sneha Patel", customerPhone: "+91 99887 76656",
    date: "2025-07-04", time: "20:00", numberOfMembers: 2, tableNumber: 5, status: ReservationStatus.DINING, type: ReservationType.PRE_BOOKING,
    expectedArrival: "2025-07-04T20:00:00Z", estimatedArrival: "2025-07-04T19:55:00Z", occasion: Occasion.DATE_NIGHT,
    createdAt: "2025-07-02T14:00:00Z", updatedAt: "2025-07-04T04:55:00Z",
  },
  {
    id: "res-003", restaurantId: "rest-003", restaurantName: "Pizza Paradise", customerId: "cust-003", customerName: "Vikram Singh", customerPhone: "+91 99887 76657",
    date: "2025-07-04", time: "13:00", numberOfMembers: 6, tableNumber: 8, status: ReservationStatus.CUSTOMER_STARTED_JOURNEY, type: ReservationType.PRE_BOOKING,
    expectedArrival: "2025-07-04T13:00:00Z", estimatedArrival: "2025-07-04T13:10:00Z", occasion: Occasion.FAMILY,
    createdAt: "2025-07-03T08:00:00Z", updatedAt: "2025-07-04T04:45:00Z",
  },
  {
    id: "res-004", restaurantId: "rest-006", restaurantName: "Bistro 42", customerId: "cust-004", customerName: "Meera Iyer", customerPhone: "+91 99887 76658",
    date: "2025-07-04", time: "19:00", numberOfMembers: 2, status: ReservationStatus.BOOKED, type: ReservationType.PRE_BOOKING,
    expectedArrival: "2025-07-04T19:00:00Z", occasion: Occasion.ANNIVERSARY,
    createdAt: "2025-07-04T03:00:00Z", updatedAt: "2025-07-04T03:00:00Z",
  },
];

// ─── Mock Dashboard Stats ───
export const mockDashboardStats: DashboardStats = {
  restaurants: { total: 6, active: 4, inactive: 1, pending: 1 },
  customers: { total: 5, newToday: 0, activeToday: 4 },
  orders: { totalToday: 5, pending: 1, preparing: 2, ready: 1, completed: 1, cancelled: 0 },
  reservations: { totalToday: 4, upcoming: 2, dining: 1, completed: 0 },
  revenue: { today: 7560, thisWeek: 45200, thisMonth: 198000, thisYear: 2340000, averageOrderValue: 1512 },
  tables: { totalOccupied: 32, totalAvailable: 98 },
  payments: { advancePending: 12500, pendingSettlement: 85000 },
};

// ─── Mock Revenue Chart Data ───
export const mockRevenueChart: RevenueChartData = {
  daily: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(2025, 5, i + 1).toISOString().split("T")[0],
    value: Math.floor(Math.random() * 15000) + 5000,
  })),
  weekly: Array.from({ length: 12 }, (_, i) => ({
    date: `Week ${i + 1}`,
    value: Math.floor(Math.random() * 100000) + 30000,
  })),
  monthly: [
    { date: "Jan", value: 185000 }, { date: "Feb", value: 210000 }, { date: "Mar", value: 195000 },
    { date: "Apr", value: 230000 }, { date: "May", value: 245000 }, { date: "Jun", value: 198000 },
    { date: "Jul", value: 52000 },
  ],
};

// ─── Mock Order Chart Data ───
export const mockOrderChart: OrderChartData = {
  hourly: Array.from({ length: 24 }, (_, i) => ({
    date: `${i}:00`,
    value: i >= 11 && i <= 14 ? Math.floor(Math.random() * 20) + 15 : i >= 18 && i <= 22 ? Math.floor(Math.random() * 30) + 20 : Math.floor(Math.random() * 5),
  })),
  daily: Array.from({ length: 7 }, (_, i) => ({
    date: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
    value: Math.floor(Math.random() * 50) + 20,
  })),
};

// ─── Mock Activity Timeline ───
export const mockActivityTimeline: ActivityItem[] = [
  { id: "act-001", type: "NEW_ORDER", title: "New Order Placed", description: "Aarav Sharma placed an order at The Golden Spoon — ₹1,520", timestamp: "2025-07-04T04:30:00Z" },
  { id: "act-002", type: "PAYMENT_RECEIVED", title: "Advance Payment Received", description: "Sneha Patel paid ₹1,780 for order at Sakura Japanese Kitchen", timestamp: "2025-07-04T04:15:00Z" },
  { id: "act-003", type: "NEW_RESERVATION", title: "New Reservation", description: "Meera Iyer booked a table at Bistro 42 for Anniversary dinner", timestamp: "2025-07-04T03:00:00Z" },
  { id: "act-004", type: "NEW_RESTAURANT", title: "New Restaurant Registered", description: "Spice Garden from Kochi, Kerala has registered and is pending approval", timestamp: "2025-07-01T10:00:00Z" },
  { id: "act-005", type: "ORDER_COMPLETED", title: "Order Completed", description: "Meera Iyer's order at The Golden Spoon has been completed", timestamp: "2025-07-03T19:30:00Z" },
  { id: "act-006", type: "REVIEW_POSTED", title: "New Review", description: "Vikram Singh left a 5-star review for Pizza Paradise", timestamp: "2025-07-03T20:00:00Z" },
  { id: "act-007", type: "MENU_UPDATED", title: "Menu Updated", description: "Sakura Japanese Kitchen added 3 new seasonal items", timestamp: "2025-07-02T14:00:00Z" },
  { id: "act-008", type: "CANCELLATION", title: "Reservation Cancelled", description: "A reservation at Dragon Wok was cancelled due to suspension", timestamp: "2025-06-15T11:00:00Z" },
];

// ─── Mock Heatmap Data (Peak Hours) ───
export const mockHeatmapData: HeatmapData[] = [];
for (let day = 0; day < 7; day++) {
  for (let hour = 0; hour < 24; hour++) {
    let value = 0;
    if (hour >= 11 && hour <= 14) value = Math.floor(Math.random() * 60) + 40;
    else if (hour >= 18 && hour <= 22) value = Math.floor(Math.random() * 80) + 50;
    else if (hour >= 8 && hour <= 10) value = Math.floor(Math.random() * 30) + 10;
    else value = Math.floor(Math.random() * 10);
    if (day >= 5) value = Math.floor(value * 1.3); // Weekends busier
    mockHeatmapData.push({ hour, day, value });
  }
}

// ─── Mock Top Items ───
export const mockTopRestaurants: TopItem[] = [
  { id: "rest-003", name: "Pizza Paradise", value: 3100000, change: 12.5 },
  { id: "rest-001", name: "The Golden Spoon", value: 2450000, change: 8.2 },
  { id: "rest-002", name: "Sakura Japanese Kitchen", value: 1890000, change: 15.1 },
  { id: "rest-006", name: "Bistro 42", value: 1650000, change: 5.7 },
];

export const mockTopMenuItems: TopItem[] = [
  { id: "mi-001", name: "Butter Chicken", value: 1250 },
  { id: "mi-006", name: "Margherita Pizza", value: 980 },
  { id: "mi-004", name: "Salmon Sushi Roll", value: 756 },
  { id: "mi-011", name: "Grilled Salmon", value: 542 },
  { id: "mi-002", name: "Garlic Naan", value: 1890 },
];

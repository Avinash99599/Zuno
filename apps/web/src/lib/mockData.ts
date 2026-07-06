// ─── Centralized Mock Data for Zuno Admin Dashboard ───
// Realistic Indian restaurant data with proper relationships

// ─── RESTAURANTS ───
export interface MockRestaurant {
  id: string;
  name: string;
  logo: string;
  owner: string;
  email: string;
  phone: string;
  address: string;
  cuisine: string[];
  status: "OPEN" | "CLOSED" | "PENDING";
  rating: number;
  totalTables: number;
  todaysOrders: number;
  revenue: number;
  staffCount: number;
  menuCount: number;
  createdAt: string;
  openingHours: { day: string; open: string; close: string }[];
}

export const mockRestaurants: MockRestaurant[] = [
  {
    id: "rest-001",
    name: "The Golden Spoon",
    logo: "🍽️",
    owner: "Rajesh Kumar",
    email: "rajesh@goldenspoon.com",
    phone: "+91 98765 43210",
    address: "42 MG Road, Koramangala, Bengaluru 560034",
    cuisine: ["North Indian", "Mughlai"],
    status: "OPEN",
    rating: 4.7,
    totalTables: 18,
    todaysOrders: 47,
    revenue: 285000,
    staffCount: 24,
    menuCount: 65,
    createdAt: "2024-01-15",
    openingHours: [
      { day: "Mon-Fri", open: "11:00 AM", close: "11:00 PM" },
      { day: "Sat-Sun", open: "10:00 AM", close: "11:30 PM" },
    ],
  },
  {
    id: "rest-002",
    name: "Bistro 42",
    logo: "🍷",
    owner: "Priya Menon",
    email: "priya@bistro42.com",
    phone: "+91 98234 56789",
    address: "15 Brigade Road, Shivajinagar, Bengaluru 560025",
    cuisine: ["Continental", "Italian"],
    status: "OPEN",
    rating: 4.5,
    totalTables: 12,
    todaysOrders: 32,
    revenue: 198000,
    staffCount: 18,
    menuCount: 48,
    createdAt: "2024-03-22",
    openingHours: [
      { day: "Mon-Fri", open: "12:00 PM", close: "10:30 PM" },
      { day: "Sat-Sun", open: "11:00 AM", close: "11:00 PM" },
    ],
  },
  {
    id: "rest-003",
    name: "Spice Garden",
    logo: "🌶️",
    owner: "Arjun Reddy",
    email: "arjun@spicegarden.com",
    phone: "+91 87654 32109",
    address: "78 Indiranagar, 100 Feet Road, Bengaluru 560038",
    cuisine: ["South Indian", "Chettinad"],
    status: "OPEN",
    rating: 4.3,
    totalTables: 15,
    todaysOrders: 38,
    revenue: 165000,
    staffCount: 20,
    menuCount: 55,
    createdAt: "2024-05-10",
    openingHours: [
      { day: "Mon-Sun", open: "7:00 AM", close: "10:30 PM" },
    ],
  },
  {
    id: "rest-004",
    name: "Dragon Wok",
    logo: "🐉",
    owner: "Mei Lin Chen",
    email: "mei@dragonwok.com",
    phone: "+91 99876 54321",
    address: "22 Church Street, Richmond Town, Bengaluru 560025",
    cuisine: ["Chinese", "Thai"],
    status: "OPEN",
    rating: 4.1,
    totalTables: 10,
    todaysOrders: 28,
    revenue: 142000,
    staffCount: 14,
    menuCount: 42,
    createdAt: "2024-06-18",
    openingHours: [
      { day: "Mon-Sun", open: "11:30 AM", close: "11:00 PM" },
    ],
  },
  {
    id: "rest-005",
    name: "Pizza Paradise",
    logo: "🍕",
    owner: "Marco D'Souza",
    email: "marco@pizzaparadise.com",
    phone: "+91 91234 56780",
    address: "55 HSR Layout, Sector 2, Bengaluru 560102",
    cuisine: ["Italian", "Fast Food"],
    status: "CLOSED",
    rating: 4.4,
    totalTables: 8,
    todaysOrders: 0,
    revenue: 0,
    staffCount: 12,
    menuCount: 35,
    createdAt: "2024-08-05",
    openingHours: [
      { day: "Mon-Sun", open: "11:00 AM", close: "11:00 PM" },
    ],
  },
  {
    id: "rest-006",
    name: "Tandoori Nights",
    logo: "🔥",
    owner: "Vikram Singh",
    email: "vikram@tandoorinights.com",
    phone: "+91 88765 43210",
    address: "33 Whitefield Main Road, Bengaluru 560066",
    cuisine: ["North Indian", "Tandoor"],
    status: "PENDING",
    rating: 0,
    totalTables: 20,
    todaysOrders: 0,
    revenue: 0,
    staffCount: 0,
    menuCount: 0,
    createdAt: "2025-07-01",
    openingHours: [
      { day: "Mon-Sun", open: "12:00 PM", close: "11:00 PM" },
    ],
  },
];

// ─── CUSTOMERS ───
export interface MockCustomer {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  totalOrders: number;
  reservations: number;
  totalSpent: number;
  loyaltyPoints: number;
  lastVisit: string;
  status: "ACTIVE" | "INACTIVE";
  joinedAt: string;
  favoriteItems: string[];
  notes: string;
}

export const mockCustomers: MockCustomer[] = [
  {
    id: "cust-001",
    name: "Aarav Sharma",
    avatar: "AS",
    email: "aarav.sharma@gmail.com",
    phone: "+91 98765 11111",
    totalOrders: 34,
    reservations: 12,
    totalSpent: 45600,
    loyaltyPoints: 2280,
    lastVisit: "2025-07-05",
    status: "ACTIVE",
    joinedAt: "2024-02-14",
    favoriteItems: ["Butter Chicken", "Garlic Naan", "Gulab Jamun"],
    notes: "Prefers window seating. Vegetarian options for wife.",
  },
  {
    id: "cust-002",
    name: "Sneha Patel",
    avatar: "SP",
    email: "sneha.patel@outlook.com",
    phone: "+91 87654 22222",
    totalOrders: 28,
    reservations: 8,
    totalSpent: 38900,
    loyaltyPoints: 1945,
    lastVisit: "2025-07-04",
    status: "ACTIVE",
    joinedAt: "2024-03-10",
    favoriteItems: ["Paneer Tikka", "Dal Makhani", "Mango Lassi"],
    notes: "Strictly vegetarian. Allergic to nuts.",
  },
  {
    id: "cust-003",
    name: "Meera Iyer",
    avatar: "MI",
    email: "meera.iyer@yahoo.com",
    phone: "+91 76543 33333",
    totalOrders: 42,
    reservations: 15,
    totalSpent: 62400,
    loyaltyPoints: 3120,
    lastVisit: "2025-07-06",
    status: "ACTIVE",
    joinedAt: "2024-01-20",
    favoriteItems: ["Dosa Platter", "Chettinad Chicken", "Filter Coffee"],
    notes: "VIP customer. Always books for 4+.",
  },
  {
    id: "cust-004",
    name: "Rohan Kapoor",
    avatar: "RK",
    email: "rohan.kapoor@gmail.com",
    phone: "+91 99876 44444",
    totalOrders: 15,
    reservations: 5,
    totalSpent: 21300,
    loyaltyPoints: 1065,
    lastVisit: "2025-06-28",
    status: "ACTIVE",
    joinedAt: "2024-06-01",
    favoriteItems: ["Pizza Margherita", "Pasta Alfredo", "Tiramisu"],
    notes: "",
  },
  {
    id: "cust-005",
    name: "Ananya Krishnan",
    avatar: "AK",
    email: "ananya.k@gmail.com",
    phone: "+91 88765 55555",
    totalOrders: 8,
    reservations: 3,
    totalSpent: 12800,
    loyaltyPoints: 640,
    lastVisit: "2025-05-15",
    status: "INACTIVE",
    joinedAt: "2024-09-12",
    favoriteItems: ["Biryani", "Kebab Platter"],
    notes: "Has not visited in over a month.",
  },
  {
    id: "cust-006",
    name: "Vikram Singh",
    avatar: "VS",
    email: "vikram.singh@hotmail.com",
    phone: "+91 77654 66666",
    totalOrders: 52,
    reservations: 20,
    totalSpent: 78500,
    loyaltyPoints: 3925,
    lastVisit: "2025-07-06",
    status: "ACTIVE",
    joinedAt: "2024-01-05",
    favoriteItems: ["Tandoori Chicken", "Butter Naan", "Whiskey Sour"],
    notes: "Corporate account. Frequent party bookings.",
  },
  {
    id: "cust-007",
    name: "Deepika Nair",
    avatar: "DN",
    email: "deepika.nair@gmail.com",
    phone: "+91 91234 77777",
    totalOrders: 19,
    reservations: 7,
    totalSpent: 28700,
    loyaltyPoints: 1435,
    lastVisit: "2025-07-03",
    status: "ACTIVE",
    joinedAt: "2024-04-18",
    favoriteItems: ["Appam & Stew", "Fish Curry", "Payasam"],
    notes: "Kerala food enthusiast.",
  },
  {
    id: "cust-008",
    name: "Karthik Rajan",
    avatar: "KR",
    email: "karthik.r@gmail.com",
    phone: "+91 85432 88888",
    totalOrders: 6,
    reservations: 2,
    totalSpent: 8900,
    loyaltyPoints: 445,
    lastVisit: "2025-04-20",
    status: "INACTIVE",
    joinedAt: "2025-01-10",
    favoriteItems: ["Schezwan Noodles"],
    notes: "New customer, needs engagement.",
  },
];

// ─── RESERVATIONS ───
export interface MockReservation {
  id: string;
  customerId: string;
  customerName: string;
  restaurantId: string;
  restaurantName: string;
  date: string;
  time: string;
  guests: number;
  tableNumber: string;
  status: "CONFIRMED" | "PENDING" | "CANCELLED" | "COMPLETED" | "NO_SHOW";
  contactNumber: string;
  specialRequests: string;
}

export const mockReservations: MockReservation[] = [
  {
    id: "RES-2401",
    customerId: "cust-003",
    customerName: "Meera Iyer",
    restaurantId: "rest-001",
    restaurantName: "The Golden Spoon",
    date: "2025-07-06",
    time: "7:30 PM",
    guests: 4,
    tableNumber: "T-05",
    status: "CONFIRMED",
    contactNumber: "+91 76543 33333",
    specialRequests: "Window seating preferred. Birthday celebration.",
  },
  {
    id: "RES-2402",
    customerId: "cust-001",
    customerName: "Aarav Sharma",
    restaurantId: "rest-002",
    restaurantName: "Bistro 42",
    date: "2025-07-06",
    time: "8:00 PM",
    guests: 2,
    tableNumber: "T-03",
    status: "CONFIRMED",
    contactNumber: "+91 98765 11111",
    specialRequests: "Anniversary dinner. Candle setup.",
  },
  {
    id: "RES-2403",
    customerId: "cust-006",
    customerName: "Vikram Singh",
    restaurantId: "rest-001",
    restaurantName: "The Golden Spoon",
    date: "2025-07-06",
    time: "1:00 PM",
    guests: 8,
    tableNumber: "T-12",
    status: "COMPLETED",
    contactNumber: "+91 77654 66666",
    specialRequests: "Corporate lunch. Projector needed.",
  },
  {
    id: "RES-2404",
    customerId: "cust-002",
    customerName: "Sneha Patel",
    restaurantId: "rest-003",
    restaurantName: "Spice Garden",
    date: "2025-07-07",
    time: "12:30 PM",
    guests: 3,
    tableNumber: "—",
    status: "PENDING",
    contactNumber: "+91 87654 22222",
    specialRequests: "Pure vegetarian. No onion/garlic if possible.",
  },
  {
    id: "RES-2405",
    customerId: "cust-004",
    customerName: "Rohan Kapoor",
    restaurantId: "rest-002",
    restaurantName: "Bistro 42",
    date: "2025-07-07",
    time: "7:00 PM",
    guests: 2,
    tableNumber: "—",
    status: "PENDING",
    contactNumber: "+91 99876 44444",
    specialRequests: "",
  },
  {
    id: "RES-2406",
    customerId: "cust-005",
    customerName: "Ananya Krishnan",
    restaurantId: "rest-004",
    restaurantName: "Dragon Wok",
    date: "2025-07-05",
    time: "8:30 PM",
    guests: 2,
    tableNumber: "T-07",
    status: "CANCELLED",
    contactNumber: "+91 88765 55555",
    specialRequests: "Cancelled due to schedule conflict.",
  },
  {
    id: "RES-2407",
    customerId: "cust-007",
    customerName: "Deepika Nair",
    restaurantId: "rest-003",
    restaurantName: "Spice Garden",
    date: "2025-07-06",
    time: "12:00 PM",
    guests: 5,
    tableNumber: "T-10",
    status: "CONFIRMED",
    contactNumber: "+91 91234 77777",
    specialRequests: "High chair for toddler. Kerala food preferences.",
  },
  {
    id: "RES-2408",
    customerId: "cust-008",
    customerName: "Karthik Rajan",
    restaurantId: "rest-004",
    restaurantName: "Dragon Wok",
    date: "2025-07-04",
    time: "7:00 PM",
    guests: 2,
    tableNumber: "T-02",
    status: "NO_SHOW",
    contactNumber: "+91 85432 88888",
    specialRequests: "",
  },
];

// ─── ORDERS ───
export interface MockOrder {
  id: string;
  customerId: string;
  customerName: string;
  restaurantId: string;
  restaurantName: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  paymentStatus: "PAID" | "PENDING" | "REFUNDED";
  orderStatus: "PENDING" | "CONFIRMED" | "PREPARING" | "READY" | "DELIVERED" | "CANCELLED";
  deliveryType: "Dine-in" | "Takeaway" | "Delivery";
  orderTime: string;
  estimatedTime: string;
}

export const mockOrders: MockOrder[] = [
  {
    id: "ORD-5001",
    customerId: "cust-001",
    customerName: "Aarav Sharma",
    restaurantId: "rest-001",
    restaurantName: "The Golden Spoon",
    items: [
      { name: "Butter Chicken", qty: 1, price: 420 },
      { name: "Garlic Naan (2)", qty: 1, price: 120 },
      { name: "Dal Makhani", qty: 1, price: 280 },
      { name: "Gulab Jamun", qty: 2, price: 180 },
    ],
    total: 1000,
    paymentStatus: "PAID",
    orderStatus: "DELIVERED",
    deliveryType: "Dine-in",
    orderTime: "2025-07-06T12:30:00",
    estimatedTime: "2025-07-06T13:00:00",
  },
  {
    id: "ORD-5002",
    customerId: "cust-002",
    customerName: "Sneha Patel",
    restaurantId: "rest-003",
    restaurantName: "Spice Garden",
    items: [
      { name: "Paneer Tikka", qty: 1, price: 350 },
      { name: "Masala Dosa", qty: 2, price: 240 },
      { name: "Filter Coffee", qty: 2, price: 120 },
    ],
    total: 710,
    paymentStatus: "PAID",
    orderStatus: "PREPARING",
    deliveryType: "Dine-in",
    orderTime: "2025-07-06T13:15:00",
    estimatedTime: "2025-07-06T13:45:00",
  },
  {
    id: "ORD-5003",
    customerId: "cust-003",
    customerName: "Meera Iyer",
    restaurantId: "rest-001",
    restaurantName: "The Golden Spoon",
    items: [
      { name: "Chettinad Chicken", qty: 1, price: 480 },
      { name: "Jeera Rice", qty: 1, price: 180 },
      { name: "Raita", qty: 1, price: 80 },
    ],
    total: 740,
    paymentStatus: "PAID",
    orderStatus: "READY",
    deliveryType: "Takeaway",
    orderTime: "2025-07-06T14:00:00",
    estimatedTime: "2025-07-06T14:25:00",
  },
  {
    id: "ORD-5004",
    customerId: "cust-006",
    customerName: "Vikram Singh",
    restaurantId: "rest-002",
    restaurantName: "Bistro 42",
    items: [
      { name: "Grilled Salmon", qty: 2, price: 1200 },
      { name: "Caesar Salad", qty: 1, price: 380 },
      { name: "Tiramisu", qty: 2, price: 500 },
      { name: "Red Wine (Glass)", qty: 2, price: 900 },
    ],
    total: 2980,
    paymentStatus: "PENDING",
    orderStatus: "CONFIRMED",
    deliveryType: "Dine-in",
    orderTime: "2025-07-06T19:30:00",
    estimatedTime: "2025-07-06T20:15:00",
  },
  {
    id: "ORD-5005",
    customerId: "cust-004",
    customerName: "Rohan Kapoor",
    restaurantId: "rest-005",
    restaurantName: "Pizza Paradise",
    items: [
      { name: "Margherita Pizza", qty: 1, price: 450 },
      { name: "Pepperoni Pizza", qty: 1, price: 550 },
      { name: "Garlic Bread", qty: 1, price: 180 },
      { name: "Coke (2)", qty: 1, price: 100 },
    ],
    total: 1280,
    paymentStatus: "PAID",
    orderStatus: "DELIVERED",
    deliveryType: "Delivery",
    orderTime: "2025-07-05T20:00:00",
    estimatedTime: "2025-07-05T20:45:00",
  },
  {
    id: "ORD-5006",
    customerId: "cust-007",
    customerName: "Deepika Nair",
    restaurantId: "rest-003",
    restaurantName: "Spice Garden",
    items: [
      { name: "Appam & Stew", qty: 2, price: 320 },
      { name: "Fish Curry (Kerala)", qty: 1, price: 420 },
      { name: "Payasam", qty: 2, price: 200 },
    ],
    total: 940,
    paymentStatus: "PAID",
    orderStatus: "PENDING",
    deliveryType: "Dine-in",
    orderTime: "2025-07-06T12:00:00",
    estimatedTime: "2025-07-06T12:35:00",
  },
  {
    id: "ORD-5007",
    customerId: "cust-005",
    customerName: "Ananya Krishnan",
    restaurantId: "rest-004",
    restaurantName: "Dragon Wok",
    items: [
      { name: "Hakka Noodles", qty: 1, price: 280 },
      { name: "Chicken Manchurian", qty: 1, price: 350 },
    ],
    total: 630,
    paymentStatus: "REFUNDED",
    orderStatus: "CANCELLED",
    deliveryType: "Delivery",
    orderTime: "2025-07-05T19:00:00",
    estimatedTime: "2025-07-05T19:40:00",
  },
  {
    id: "ORD-5008",
    customerId: "cust-003",
    customerName: "Meera Iyer",
    restaurantId: "rest-002",
    restaurantName: "Bistro 42",
    items: [
      { name: "Mushroom Risotto", qty: 1, price: 520 },
      { name: "Bruschetta", qty: 1, price: 280 },
      { name: "Panna Cotta", qty: 1, price: 300 },
    ],
    total: 1100,
    paymentStatus: "PAID",
    orderStatus: "PREPARING",
    deliveryType: "Dine-in",
    orderTime: "2025-07-06T13:45:00",
    estimatedTime: "2025-07-06T14:20:00",
  },
  {
    id: "ORD-5009",
    customerId: "cust-006",
    customerName: "Vikram Singh",
    restaurantId: "rest-001",
    restaurantName: "The Golden Spoon",
    items: [
      { name: "Tandoori Chicken (Full)", qty: 2, price: 900 },
      { name: "Butter Naan (4)", qty: 1, price: 200 },
      { name: "Biryani (Mutton)", qty: 1, price: 520 },
      { name: "Lassi (Sweet)", qty: 4, price: 320 },
    ],
    total: 1940,
    paymentStatus: "PAID",
    orderStatus: "DELIVERED",
    deliveryType: "Dine-in",
    orderTime: "2025-07-06T13:00:00",
    estimatedTime: "2025-07-06T13:40:00",
  },
  {
    id: "ORD-5010",
    customerId: "cust-002",
    customerName: "Sneha Patel",
    restaurantId: "rest-001",
    restaurantName: "The Golden Spoon",
    items: [
      { name: "Palak Paneer", qty: 1, price: 320 },
      { name: "Tandoori Roti (3)", qty: 1, price: 90 },
      { name: "Mango Lassi", qty: 1, price: 120 },
    ],
    total: 530,
    paymentStatus: "PAID",
    orderStatus: "DELIVERED",
    deliveryType: "Takeaway",
    orderTime: "2025-07-05T12:30:00",
    estimatedTime: "2025-07-05T12:55:00",
  },
];

// ─── PAYMENTS ───
export interface MockPayment {
  id: string;
  customerId: string;
  customerName: string;
  restaurantId: string;
  restaurantName: string;
  orderId: string;
  amount: number;
  paymentMethod: "UPI" | "Credit Card" | "Debit Card" | "Cash" | "Wallet";
  transactionId: string;
  status: "COMPLETED" | "PENDING" | "FAILED" | "REFUNDED";
  date: string;
}

export const mockPayments: MockPayment[] = [
  { id: "PAY-7001", customerId: "cust-001", customerName: "Aarav Sharma", restaurantId: "rest-001", restaurantName: "The Golden Spoon", orderId: "ORD-5001", amount: 1000, paymentMethod: "UPI", transactionId: "TXN-UPI-98765001", status: "COMPLETED", date: "2025-07-06T12:32:00" },
  { id: "PAY-7002", customerId: "cust-002", customerName: "Sneha Patel", restaurantId: "rest-003", restaurantName: "Spice Garden", orderId: "ORD-5002", amount: 710, paymentMethod: "Credit Card", transactionId: "TXN-CC-87654002", status: "COMPLETED", date: "2025-07-06T13:17:00" },
  { id: "PAY-7003", customerId: "cust-003", customerName: "Meera Iyer", restaurantId: "rest-001", restaurantName: "The Golden Spoon", orderId: "ORD-5003", amount: 740, paymentMethod: "UPI", transactionId: "TXN-UPI-76543003", status: "COMPLETED", date: "2025-07-06T14:02:00" },
  { id: "PAY-7004", customerId: "cust-006", customerName: "Vikram Singh", restaurantId: "rest-002", restaurantName: "Bistro 42", orderId: "ORD-5004", amount: 2980, paymentMethod: "Credit Card", transactionId: "TXN-CC-99876004", status: "PENDING", date: "2025-07-06T19:32:00" },
  { id: "PAY-7005", customerId: "cust-004", customerName: "Rohan Kapoor", restaurantId: "rest-005", restaurantName: "Pizza Paradise", orderId: "ORD-5005", amount: 1280, paymentMethod: "Debit Card", transactionId: "TXN-DC-91234005", status: "COMPLETED", date: "2025-07-05T20:05:00" },
  { id: "PAY-7006", customerId: "cust-007", customerName: "Deepika Nair", restaurantId: "rest-003", restaurantName: "Spice Garden", orderId: "ORD-5006", amount: 940, paymentMethod: "Wallet", transactionId: "TXN-WL-88765006", status: "COMPLETED", date: "2025-07-06T12:03:00" },
  { id: "PAY-7007", customerId: "cust-005", customerName: "Ananya Krishnan", restaurantId: "rest-004", restaurantName: "Dragon Wok", orderId: "ORD-5007", amount: 630, paymentMethod: "UPI", transactionId: "TXN-UPI-77654007", status: "REFUNDED", date: "2025-07-05T19:05:00" },
  { id: "PAY-7008", customerId: "cust-003", customerName: "Meera Iyer", restaurantId: "rest-002", restaurantName: "Bistro 42", orderId: "ORD-5008", amount: 1100, paymentMethod: "Cash", transactionId: "TXN-CASH-0008", status: "COMPLETED", date: "2025-07-06T13:48:00" },
  { id: "PAY-7009", customerId: "cust-006", customerName: "Vikram Singh", restaurantId: "rest-001", restaurantName: "The Golden Spoon", orderId: "ORD-5009", amount: 1940, paymentMethod: "UPI", transactionId: "TXN-UPI-65432009", status: "COMPLETED", date: "2025-07-06T13:05:00" },
  { id: "PAY-7010", customerId: "cust-002", customerName: "Sneha Patel", restaurantId: "rest-001", restaurantName: "The Golden Spoon", orderId: "ORD-5010", amount: 530, paymentMethod: "UPI", transactionId: "TXN-UPI-54321010", status: "COMPLETED", date: "2025-07-05T12:33:00" },
];

// ─── MENU ITEMS ───
export interface MockMenuItem {
  id: string;
  name: string;
  image: string;
  category: "Starters" | "Main Course" | "Biryani" | "Pizza" | "Burgers" | "Desserts" | "Drinks";
  restaurantId: string;
  restaurantName: string;
  price: number;
  discount: number;
  isAvailable: boolean;
  isVeg: boolean;
  rating: number;
  orders: number;
  status: "ACTIVE" | "INACTIVE";
}

export const mockMenuItems: MockMenuItem[] = [
  { id: "menu-001", name: "Butter Chicken", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80", category: "Main Course", restaurantId: "rest-001", restaurantName: "The Golden Spoon", price: 420, discount: 0, isAvailable: true, isVeg: false, rating: 4.8, orders: 342, status: "ACTIVE" },
  { id: "menu-002", name: "Paneer Tikka", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80", category: "Starters", restaurantId: "rest-001", restaurantName: "The Golden Spoon", price: 350, discount: 10, isAvailable: true, isVeg: true, rating: 4.6, orders: 256, status: "ACTIVE" },
  { id: "menu-003", name: "Hyderabadi Biryani", image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80", category: "Biryani", restaurantId: "rest-001", restaurantName: "The Golden Spoon", price: 520, discount: 0, isAvailable: true, isVeg: false, rating: 4.9, orders: 428, status: "ACTIVE" },
  { id: "menu-004", name: "Gulab Jamun", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80", category: "Desserts", restaurantId: "rest-001", restaurantName: "The Golden Spoon", price: 180, discount: 0, isAvailable: true, isVeg: true, rating: 4.5, orders: 198, status: "ACTIVE" },
  { id: "menu-005", name: "Mango Lassi", image: "https://images.unsplash.com/photo-1571006682862-3769379d5014?auto=format&fit=crop&w=600&q=80", category: "Drinks", restaurantId: "rest-001", restaurantName: "The Golden Spoon", price: 120, discount: 0, isAvailable: true, isVeg: true, rating: 4.7, orders: 312, status: "ACTIVE" },
  { id: "menu-006", name: "Margherita Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80", category: "Pizza", restaurantId: "rest-005", restaurantName: "Pizza Paradise", price: 450, discount: 15, isAvailable: true, isVeg: true, rating: 4.4, orders: 287, status: "ACTIVE" },
  { id: "menu-007", name: "Pepperoni Pizza", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80", category: "Pizza", restaurantId: "rest-005", restaurantName: "Pizza Paradise", price: 550, discount: 0, isAvailable: true, isVeg: false, rating: 4.3, orders: 195, status: "ACTIVE" },
  { id: "menu-008", name: "Masala Dosa", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80", category: "Main Course", restaurantId: "rest-003", restaurantName: "Spice Garden", price: 120, discount: 0, isAvailable: true, isVeg: true, rating: 4.8, orders: 520, status: "ACTIVE" },
  { id: "menu-009", name: "Chettinad Chicken", image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80", category: "Main Course", restaurantId: "rest-003", restaurantName: "Spice Garden", price: 480, discount: 5, isAvailable: true, isVeg: false, rating: 4.7, orders: 178, status: "ACTIVE" },
  { id: "menu-010", name: "Hakka Noodles", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80", category: "Main Course", restaurantId: "rest-004", restaurantName: "Dragon Wok", price: 280, discount: 0, isAvailable: true, isVeg: true, rating: 4.2, orders: 245, status: "ACTIVE" },
  { id: "menu-011", name: "Chicken Manchurian", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80", category: "Starters", restaurantId: "rest-004", restaurantName: "Dragon Wok", price: 350, discount: 0, isAvailable: true, isVeg: false, rating: 4.4, orders: 189, status: "ACTIVE" },
  { id: "menu-012", name: "Mushroom Risotto", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=600&q=80", category: "Main Course", restaurantId: "rest-002", restaurantName: "Bistro 42", price: 520, discount: 0, isAvailable: true, isVeg: true, rating: 4.6, orders: 134, status: "ACTIVE" },
  { id: "menu-013", name: "Grilled Salmon", image: "https://images.unsplash.com/photo-1485921325814-a5341a9c18a5?auto=format&fit=crop&w=600&q=80", category: "Main Course", restaurantId: "rest-002", restaurantName: "Bistro 42", price: 600, discount: 0, isAvailable: true, isVeg: false, rating: 4.7, orders: 98, status: "ACTIVE" },
  { id: "menu-014", name: "Tiramisu", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80", category: "Desserts", restaurantId: "rest-002", restaurantName: "Bistro 42", price: 250, discount: 0, isAvailable: true, isVeg: true, rating: 4.8, orders: 167, status: "ACTIVE" },
  { id: "menu-015", name: "Classic Burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80", category: "Burgers", restaurantId: "rest-005", restaurantName: "Pizza Paradise", price: 320, discount: 10, isAvailable: false, isVeg: false, rating: 4.1, orders: 142, status: "INACTIVE" },
  { id: "menu-016", name: "Filter Coffee", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80", category: "Drinks", restaurantId: "rest-003", restaurantName: "Spice Garden", price: 60, discount: 0, isAvailable: true, isVeg: true, rating: 4.9, orders: 680, status: "ACTIVE" },
  { id: "menu-017", name: "Appam & Stew", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80", category: "Main Course", restaurantId: "rest-003", restaurantName: "Spice Garden", price: 160, discount: 0, isAvailable: true, isVeg: false, rating: 4.5, orders: 210, status: "ACTIVE" },
  { id: "menu-018", name: "Veg Spring Rolls", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80", category: "Starters", restaurantId: "rest-004", restaurantName: "Dragon Wok", price: 220, discount: 5, isAvailable: true, isVeg: true, rating: 4.0, orders: 156, status: "ACTIVE" },
];

// ─── TABLES ───
export interface MockTable {
  id: string;
  restaurantId: string;
  restaurantName: string;
  tableNumber: string;
  capacity: number;
  status: "AVAILABLE" | "RESERVED" | "OCCUPIED" | "CLEANING";
  reservation: string | null;
  assignedWaiter: string;
}

export const mockTables: MockTable[] = [
  { id: "tbl-001", restaurantId: "rest-001", restaurantName: "The Golden Spoon", tableNumber: "T-01", capacity: 2, status: "AVAILABLE", reservation: null, assignedWaiter: "Suresh K." },
  { id: "tbl-002", restaurantId: "rest-001", restaurantName: "The Golden Spoon", tableNumber: "T-02", capacity: 4, status: "OCCUPIED", reservation: null, assignedWaiter: "Ramesh P." },
  { id: "tbl-003", restaurantId: "rest-001", restaurantName: "The Golden Spoon", tableNumber: "T-03", capacity: 2, status: "RESERVED", reservation: "RES-2401", assignedWaiter: "Suresh K." },
  { id: "tbl-004", restaurantId: "rest-001", restaurantName: "The Golden Spoon", tableNumber: "T-04", capacity: 6, status: "AVAILABLE", reservation: null, assignedWaiter: "Anita D." },
  { id: "tbl-005", restaurantId: "rest-001", restaurantName: "The Golden Spoon", tableNumber: "T-05", capacity: 4, status: "RESERVED", reservation: "RES-2401", assignedWaiter: "Ramesh P." },
  { id: "tbl-006", restaurantId: "rest-001", restaurantName: "The Golden Spoon", tableNumber: "T-06", capacity: 8, status: "OCCUPIED", reservation: null, assignedWaiter: "Anita D." },
  { id: "tbl-007", restaurantId: "rest-001", restaurantName: "The Golden Spoon", tableNumber: "T-07", capacity: 2, status: "CLEANING", reservation: null, assignedWaiter: "Suresh K." },
  { id: "tbl-008", restaurantId: "rest-001", restaurantName: "The Golden Spoon", tableNumber: "T-08", capacity: 4, status: "AVAILABLE", reservation: null, assignedWaiter: "Ramesh P." },
  { id: "tbl-009", restaurantId: "rest-002", restaurantName: "Bistro 42", tableNumber: "T-01", capacity: 2, status: "AVAILABLE", reservation: null, assignedWaiter: "James F." },
  { id: "tbl-010", restaurantId: "rest-002", restaurantName: "Bistro 42", tableNumber: "T-02", capacity: 4, status: "OCCUPIED", reservation: null, assignedWaiter: "Priya S." },
  { id: "tbl-011", restaurantId: "rest-002", restaurantName: "Bistro 42", tableNumber: "T-03", capacity: 2, status: "RESERVED", reservation: "RES-2402", assignedWaiter: "James F." },
  { id: "tbl-012", restaurantId: "rest-002", restaurantName: "Bistro 42", tableNumber: "T-04", capacity: 6, status: "AVAILABLE", reservation: null, assignedWaiter: "Priya S." },
  { id: "tbl-013", restaurantId: "rest-003", restaurantName: "Spice Garden", tableNumber: "T-01", capacity: 4, status: "OCCUPIED", reservation: null, assignedWaiter: "Kumar R." },
  { id: "tbl-014", restaurantId: "rest-003", restaurantName: "Spice Garden", tableNumber: "T-02", capacity: 2, status: "AVAILABLE", reservation: null, assignedWaiter: "Lakshmi V." },
  { id: "tbl-015", restaurantId: "rest-003", restaurantName: "Spice Garden", tableNumber: "T-03", capacity: 6, status: "RESERVED", reservation: "RES-2404", assignedWaiter: "Kumar R." },
  { id: "tbl-016", restaurantId: "rest-003", restaurantName: "Spice Garden", tableNumber: "T-10", capacity: 5, status: "RESERVED", reservation: "RES-2407", assignedWaiter: "Lakshmi V." },
];

// ─── OFFERS ───
export interface MockOffer {
  id: string;
  name: string;
  couponCode: string;
  discount: string;
  restaurantId: string;
  restaurantName: string;
  validFrom: string;
  validUntil: string;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
  createdAt: string;
}

export const mockOffers: MockOffer[] = [
  { id: "offer-001", name: "Grand Opening Special", couponCode: "WELCOME50", discount: "50% off (max ₹200)", restaurantId: "rest-001", restaurantName: "The Golden Spoon", validFrom: "2025-07-01", validUntil: "2025-07-31", usageLimit: 500, usedCount: 123, isActive: true, createdAt: "2025-06-28" },
  { id: "offer-002", name: "Weekend Feast", couponCode: "WEEKEND20", discount: "20% off", restaurantId: "rest-002", restaurantName: "Bistro 42", validFrom: "2025-07-05", validUntil: "2025-07-06", usageLimit: 100, usedCount: 67, isActive: true, createdAt: "2025-07-01" },
  { id: "offer-003", name: "Lunch Special", couponCode: "LUNCH15", discount: "15% off", restaurantId: "rest-003", restaurantName: "Spice Garden", validFrom: "2025-07-01", validUntil: "2025-08-31", usageLimit: 1000, usedCount: 245, isActive: true, createdAt: "2025-06-25" },
  { id: "offer-004", name: "First Order Discount", couponCode: "FIRST100", discount: "₹100 off", restaurantId: "rest-004", restaurantName: "Dragon Wok", validFrom: "2025-06-01", validUntil: "2025-12-31", usageLimit: 2000, usedCount: 456, isActive: true, createdAt: "2025-05-28" },
  { id: "offer-005", name: "Pizza Tuesday", couponCode: "PIZZA2FOR1", discount: "Buy 1 Get 1 Free", restaurantId: "rest-005", restaurantName: "Pizza Paradise", validFrom: "2025-07-01", validUntil: "2025-07-31", usageLimit: 200, usedCount: 89, isActive: false, createdAt: "2025-06-28" },
  { id: "offer-006", name: "Family Pack", couponCode: "FAMILY25", discount: "25% off (min ₹1500)", restaurantId: "rest-001", restaurantName: "The Golden Spoon", validFrom: "2025-07-10", validUntil: "2025-08-10", usageLimit: 300, usedCount: 0, isActive: true, createdAt: "2025-07-05" },
  { id: "offer-007", name: "Summer Cooler", couponCode: "COOL30", discount: "30% off on Drinks", restaurantId: "rest-003", restaurantName: "Spice Garden", validFrom: "2025-06-01", validUntil: "2025-06-30", usageLimit: 500, usedCount: 500, isActive: false, createdAt: "2025-05-25" },
];

// ─── REVIEWS ───
export interface MockReview {
  id: string;
  customerId: string;
  customerName: string;
  customerAvatar: string;
  restaurantId: string;
  restaurantName: string;
  foodItem: string;
  rating: number;
  review: string;
  date: string;
  status: "PUBLISHED" | "HIDDEN" | "FLAGGED";
  reply: string | null;
}

export const mockReviews: MockReview[] = [
  { id: "rev-001", customerId: "cust-003", customerName: "Meera Iyer", customerAvatar: "MI", restaurantId: "rest-001", restaurantName: "The Golden Spoon", foodItem: "Butter Chicken", rating: 5, review: "Absolutely divine! The butter chicken here is the best I've had in Bengaluru. Creamy, perfectly spiced, and the portion size is generous. Will definitely come back!", date: "2025-07-05", status: "PUBLISHED", reply: "Thank you, Meera! We're thrilled you enjoyed it. See you soon! 🙏" },
  { id: "rev-002", customerId: "cust-001", customerName: "Aarav Sharma", customerAvatar: "AS", restaurantId: "rest-001", restaurantName: "The Golden Spoon", foodItem: "Hyderabadi Biryani", rating: 5, review: "The biryani is authentic Hyderabadi style. Perfectly layered, fragrant rice with tender meat. The raita complement was perfect.", date: "2025-07-04", status: "PUBLISHED", reply: null },
  { id: "rev-003", customerId: "cust-002", customerName: "Sneha Patel", customerAvatar: "SP", restaurantId: "rest-003", restaurantName: "Spice Garden", foodItem: "Masala Dosa", rating: 4, review: "Crispy dosa with flavorful potato filling. The sambar could be a bit more tangy but overall a great experience. Love the filter coffee!", date: "2025-07-03", status: "PUBLISHED", reply: null },
  { id: "rev-004", customerId: "cust-006", customerName: "Vikram Singh", customerAvatar: "VS", restaurantId: "rest-002", restaurantName: "Bistro 42", foodItem: "Grilled Salmon", rating: 4, review: "Excellent quality salmon, cooked to perfection. The wine pairing suggestion from the sommelier was spot on. Ambiance is top-notch.", date: "2025-07-02", status: "PUBLISHED", reply: "Thank you for dining with us, Vikram! Glad you enjoyed the pairing." },
  { id: "rev-005", customerId: "cust-004", customerName: "Rohan Kapoor", customerAvatar: "RK", restaurantId: "rest-005", restaurantName: "Pizza Paradise", foodItem: "Margherita Pizza", rating: 3, review: "Decent pizza but nothing extraordinary. The crust was slightly overcooked and could use more cheese. Delivery was quick though.", date: "2025-07-01", status: "PUBLISHED", reply: null },
  { id: "rev-006", customerId: "cust-007", customerName: "Deepika Nair", customerAvatar: "DN", restaurantId: "rest-003", restaurantName: "Spice Garden", foodItem: "Appam & Stew", rating: 5, review: "Tastes exactly like home-cooked Kerala food! The stew has the perfect coconut base and the appam is soft and fluffy. 10/10!", date: "2025-07-05", status: "PUBLISHED", reply: null },
  { id: "rev-007", customerId: "cust-005", customerName: "Ananya Krishnan", customerAvatar: "AK", restaurantId: "rest-004", restaurantName: "Dragon Wok", foodItem: "Hakka Noodles", rating: 2, review: "Very oily and oversalted. The noodles were soggy. Not up to the mark. Expected better for the price.", date: "2025-06-28", status: "FLAGGED", reply: null },
  { id: "rev-008", customerId: "cust-008", customerName: "Karthik Rajan", customerAvatar: "KR", restaurantId: "rest-004", restaurantName: "Dragon Wok", foodItem: "Chicken Manchurian", rating: 4, review: "Good flavors and generous portions. The gravy manchurian was better than the dry version. Quick service too.", date: "2025-06-25", status: "PUBLISHED", reply: "Thanks Karthik! Try our Chef's Special next time 🍜" },
  { id: "rev-009", customerId: "cust-003", customerName: "Meera Iyer", customerAvatar: "MI", restaurantId: "rest-002", restaurantName: "Bistro 42", foodItem: "Tiramisu", rating: 5, review: "The best tiramisu in town! Light, creamy, and the perfect balance of coffee and mascarpone. A must-try dessert.", date: "2025-06-30", status: "PUBLISHED", reply: null },
  { id: "rev-010", customerId: "cust-001", customerName: "Aarav Sharma", customerAvatar: "AS", restaurantId: "rest-003", restaurantName: "Spice Garden", foodItem: "Filter Coffee", rating: 5, review: "Best filter coffee experience. Served in traditional tumbler. Strong, aromatic, and perfectly balanced. Will keep coming back just for this!", date: "2025-07-06", status: "PUBLISHED", reply: null },
];

// ─── ANALYTICS DATA ───
export const revenueByMonth = [
  { month: "Jan", revenue: 245000, orders: 312, customers: 89 },
  { month: "Feb", revenue: 268000, orders: 345, customers: 102 },
  { month: "Mar", revenue: 312000, orders: 398, customers: 118 },
  { month: "Apr", revenue: 289000, orders: 367, customers: 95 },
  { month: "May", revenue: 342000, orders: 423, customers: 134 },
  { month: "Jun", revenue: 398000, orders: 487, customers: 156 },
  { month: "Jul", revenue: 425000, orders: 512, customers: 178 },
];

export const revenueByDay = [
  { day: "Mon", revenue: 42000 },
  { day: "Tue", revenue: 38000 },
  { day: "Wed", revenue: 45000 },
  { day: "Thu", revenue: 41000 },
  { day: "Fri", revenue: 58000 },
  { day: "Sat", revenue: 72000 },
  { day: "Sun", revenue: 65000 },
];

export const peakHoursData = [
  { hour: "10 AM", orders: 8 },
  { hour: "11 AM", orders: 15 },
  { hour: "12 PM", orders: 42 },
  { hour: "1 PM", orders: 58 },
  { hour: "2 PM", orders: 35 },
  { hour: "3 PM", orders: 12 },
  { hour: "4 PM", orders: 8 },
  { hour: "5 PM", orders: 15 },
  { hour: "6 PM", orders: 28 },
  { hour: "7 PM", orders: 52 },
  { hour: "8 PM", orders: 65 },
  { hour: "9 PM", orders: 48 },
  { hour: "10 PM", orders: 22 },
];

export const salesByCategory = [
  { category: "Main Course", value: 42, fill: "oklch(0.68 0.23 45)" },
  { category: "Starters", value: 18, fill: "oklch(0.72 0.2 55)" },
  { category: "Biryani", value: 15, fill: "oklch(0.62 0.22 35)" },
  { category: "Drinks", value: 12, fill: "oklch(0.75 0.18 65)" },
  { category: "Desserts", value: 8, fill: "oklch(0.55 0.22 270)" },
  { category: "Pizza", value: 5, fill: "oklch(0.6 0.15 160)" },
];

export const restaurantPerformance = [
  { name: "The Golden Spoon", revenue: 285000, orders: 47, rating: 4.7 },
  { name: "Bistro 42", revenue: 198000, orders: 32, rating: 4.5 },
  { name: "Spice Garden", revenue: 165000, orders: 38, rating: 4.3 },
  { name: "Dragon Wok", revenue: 142000, orders: 28, rating: 4.1 },
  { name: "Pizza Paradise", revenue: 95000, orders: 22, rating: 4.4 },
];

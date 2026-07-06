// ─── Restaurant Status ───
export enum RestaurantStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  INACTIVE = "INACTIVE",
  REJECTED = "REJECTED",
}

// ─── Kitchen Status ───
export enum KitchenStatus {
  OPEN = "OPEN",
  BUSY = "BUSY",
  CLOSED = "CLOSED",
}

// ─── Restaurant ───
export interface Restaurant {
  id: string;
  name: string;
  ownerName: string;
  email: string;
  phone: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    lat: number;
    lng: number;
  };
  gstNumber?: string;
  openingHours: string;
  closingHours: string;
  status: RestaurantStatus;
  rating: number;
  totalReviews: number;
  numberOfTables: number;
  cuisine: string[];
  images: string[];
  bannerImage?: string;
  logo?: string;
  kitchenStatus: KitchenStatus;
  liveCapacity: number;
  seatAvailability: number;
  preparationTime: number; // average in minutes
  averageRating: number;
  totalEarnings: number;
  monthlyEarnings: number;
  bankDetails?: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    ifscCode: string;
  };
  taxRate: number;
  serviceChargeRate: number;
  platformCommissionRate: number;
  isAcceptingOrders: boolean;
  isAcceptingReservations: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Restaurant List Item (lighter) ───
export interface RestaurantListItem {
  id: string;
  name: string;
  ownerName: string;
  location: { city: string; state: string };
  status: RestaurantStatus;
  rating: number;
  cuisine: string[];
  logo?: string;
  kitchenStatus: KitchenStatus;
  totalEarnings: number;
  createdAt: string;
}

// ─── Restaurant Stats ───
export interface RestaurantStats {
  total: number;
  active: number;
  inactive: number;
  pending: number;
  suspended: number;
}

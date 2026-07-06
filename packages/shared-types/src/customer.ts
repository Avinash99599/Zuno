// ─── Customer ───
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  location?: {
    address: string;
    city: string;
    state: string;
    lat: number;
    lng: number;
  };
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  lastOrderDate?: string;
  isActive: boolean;
  loyaltyPoints: number;
  preferredCuisines: string[];
  dietaryPreferences: string[];
  createdAt: string;
  updatedAt: string;
}

// ─── Customer List Item (lighter) ───
export interface CustomerListItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  totalOrders: number;
  totalSpent: number;
  isActive: boolean;
  createdAt: string;
}

// ─── Customer Stats ───
export interface CustomerStats {
  total: number;
  active: number;
  newThisMonth: number;
  repeatRate: number;
}

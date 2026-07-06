// ─── Dietary Type ───
export enum DietaryType {
  VEG = "VEG",
  NON_VEG = "NON_VEG",
  VEGAN = "VEGAN",
  GLUTEN_FREE = "GLUTEN_FREE",
}

// ─── Menu Item Tags ───
export enum MenuItemTag {
  CHEF_SPECIAL = "CHEF_SPECIAL",
  RECOMMENDED = "RECOMMENDED",
  TRENDING = "TRENDING",
  SEASONAL = "SEASONAL",
  NEW = "NEW",
  BESTSELLER = "BESTSELLER",
}

// ─── Menu Category ───
export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  sortOrder: number;
  subcategories: MenuSubcategory[];
}

// ─── Menu Subcategory ───
export interface MenuSubcategory {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  sortOrder: number;
}

// ─── Menu Item ───
export interface MenuItem {
  id: string;
  restaurantId: string;
  categoryId: string;
  subcategoryId?: string;
  name: string;
  description: string;
  ingredients: string[];
  allergens: string[];
  image?: string;
  videoUrl?: string;
  price: number;
  discountPercentage: number;
  discountedPrice: number;
  taxRate: number;
  dietaryType: DietaryType;
  tags: MenuItemTag[];
  preparationTime: number; // in minutes
  isAvailable: boolean;
  isHidden: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

// ─── Full Restaurant Menu ───
export interface RestaurantMenu {
  restaurantId: string;
  restaurantName: string;
  categories: (MenuCategory & { items: MenuItem[] })[];
}

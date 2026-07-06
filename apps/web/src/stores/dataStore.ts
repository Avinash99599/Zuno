import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/lib/api";
import {
  mockRestaurants,
  mockCustomers,
  mockReservations,
  mockOrders,
  mockPayments,
  mockMenuItems,
  mockTables,
  mockOffers,
  mockReviews,
  type MockRestaurant,
  type MockCustomer,
  type MockReservation,
  type MockOrder,
  type MockPayment,
  type MockMenuItem,
  type MockTable,
  type MockOffer,
  type MockReview,
} from "@/lib/mockData";

interface DataState {
  fetchData: () => Promise<void>;
  restaurants: MockRestaurant[];
  customers: MockCustomer[];
  reservations: MockReservation[];
  orders: MockOrder[];
  payments: MockPayment[];
  menuItems: MockMenuItem[];
  tables: MockTable[];
  offers: MockOffer[];
  reviews: MockReview[];

  // Restaurants Actions
  addRestaurant: (r: Omit<MockRestaurant, "id" | "todaysOrders" | "revenue" | "createdAt">) => void;
  updateRestaurant: (id: string, r: Partial<MockRestaurant>) => void;
  deleteRestaurant: (id: string) => void;

  // Customers Actions
  addCustomer: (c: Omit<MockCustomer, "id" | "totalSpent" | "loyaltyPoints" | "joinedAt" | "lastVisit">) => void;
  updateCustomer: (id: string, c: Partial<MockCustomer>) => void;
  deleteCustomer: (id: string) => void;

  // Reservations Actions
  addReservation: (r: Omit<MockReservation, "id">) => void;
  confirmReservation: (id: string) => void;
  cancelReservation: (id: string) => void;
  assignTableToReservation: (id: string, tableNumber: string) => void;

  // Orders Actions
  addOrder: (o: Omit<MockOrder, "id" | "orderTime" | "estimatedTime">) => void;
  updateOrderStatus: (id: string, status: MockOrder["orderStatus"]) => void;
  updateOrderPaymentStatus: (id: string, status: MockOrder["paymentStatus"]) => void;

  // Menus Actions
  addMenuItem: (item: Omit<MockMenuItem, "id" | "orders" | "rating">) => void;
  updateMenuItem: (id: string, item: Partial<MockMenuItem>) => void;
  deleteMenuItem: (id: string) => void;

  // Tables Actions
  addTable: (t: Omit<MockTable, "id" | "status" | "reservation">) => void;
  updateTable: (id: string, t: Partial<MockTable>) => void;
  updateTableStatus: (id: string, status: MockTable["status"], reservationId?: string | null) => void;
  deleteTable: (id: string) => void;

  // Offers Actions
  addOffer: (o: Omit<MockOffer, "id" | "usedCount" | "createdAt">) => void;
  updateOffer: (id: string, o: Partial<MockOffer>) => void;
  toggleOfferActive: (id: string) => void;
  deleteOffer: (id: string) => void;

  // Reviews Actions
  addReview: (r: Omit<MockReview, "id" | "date" | "reply">) => void;
  replyToReview: (id: string, replyText: string) => void;
  toggleReviewVisibility: (id: string) => void;
  deleteReview: (id: string) => void;
}

export const useDataStore = create<DataState>()(
  persist(
    (set, get) => ({
      restaurants: mockRestaurants,
      customers: mockCustomers,
      reservations: mockReservations,
      orders: mockOrders,
      payments: mockPayments,
      menuItems: mockMenuItems,
      tables: mockTables,
      offers: mockOffers,
      reviews: mockReviews,

      fetchData: async () => {
        try {
          const [restRes, custRes, menuRes, orderRes] = await Promise.all([
            api.get("/restaurants"),
            api.get("/customers"),
            api.get("/menu-items"),
            api.get("/orders"),
          ]);

          const dbRestaurants = restRes.data.data || [];
          const dbCustomers = custRes.data.data || [];
          const dbMenuItems = menuRes.data.data || [];
          const dbOrders = orderRes.data.data || [];

          // Map database structure to mock structures
          const mappedOrders = dbOrders.map((o: any) => {
            const statusMap: Record<string, string> = {
              pending_payment: "PENDING",
              confirmed: "CONFIRMED",
              preparing: "PREPARING",
              ready: "READY",
              completed: "DELIVERED",
              cancelled: "CANCELLED",
              no_show: "CANCELLED",
            };
            const paymentStatusMap: Record<string, string> = {
              pending: "PENDING",
              advance_paid: "PAID",
              fully_paid: "PAID",
              refunded: "REFUNDED",
            };

            const mappedItems = (o.order_items || []).map((item: any) => ({
              name: item.menu_items?.name || "Food Item",
              qty: item.quantity,
              price: Number(item.price_at_order) || 0,
            }));

            return {
              id: o.id,
              restaurantName: o.restaurants?.name || "The Golden Spoon",
              customerName: o.customers?.name || "Guest User",
              customerId: o.customer_id,
              restaurantId: o.restaurant_id,
              total: Number(o.total_amount) || 0,
              paymentStatus: paymentStatusMap[o.payment_status || ""] || "PENDING",
              orderStatus: statusMap[o.status || ""] || "PENDING",
              deliveryType: "Dine-in",
              orderTime: o.created_at || new Date().toISOString(),
              estimatedTime: o.arrival_time || o.created_at || new Date().toISOString(),
              items: mappedItems,
            };
          });

          const mappedRestaurants = dbRestaurants.map((r: any) => {
            const rOrders = mappedOrders.filter((o: any) => o.restaurantId === r.id);
            const totalRevenue = rOrders.filter((o: any) => o.paymentStatus === "PAID").reduce((sum: number, o: any) => sum + o.total, 0);

            return {
              id: r.id,
              name: r.name,
              owner: "Owner of " + r.name,
              email: "contact@" + r.name.toLowerCase().replace(/[^a-z0-9]/g, "") + ".com",
              phone: "+91 99000 11000",
              address: r.address || "India",
              cuisine: r.cuisine_tags && r.cuisine_tags.length ? r.cuisine_tags : ["Multi-cuisine"],
              status: r.is_open ? "OPEN" : "CLOSED",
              rating: Number(r.rating) || 4.0,
              totalTables: 20,
              todaysOrders: rOrders.length,
              revenue: totalRevenue,
              staffCount: 15,
              menuCount: 25,
              openingHours: [
                { day: "Mon-Sun", open: "11:00 AM", close: "11:00 PM" }
              ],
              createdAt: r.created_at ? r.created_at.split("T")[0] : new Date().toISOString().split("T")[0],
              logo: r.photo_url || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=150&h=150&q=80",
            };
          });

          const mappedCustomers = dbCustomers.map((c: any) => {
            const cOrders = mappedOrders.filter((o: any) => o.customerId === c.id);
            const totalSpent = cOrders.reduce((sum: number, o: any) => sum + o.total, 0);

            return {
              id: c.id,
              name: c.name || "Customer " + c.id.slice(0, 4),
              email: c.email || "",
              phone: c.phone || "Not provided",
              avatar: (c.name || "C").split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase(),
              totalOrders: cOrders.length,
              reservations: 0,
              totalSpent: totalSpent,
              loyaltyPoints: Math.floor(totalSpent / 10),
              lastVisit: c.created_at ? c.created_at.split("T")[0] : new Date().toISOString().split("T")[0],
              joinedAt: c.created_at ? c.created_at.split("T")[0] : new Date().toISOString().split("T")[0],
              status: "ACTIVE",
            };
          });

          const mappedMenuItems = dbMenuItems.map((item: any) => ({
            id: item.id,
            name: item.name,
            price: Number(item.price) || 0,
            image: item.photo_url || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
            category: item.category || "Main Course",
            rating: 4.5,
            orders: 0,
            isVeg: item.is_veg !== null ? item.is_veg : true,
            discount: 0,
            status: item.is_available ? "ACTIVE" : "INACTIVE",
            restaurantName: item.restaurants?.name || "The Golden Spoon",
            restaurantId: item.restaurant_id,
          }));

          const mappedPayments = dbOrders.map((o: any) => ({
            id: `pay-${o.id.slice(0, 8)}`,
            customerName: o.customers?.name || "Guest User",
            customerId: o.customer_id,
            restaurantName: o.restaurants?.name || "The Golden Spoon",
            orderId: o.id,
            amount: Number(o.total_amount) || 0,
            paymentMethod: "UPI",
            transactionId: o.payment_reference || `TXN${Math.floor(100000 + Math.random() * 900000)}`,
            status: o.payment_status === "fully_paid" || o.payment_status === "advance_paid" ? ("COMPLETED" as const) : o.payment_status === "refunded" ? ("REFUNDED" as const) : ("PENDING" as const),
            date: o.created_at || new Date().toISOString(),
          }));

          set({
            restaurants: mappedRestaurants,
            customers: mappedCustomers,
            menuItems: mappedMenuItems,
            orders: mappedOrders,
            payments: mappedPayments,
          });
        } catch (error) {
          console.error("Failed to fetch real-time data from database:", error);
        }
      },

      // Restaurants
      addRestaurant: async (r) => {
        try {
          await api.post("/restaurants", {
            name: r.name,
            cuisine_tags: Array.isArray(r.cuisine) ? r.cuisine : (r.cuisine ? (r.cuisine as string).split(",").map(t => t.trim()) : []),
            address: r.address,
            photo_url: r.logo,
          });
          await get().fetchData();
        } catch (e) {
          console.error("Failed to add restaurant:", e);
        }
      },
      updateRestaurant: async (id, r) => {
        try {
          await api.put(`/restaurants/${id}`, {
            name: r.name,
            cuisine_tags: r.cuisine ? (Array.isArray(r.cuisine) ? r.cuisine : (r.cuisine as string).split(",").map(t => t.trim())) : undefined,
            address: r.address,
            photo_url: r.logo,
            is_open: r.status !== undefined ? r.status === "OPEN" : undefined,
          });
          await get().fetchData();
        } catch (e) {
          console.error("Failed to update restaurant:", e);
        }
      },
      deleteRestaurant: async (id) => {
        try {
          await api.delete(`/restaurants/${id}`);
          await get().fetchData();
        } catch (e) {
          console.error("Failed to delete restaurant:", e);
        }
      },

      // Customers
      addCustomer: async (c) => {
        try {
          await api.post("/customers", {
            name: c.name,
            email: c.email,
            phone: c.phone,
          });
          await get().fetchData();
        } catch (e) {
          console.error("Failed to add customer:", e);
        }
      },
      updateCustomer: (id, c) =>
        set((state) => ({
          customers: state.customers.map((item) =>
            item.id === id ? { ...item, ...c } : item
          ),
        })),
      deleteCustomer: async (id) => {
        try {
          await api.delete(`/customers/${id}`);
          await get().fetchData();
        } catch (e) {
          console.error("Failed to delete customer:", e);
        }
      },

      // Reservations
      addReservation: (r) =>
        set((state) => ({
          reservations: [
            ...state.reservations,
            {
              ...r,
              id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
            },
          ],
        })),
      confirmReservation: (id) =>
        set((state) => ({
          reservations: state.reservations.map((item) =>
            item.id === id ? { ...item, status: "CONFIRMED" } : item
          ),
        })),
      cancelReservation: (id) =>
        set((state) => ({
          reservations: state.reservations.map((item) =>
            item.id === id ? { ...item, status: "CANCELLED" } : item
          ),
        })),
      assignTableToReservation: (id, tableNumber) =>
        set((state) => ({
          reservations: state.reservations.map((item) =>
            item.id === id ? { ...item, tableNumber } : item
          ),
        })),

      // Orders
      addOrder: (o) =>
        set((state) => {
          const newOrderId = `ORD-${Math.floor(5000 + Math.random() * 5000)}`;
          // Also create a pending payment for this order
          const newPayment: MockPayment = {
            id: `PAY-${Math.floor(7000 + Math.random() * 3000)}`,
            customerId: o.customerId,
            customerName: o.customerName,
            restaurantId: o.restaurantId,
            restaurantName: o.restaurantName,
            orderId: newOrderId,
            amount: o.total,
            paymentMethod: "UPI",
            transactionId: `TXN-UPI-${Math.floor(10000000 + Math.random() * 90000000)}`,
            status: o.paymentStatus === "PAID" ? "COMPLETED" : "PENDING",
            date: new Date().toISOString(),
          };

          // Update restaurant stats
          const updatedRestaurants = state.restaurants.map((rest) => {
            if (rest.id === o.restaurantId) {
              return {
                ...rest,
                todaysOrders: rest.todaysOrders + 1,
                revenue: rest.revenue + o.total,
              };
            }
            return rest;
          });

          // Update customer stats
          const updatedCustomers = state.customers.map((cust) => {
            if (cust.id === o.customerId) {
              return {
                ...cust,
                totalOrders: cust.totalOrders + 1,
                totalSpent: cust.totalSpent + o.total,
                loyaltyPoints: cust.loyaltyPoints + Math.round(o.total * 0.05),
                lastVisit: new Date().toISOString().split("T")[0],
              };
            }
            return cust;
          });

          return {
            orders: [
              ...state.orders,
              {
                ...o,
                id: newOrderId,
                orderTime: new Date().toISOString(),
                estimatedTime: new Date(Date.now() + 30 * 60000).toISOString(),
              },
            ],
            payments: [...state.payments, newPayment],
            restaurants: updatedRestaurants,
            customers: updatedCustomers,
          };
        }),
      updateOrderStatus: async (id, orderStatus) => {
        try {
          const dbStatusMap: Record<string, string> = {
            PENDING: "pending_payment",
            CONFIRMED: "confirmed",
            PREPARING: "preparing",
            READY: "ready",
            DELIVERED: "completed",
            CANCELLED: "cancelled",
          };
          await api.patch(`/orders/${id}/status`, { status: dbStatusMap[orderStatus] || "pending_payment" });
          await get().fetchData();
        } catch (e) {
          console.error("Failed to update order status:", e);
        }
      },
      updateOrderPaymentStatus: async (id, paymentStatus) => {
        try {
          const dbPaymentMap: Record<string, string> = {
            PAID: "fully_paid",
            PENDING: "pending",
            REFUNDED: "refunded",
          };
          await api.patch(`/orders/${id}/payment`, { payment_status: dbPaymentMap[paymentStatus] || "pending" });
          await get().fetchData();
        } catch (e) {
          console.error("Failed to update payment status:", e);
        }
      },

      // Menus
      addMenuItem: async (item) => {
        try {
          await api.post("/menu-items", {
            restaurant_id: item.restaurantId,
            name: item.name,
            category: item.category,
            price: item.price,
            photo_url: item.image,
            is_veg: item.isVeg,
            is_available: item.status === "ACTIVE",
          });
          await get().fetchData();
        } catch (e) {
          console.error("Failed to add menu item:", e);
        }
      },
      updateMenuItem: async (id, item) => {
        try {
          await api.put(`/menu-items/${id}`, {
            name: item.name,
            category: item.category,
            price: item.price,
            photo_url: item.image,
            is_veg: item.isVeg,
            is_available: item.status !== undefined ? item.status === "ACTIVE" : undefined,
          });
          await get().fetchData();
        } catch (e) {
          console.error("Failed to update menu item:", e);
        }
      },
      deleteMenuItem: async (id) => {
        try {
          await api.delete(`/menu-items/${id}`);
          await get().fetchData();
        } catch (e) {
          console.error("Failed to delete menu item:", e);
        }
      },

      // Tables
      addTable: (t) =>
        set((state) => ({
          tables: [
            ...state.tables,
            {
              ...t,
              id: `tbl-${Date.now()}`,
              status: "AVAILABLE",
              reservation: null,
            },
          ],
        })),
      updateTable: (id, t) =>
        set((state) => ({
          tables: state.tables.map((table) =>
            table.id === id ? { ...table, ...t } : table
          ),
        })),
      updateTableStatus: (id, status, reservation = null) =>
        set((state) => ({
          tables: state.tables.map((table) =>
            table.id === id ? { ...table, status, reservation } : table
          ),
        })),
      deleteTable: (id) =>
        set((state) => ({
          tables: state.tables.filter((table) => table.id !== id),
        })),

      // Offers
      addOffer: (o) =>
        set((state) => ({
          offers: [
            ...state.offers,
            {
              ...o,
              id: `offer-${Date.now()}`,
              usedCount: 0,
              createdAt: new Date().toISOString().split("T")[0],
            },
          ],
        })),
      updateOffer: (id, o) =>
        set((state) => ({
          offers: state.offers.map((item) =>
            item.id === id ? { ...item, ...o } : item
          ),
        })),
      toggleOfferActive: (id) =>
        set((state) => ({
          offers: state.offers.map((item) =>
            item.id === id ? { ...item, isActive: !item.isActive } : item
          ),
        })),
      deleteOffer: (id) =>
        set((state) => ({
          offers: state.offers.filter((item) => item.id !== id),
        })),

      // Reviews
      addReview: (r) =>
        set((state) => ({
          reviews: [
            ...state.reviews,
            {
              ...r,
              id: `rev-${Date.now()}`,
              date: new Date().toISOString().split("T")[0],
              reply: null,
            },
          ],
        })),
      replyToReview: (id, reply) =>
        set((state) => ({
          reviews: state.reviews.map((item) =>
            item.id === id ? { ...item, reply } : item
          ),
        })),
      toggleReviewVisibility: (id) =>
        set((state) => ({
          reviews: state.reviews.map((item) =>
            item.id === id ? { ...item, status: item.status === "HIDDEN" ? "PUBLISHED" : "HIDDEN" } : item
          ),
        })),
      deleteReview: (id) =>
        set((state) => ({
          reviews: state.reviews.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "zuno-store",
    }
  )
);

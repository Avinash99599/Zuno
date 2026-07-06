import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { queryClient } from "@/lib/queryClient";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import { useAuthStore } from "@/stores/authStore";
import { useDataStore } from "@/stores/dataStore";
import { lazy, Suspense, useEffect } from "react";

// ─── Lazy-loaded Pages ───
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const RestaurantsPage = lazy(() => import("@/pages/RestaurantsPage"));
const RestaurantDetailPage = lazy(() => import("@/pages/RestaurantDetailPage"));
const CustomersPage = lazy(() => import("@/pages/CustomersPage"));
const CustomerDetailPage = lazy(() => import("@/pages/CustomerDetailPage"));
const ReservationsPage = lazy(() => import("@/pages/ReservationsPage"));
const OrdersPage = lazy(() => import("@/pages/OrdersPage"));
const PaymentsPage = lazy(() => import("@/pages/PaymentsPage"));
const MenusPage = lazy(() => import("@/pages/MenusPage"));
const TablesPage = lazy(() => import("@/pages/TablesPage"));
const OffersPage = lazy(() => import("@/pages/OffersPage"));
const AnalyticsPage = lazy(() => import("@/pages/AnalyticsPage"));
const ReviewsPage = lazy(() => import("@/pages/ReviewsPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

// ─── Loading Fallback ───
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

// ─── Suspense Wrapper ───
function SuspensePage({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

function AppRoutes() {
  const { isAuthenticated } = useAuthStore();
  const fetchData = useDataStore((state) => state.fetchData);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, fetchData]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <SuspensePage><LoginPage /></SuspensePage>
          )
        }
      />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<SuspensePage><DashboardPage /></SuspensePage>} />

        {/* Restaurants */}
        <Route path="/restaurants" element={<SuspensePage><RestaurantsPage /></SuspensePage>} />
        <Route path="/restaurants/:id" element={<SuspensePage><RestaurantDetailPage /></SuspensePage>} />

        {/* Customers */}
        <Route path="/customers" element={<SuspensePage><CustomersPage /></SuspensePage>} />
        <Route path="/customers/:id" element={<SuspensePage><CustomerDetailPage /></SuspensePage>} />

        {/* Reservations */}
        <Route path="/reservations" element={<SuspensePage><ReservationsPage /></SuspensePage>} />

        {/* Orders */}
        <Route path="/orders" element={<SuspensePage><OrdersPage /></SuspensePage>} />

        {/* Payments */}
        <Route path="/payments" element={<SuspensePage><PaymentsPage /></SuspensePage>} />

        {/* Menus */}
        <Route path="/menus" element={<SuspensePage><MenusPage /></SuspensePage>} />

        {/* Tables */}
        <Route path="/tables" element={<SuspensePage><TablesPage /></SuspensePage>} />

        {/* Offers */}
        <Route path="/offers" element={<SuspensePage><OffersPage /></SuspensePage>} />

        {/* Analytics */}
        <Route path="/analytics" element={<SuspensePage><AnalyticsPage /></SuspensePage>} />

        {/* Reviews */}
        <Route path="/reviews" element={<SuspensePage><ReviewsPage /></SuspensePage>} />

        {/* Remaining placeholders */}
        <Route path="/notifications" element={<ComingSoon title="Notifications" />} />
        <Route path="/support" element={<ComingSoon title="Support Tickets" />} />
        <Route path="/finance" element={<ComingSoon title="Finance" />} />
        <Route path="/settings" element={<ComingSoon title="Settings" />} />
      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={
          <SuspensePage><NotFoundPage /></SuspensePage>
        }
      />
    </Routes>
  );
}

// ─── Coming Soon Placeholder ───
function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] animate-fade-in">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 opacity-50">
          <span className="text-2xl">🚧</span>
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground mt-2">
          This module will be built in the next phase.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "var(--card)",
              color: "var(--card-foreground)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              fontSize: "13px",
              boxShadow: "0 8px 32px -8px rgba(0,0,0,0.15)",
            },
            success: {
              iconTheme: { primary: "#10b981", secondary: "#fff" },
            },
            error: {
              iconTheme: { primary: "#ef4444", secondary: "#fff" },
            },
          }}
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

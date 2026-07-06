import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebarStore";
import {
  LayoutDashboard,
  Store,
  Users,
  CalendarCheck,
  ShoppingBag,
  CreditCard,
  UtensilsCrossed,
  Grid3X3,
  Tag,
  BarChart3,
  Star,
  Bell,
  HeadphonesIcon,
  Wallet,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Restaurants", icon: Store, path: "/restaurants" },
  { label: "Customers", icon: Users, path: "/customers" },
  { label: "Reservations", icon: CalendarCheck, path: "/reservations" },
  { label: "Orders", icon: ShoppingBag, path: "/orders" },
  { label: "Payments", icon: CreditCard, path: "/payments" },
  { label: "Menus", icon: UtensilsCrossed, path: "/menus" },
  { label: "Tables", icon: Grid3X3, path: "/tables" },
  { label: "Offers", icon: Tag, path: "/offers" },
  { label: "Analytics", icon: BarChart3, path: "/analytics" },
  { label: "Reviews", icon: Star, path: "/reviews" },
  { label: "Notifications", icon: Bell, path: "/notifications" },
  { label: "Support Tickets", icon: HeadphonesIcon, path: "/support" },
  { label: "Finance", icon: Wallet, path: "/finance" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

export function Sidebar() {
  const { isCollapsed, toggle } = useSidebarStore();
  const { logout, user } = useAuthStore();
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen flex flex-col",
        "bg-sidebar text-sidebar-foreground",
        "border-r border-sidebar-border",
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      {/* ─── Logo ─── */}
      <div
        className={cn(
          "flex items-center h-16 px-4 border-b border-sidebar-border",
          "shrink-0",
          isCollapsed ? "justify-center" : "gap-3"
        )}
      >
        <div className="flex items-center justify-center w-9 h-9 rounded-xl overflow-hidden shrink-0">
          <img src="/logo.png" alt="Zuno Logo" className="w-full h-full object-contain bg-white" />
        </div>
        {!isCollapsed && (
          <div className="animate-fade-in">
            <h1 className="text-sm font-bold tracking-tight text-sidebar-foreground">
              Zuno
            </h1>
            <p className="text-[10px] text-sidebar-foreground/50 font-medium tracking-wider uppercase">
              Admin Panel
            </p>
          </div>
        )}
      </div>

      {/* ─── Navigation ─── */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium",
                "transition-all duration-200 group relative",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                  : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
                isCollapsed && "justify-center px-0"
              )}
            >
              {/* Active indicator line */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full gradient-primary" />
              )}

              <item.icon
                className={cn(
                  "shrink-0 transition-colors duration-200",
                  isActive
                    ? "text-primary"
                    : "text-sidebar-foreground/40 group-hover:text-sidebar-foreground/70",
                  isCollapsed ? "w-5 h-5" : "w-[18px] h-[18px]"
                )}
              />

              {!isCollapsed && (
                <span className="truncate">{item.label}</span>
              )}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div
                  className={cn(
                    "absolute left-full ml-2 px-2.5 py-1.5 rounded-lg text-xs font-medium",
                    "bg-foreground text-background",
                    "opacity-0 invisible group-hover:opacity-100 group-hover:visible",
                    "transition-all duration-200 whitespace-nowrap z-50",
                    "pointer-events-none"
                  )}
                >
                  {item.label}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* ─── Bottom Section ─── */}
      <div className="shrink-0 border-t border-sidebar-border p-3 space-y-2">
        {/* Collapse Toggle */}
        <button
          onClick={toggle}
          className={cn(
            "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[13px] font-medium",
            "text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
            "transition-all duration-200",
            isCollapsed && "justify-center px-0"
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="w-[18px] h-[18px]" />
          ) : (
            <>
              <ChevronLeft className="w-[18px] h-[18px]" />
              <span>Collapse</span>
            </>
          )}
        </button>

        {/* Logout */}
        <button
          onClick={() => logout()}
          className={cn(
            "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[13px] font-medium",
            "text-red-400/70 hover:text-red-400 hover:bg-red-500/10",
            "transition-all duration-200",
            isCollapsed && "justify-center px-0"
          )}
        >
          <LogOut className="w-[18px] h-[18px] shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>

        {/* User Info */}
        {!isCollapsed && user && (
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-sidebar-accent/30">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-sidebar-foreground truncate">
                {user.name}
              </p>
              <p className="text-[10px] text-sidebar-foreground/40 truncate">
                {user.role.replace(/_/g, " ")}
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

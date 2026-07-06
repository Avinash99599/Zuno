import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebarStore";
import { useThemeStore } from "@/stores/themeStore";
import { useAuthStore } from "@/stores/authStore";
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  ShoppingBag,
  IndianRupee,
} from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { isCollapsed, setMobileOpen } = useSidebarStore();
  const { theme, setTheme, resolvedTheme } = useThemeStore();
  const { user } = useAuthStore();
  const [searchFocused, setSearchFocused] = useState(false);

  const toggleTheme = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-16",
        "bg-background/80 backdrop-blur-xl border-b border-border/50",
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "left-[72px]" : "left-[260px]"
      )}
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* ─── Left: Mobile Menu + Search ─── */}
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search */}
          <div
            className={cn(
              "relative flex items-center",
              "transition-all duration-300",
              searchFocused ? "w-80" : "w-64"
            )}
          >
            <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search anything... ⌘K"
              className={cn(
                "w-full h-9 pl-9 pr-4 rounded-xl text-sm",
                "bg-muted/50 border border-transparent",
                "placeholder:text-muted-foreground/50",
                "focus:outline-none focus:border-primary/30 focus:bg-background",
                "transition-all duration-200"
              )}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        {/* ─── Right: Stats + Actions ─── */}
        <div className="flex items-center gap-2">
          {/* Live Stats (hidden on small screens) */}
          <div className="hidden xl:flex items-center gap-4 mr-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10">
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                5 Live Orders
              </span>
            </div>
          </div>

          {/* Separator */}
          <div className="hidden xl:block w-px h-6 bg-border" />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={cn(
              "relative p-2.5 rounded-xl",
              "hover:bg-muted transition-all duration-200",
              "group"
            )}
            title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
          >
            {resolvedTheme === "dark" ? (
              <Sun className="w-[18px] h-[18px] text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
            ) : (
              <Moon className="w-[18px] h-[18px] text-slate-600 group-hover:-rotate-12 transition-transform duration-300" />
            )}
          </button>

          {/* Notifications */}
          <button
            className={cn(
              "relative p-2.5 rounded-xl",
              "hover:bg-muted transition-all duration-200"
            )}
          >
            <Bell className="w-[18px] h-[18px] text-muted-foreground" />
            {/* Notification badge */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-pulse-glow" />
          </button>

          {/* Profile */}
          <button className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-muted transition-all duration-200 ml-1">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">
              {user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2) || "AD"}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold leading-tight">
                {user?.name || "Admin"}
              </p>
              <p className="text-[10px] text-muted-foreground leading-tight">
                {user?.role?.replace(/_/g, " ") || "Super Admin"}
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

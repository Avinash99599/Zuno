import { cn, formatCurrency } from "@/lib/utils";
import {
  Store,
  Users,
  ShoppingBag,
  CalendarCheck,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Grid3X3,
  CreditCard,
  ArrowUpRight,
  Activity,
} from "lucide-react";

// ─── Stat Card Component ───
function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  gradient,
  delay,
  glowClass,
}: {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon: React.ElementType;
  gradient: string;
  delay: number;
  glowClass: string;
}) {
  const isPositive = (change || 0) >= 0;

  return (
    <div
      className={cn(
        "glass-card rounded-2xl p-5 relative overflow-hidden group border border-border/50",
        "hover:-translate-y-1 transition-all duration-300 ease-out",
        glowClass,
        "animate-fade-in opacity-0"
      )}
      style={{ animationDelay: `${delay * 0.07}s`, animationFillMode: "forwards" }}
    >
      {/* Gradient accent */}
      <div
        className={cn(
          "absolute top-0 right-0 w-24 h-24 rounded-full opacity-15 blur-2xl",
          "group-hover:opacity-30 transition-opacity duration-500",
          gradient
        )}
      />

      <div className="flex items-start justify-between relative">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
          <p className="text-2xl font-bold mt-1.5 tracking-tight bg-clip-text text-foreground">
            {value}
          </p>
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {isPositive ? (
                <TrendingUp className="w-3 h-3 text-emerald-500 animate-bounce" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-500" />
              )}
              <span
                className={cn(
                  "text-xs font-bold",
                  isPositive ? "text-emerald-500" : "text-red-500"
                )}
              >
                {isPositive ? "+" : ""}
                {change}%
              </span>
              {changeLabel && (
                <span className="text-[10px] text-muted-foreground">
                  {changeLabel}
                </span>
              )}
            </div>
          )}
        </div>
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
            gradient,
            "shadow-md shadow-black/10"
          )}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
}

// ─── Activity Item ───
function ActivityItemRow({
  title,
  description,
  time,
  delay,
}: {
  title: string;
  description: string;
  time: string;
  delay: number;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 py-3 animate-fade-in opacity-0"
      )}
      style={{ animationDelay: `${delay * 0.08}s`, animationFillMode: "forwards" }}
    >
      <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0 animate-pulse-glow" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium truncate">{title}</p>
        <p className="text-xs text-muted-foreground truncate">{description}</p>
      </div>
      <span className="text-[11px] text-muted-foreground whitespace-nowrap shrink-0">
        {time}
      </span>
    </div>
  );
}

import { useDataStore } from "@/stores/dataStore";

export default function DashboardPage() {
  const { restaurants, customers, orders, reservations } = useDataStore();

  const totalRestaurants = restaurants.length;
  const totalCustomers = customers.length;
  const liveOrders = orders.filter(o => o.orderStatus !== "DELIVERED" && o.orderStatus !== "CANCELLED").length;
  const activeRestaurants = restaurants.filter(r => r.status === "OPEN").length;
  const pendingApproval = restaurants.filter(r => r.status === "PENDING").length;
  const todaysReservations = reservations.filter(r => r.date.startsWith("2025-07-06")).length;

  return (
    <div className="space-y-6">
      {/* ─── Page Header ─── */}
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back! Here's what's happening with your platform today.
        </p>
      </div>

      {/* ─── Stat Cards Grid ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Total Restaurants"
          value={String(totalRestaurants)}
          change={12}
          changeLabel="vs last month"
          icon={Store}
          gradient="gradient-primary"
          delay={1}
          glowClass="card-glow-purple"
        />
        <StatCard
          title="Total Customers"
          value={String(totalCustomers)}
          change={8.5}
          changeLabel="vs last month"
          icon={Users}
          gradient="gradient-accent"
          delay={2}
          glowClass="card-glow-emerald"
        />
        <StatCard
          title="Live Orders"
          value={String(liveOrders)}
          change={-3.2}
          changeLabel="vs yesterday"
          icon={ShoppingBag}
          gradient="gradient-warm"
          delay={3}
          glowClass="card-glow-orange"
        />
      </div>

      {/* ─── Secondary Stats ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Active Restaurants", value: String(activeRestaurants), color: "text-emerald-500", glowClass: "card-glow-emerald" },
          { label: "Pending Approval", value: String(pendingApproval), color: "text-amber-500", glowClass: "card-glow-orange" },
          { label: "Today's Reservations", value: String(todaysReservations), color: "text-blue-500", glowClass: "card-glow-blue" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className={cn(
              "glass-card rounded-xl p-4 text-center border border-border/50 transition-all duration-300",
              stat.glowClass,
              "animate-fade-in opacity-0"
            )}
            style={{ animationDelay: `${(i + 4) * 0.07}s`, animationFillMode: "forwards" }}
          >
            <p className={cn("text-2xl font-bold tracking-tight", stat.color)}>{stat.value}</p>
            <p className="text-xs font-medium text-muted-foreground mt-1 leading-tight">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* ─── Charts + Activity ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart Placeholder */}
        <div
          className={cn(
            "lg:col-span-2 glass-card rounded-2xl p-5",
            "animate-fade-in opacity-0"
          )}
          style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-primary" />
              Revenue Overview
            </h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <button className="px-2.5 py-1 rounded-md bg-primary/10 text-primary font-medium">
                Monthly
              </button>
              <button className="px-2.5 py-1 rounded-md hover:bg-muted transition-colors">
                Weekly
              </button>
              <button className="px-2.5 py-1 rounded-md hover:bg-muted transition-colors">
                Daily
              </button>
            </div>
          </div>
          {/* Placeholder for Recharts — will be populated in Phase 1 */}
          <div className="h-64 flex items-center justify-center rounded-xl bg-muted/30 border border-dashed border-border">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground/50">
                Revenue chart will render here
              </p>
              <p className="text-xs text-muted-foreground/30 mt-1">
                Phase 1 — Live charts with Recharts
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div
          className={cn(
            "glass-card rounded-2xl p-5",
            "animate-fade-in opacity-0"
          )}
          style={{ animationDelay: "1s", animationFillMode: "forwards" }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Recent Activity
            </h3>
            <button className="text-xs text-primary hover:underline flex items-center gap-1">
              View All
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="divide-y divide-border/50">
            <ActivityItemRow
              title="New Order Placed"
              description="Aarav Sharma — The Golden Spoon"
              time="30m ago"
              delay={1}
            />
            <ActivityItemRow
              title="Payment Received"
              description="Sneha Patel — ₹1,780"
              time="45m ago"
              delay={2}
            />
            <ActivityItemRow
              title="New Reservation"
              description="Meera Iyer — Bistro 42"
              time="2h ago"
              delay={3}
            />
            <ActivityItemRow
              title="Restaurant Registered"
              description="Spice Garden — Pending Approval"
              time="3d ago"
              delay={4}
            />
            <ActivityItemRow
              title="Order Completed"
              description="Meera Iyer — The Golden Spoon"
              time="4h ago"
              delay={5}
            />
            <ActivityItemRow
              title="New Review"
              description="Vikram Singh — ⭐ 5 stars"
              time="1d ago"
              delay={6}
            />
          </div>
        </div>
      </div>

      {/* ─── Quick Actions ─── */}
      <div
        className={cn(
          "glass-card rounded-2xl p-5",
          "animate-fade-in opacity-0"
        )}
        style={{ animationDelay: "1.1s", animationFillMode: "forwards" }}
      >
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <Grid3X3 className="w-4 h-4 text-primary" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Approve Restaurant", icon: Store, gradient: "gradient-primary" },
            { label: "View Live Orders", icon: ShoppingBag, gradient: "gradient-warm" },
            { label: "Check Reservations", icon: CalendarCheck, gradient: "gradient-accent" },
            { label: "View Payments", icon: CreditCard, gradient: "gradient-cool" },
          ].map((action) => (
            <button
              key={action.label}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl",
                "bg-muted/30 border border-border/50",
                "hover:bg-muted/50 hover:border-border hover:scale-[1.02]",
                "transition-all duration-200 group"
              )}
            >
              <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", action.gradient)}>
                <action.icon className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="text-xs font-medium text-center leading-tight">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

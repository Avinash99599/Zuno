import { useState, useMemo } from "react";
import { cn, formatCurrency } from "@/lib/utils";
import { BarChart3, IndianRupee, Users, CalendarCheck, TrendingUp, ShoppingBag, Clock, UtensilsCrossed } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { useDataStore } from "@/stores/dataStore";
import {
  revenueByMonth,
  revenueByDay,
  peakHoursData,
  salesByCategory,
  restaurantPerformance,
} from "@/lib/mockData";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const timeFilters = ["Today", "Week", "Month", "Year"] as const;

export default function AnalyticsPage() {
  const [timeFilter, setTimeFilter] = useState<string>("Month");
  const { payments, orders, customers, reservations } = useDataStore();

  const totalRevenue = useMemo(() => payments.filter((p) => p.status === "COMPLETED").reduce((s, p) => s + p.amount, 0), [payments]);

  const chartCardClass = cn("glass-card rounded-2xl p-5 border border-border/50");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        subtitle="Business intelligence and performance insights"
        icon={BarChart3}
        actions={
          <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/50 border border-border/50">
            {timeFilters.map((f) => (
              <button
                key={f}
                onClick={() => setTimeFilter(f)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                  timeFilter === f ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        }
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Revenue" value={formatCurrency(totalRevenue)} icon={IndianRupee} gradient="gradient-primary" glowClass="card-glow-purple" delay={1} change={18.5} changeLabel="vs last period" />
        <StatCard title="Total Orders" value={orders.length.toLocaleString()} icon={ShoppingBag} gradient="gradient-accent" glowClass="card-glow-emerald" delay={2} change={12.3} changeLabel="vs last period" />
        <StatCard title="New Customers" value={customers.length.toLocaleString()} icon={Users} gradient="gradient-warm" glowClass="card-glow-orange" delay={3} change={24.1} changeLabel="vs last period" />
        <StatCard title="Reservations" value={reservations.length.toLocaleString()} icon={CalendarCheck} gradient="gradient-cool" glowClass="card-glow-blue" delay={4} change={9.7} changeLabel="vs last period" />
      </div>

      {/* Revenue Analytics — Area Chart */}
      <div className={cn(chartCardClass, "animate-fade-in opacity-0")} style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
        <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-primary" />
          Revenue Analytics
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueByMonth}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.68 0.23 45)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.68 0.23 45)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0 0 / 0.1)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="oklch(0.5 0 0 / 0.4)" />
              <YAxis tick={{ fontSize: 12 }} stroke="oklch(0.5 0 0 / 0.4)" tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "13px" }} formatter={(value: number) => [formatCurrency(value), "Revenue"]} />
              <Area type="monotone" dataKey="revenue" stroke="oklch(0.68 0.23 45)" fill="url(#revGrad)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Growth — Line Chart */}
        <div className={cn(chartCardClass, "animate-fade-in opacity-0")} style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-primary" />
            Customer Growth
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0 0 / 0.1)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="oklch(0.5 0 0 / 0.4)" />
                <YAxis tick={{ fontSize: 12 }} stroke="oklch(0.5 0 0 / 0.4)" />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "13px" }} />
                <Line type="monotone" dataKey="customers" stroke="oklch(0.72 0.2 55)" strokeWidth={2.5} dot={{ fill: "oklch(0.72 0.2 55)", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Peak Hours — Bar Chart */}
        <div className={cn(chartCardClass, "animate-fade-in opacity-0")} style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-primary" />
            Peak Hours
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={peakHoursData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0 0 / 0.1)" />
                <XAxis dataKey="hour" tick={{ fontSize: 10 }} stroke="oklch(0.5 0 0 / 0.4)" />
                <YAxis tick={{ fontSize: 12 }} stroke="oklch(0.5 0 0 / 0.4)" />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "13px" }} />
                <Bar dataKey="orders" fill="oklch(0.68 0.23 45)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Category — Pie Chart */}
        <div className={cn(chartCardClass, "animate-fade-in opacity-0")} style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}>
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
            <UtensilsCrossed className="w-4 h-4 text-primary" />
            Sales by Category
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={salesByCategory} dataKey="value" nameKey="category" cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={4} strokeWidth={0}>
                  {salesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "13px" }} formatter={(value: number) => [`${value}%`, "Share"]} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Restaurant Performance — Bar Chart */}
        <div className={cn(chartCardClass, "animate-fade-in opacity-0")} style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-primary" />
            Restaurant Performance
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={restaurantPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0 0 / 0.1)" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="oklch(0.5 0 0 / 0.4)" tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" width={120} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "13px" }} formatter={(value: number) => [formatCurrency(value), "Revenue"]} />
                <Bar dataKey="revenue" fill="oklch(0.72 0.2 55)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Daily Revenue — Bar Chart */}
      <div className={cn(chartCardClass, "animate-fade-in opacity-0")} style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}>
        <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
          <IndianRupee className="w-4 h-4 text-primary" />
          Daily Revenue (This Week)
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueByDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0 0 / 0.1)" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="oklch(0.5 0 0 / 0.4)" />
              <YAxis tick={{ fontSize: 12 }} stroke="oklch(0.5 0 0 / 0.4)" tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "13px" }} formatter={(value: number) => [formatCurrency(value), "Revenue"]} />
              <Bar dataKey="revenue" fill="oklch(0.62 0.22 35)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Most Ordered Items — Horizontal Bar */}
      <div className={cn(chartCardClass, "animate-fade-in opacity-0")} style={{ animationDelay: "1.0s", animationFillMode: "forwards" }}>
        <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
          <ShoppingBag className="w-4 h-4 text-primary" />
          Most Ordered Food Items
        </h3>
        <div className="space-y-3">
          {[
            { name: "Filter Coffee", orders: 680, pct: 100 },
            { name: "Masala Dosa", orders: 520, pct: 76 },
            { name: "Hyderabadi Biryani", orders: 428, pct: 63 },
            { name: "Butter Chicken", orders: 342, pct: 50 },
            { name: "Mango Lassi", orders: 312, pct: 46 },
            { name: "Margherita Pizza", orders: 287, pct: 42 },
          ].map((item, i) => (
            <div key={item.name} className={cn("animate-fade-in opacity-0")} style={{ animationDelay: `${1 + i * 0.05}s`, animationFillMode: "forwards" }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{item.name}</span>
                <span className="text-xs font-semibold text-muted-foreground">{item.orders} orders</span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full gradient-primary transition-all duration-700 ease-out" style={{ width: `${item.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

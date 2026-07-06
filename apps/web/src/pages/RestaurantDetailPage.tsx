import { useParams, useNavigate } from "react-router-dom";
import { cn, formatCurrency } from "@/lib/utils";
import { ArrowLeft, Clock, Users, UtensilsCrossed, Star, ShoppingBag, IndianRupee, Grid3X3, MapPin, Mail, Phone, Calendar } from "lucide-react";
import { useDataStore } from "@/stores/dataStore";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { DataTable } from "@/components/shared/DataTable";

export default function RestaurantDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { restaurants, orders, menuItems, tables } = useDataStore();

  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] animate-fade-in">
        <div className="text-center">
          <p className="text-lg font-bold">Restaurant not found</p>
          <button onClick={() => navigate("/restaurants")} className="text-sm text-primary hover:underline mt-2">← Back to Restaurants</button>
        </div>
      </div>
    );
  }

  const restaurantOrders = orders.filter((o) => o.restaurantId === restaurant.id);
  const restaurantMenus = menuItems.filter((m) => m.restaurantId === restaurant.id);
  const restaurantTables = tables.filter((t) => t.restaurantId === restaurant.id);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button onClick={() => navigate("/restaurants")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors animate-fade-in">
        <ArrowLeft className="w-4 h-4" />
        Back to Restaurants
      </button>

      {/* Restaurant Header */}
      <div className="glass-card rounded-2xl p-6 border border-border/50 animate-fade-in">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="w-16 h-16 rounded-2xl bg-muted/60 flex items-center justify-center text-3xl shrink-0 overflow-hidden">
            {restaurant.logo && (restaurant.logo.startsWith("http") || restaurant.logo.startsWith("/")) ? (
              <img src={restaurant.logo} alt={restaurant.name} className="w-full h-full object-cover" />
            ) : (
              restaurant.logo || "🍽️"
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold tracking-tight">{restaurant.name}</h1>
              <StatusBadge status={restaurant.status} pulse={restaurant.status === "OPEN"} />
            </div>
            <p className="text-sm text-muted-foreground mt-1">{restaurant.cuisine.join(" • ")}</p>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {restaurant.owner}</span>
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {restaurant.email}</span>
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {restaurant.phone}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {restaurant.address}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Joined {new Date(restaurant.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span>
            </div>
          </div>
          {restaurant.rating > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 shrink-0">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span className="text-lg font-bold text-amber-600 dark:text-amber-400">{restaurant.rating}</span>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Today's Revenue" value={formatCurrency(restaurant.revenue)} icon={IndianRupee} gradient="gradient-primary" glowClass="card-glow-purple" delay={1} change={8.5} changeLabel="vs yesterday" />
        <StatCard title="Today's Orders" value={String(restaurant.todaysOrders)} icon={ShoppingBag} gradient="gradient-accent" glowClass="card-glow-emerald" delay={2} />
        <StatCard title="Menu Items" value={String(restaurant.menuCount || restaurantMenus.length)} icon={UtensilsCrossed} gradient="gradient-warm" glowClass="card-glow-orange" delay={3} />
        <StatCard title="Total Tables" value={String(restaurant.totalTables || restaurantTables.length)} icon={Grid3X3} gradient="gradient-cool" glowClass="card-glow-blue" delay={4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Opening Hours */}
        <div className="glass-card rounded-2xl p-5 border border-border/50 animate-fade-in" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-primary" />
            Opening Hours
          </h3>
          <div className="space-y-3">
            {restaurant.openingHours.map((h, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="font-medium">{h.day}</span>
                <span className="text-muted-foreground">{h.open} — {h.close}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Staff & Info */}
        <div className="glass-card rounded-2xl p-5 border border-border/50 animate-fade-in" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-primary" />
            Quick Info
          </h3>
          <div className="space-y-3">
            {[
              { label: "Staff Members", value: String(restaurant.staffCount) },
              { label: "Menu Items", value: String(restaurant.menuCount || restaurantMenus.length) },
              { label: "Total Tables", value: String(restaurant.totalTables) },
              { label: "Occupied Tables", value: String(restaurantTables.filter((t) => t.status === "OCCUPIED").length) },
              { label: "Available Tables", value: String(restaurantTables.filter((t) => t.status === "AVAILABLE").length) },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Menu Items */}
        <div className="glass-card rounded-2xl p-5 border border-border/50 animate-fade-in" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
            <UtensilsCrossed className="w-4 h-4 text-primary" />
            Top Menu Items
          </h3>
          <div className="space-y-2.5">
            {restaurantMenus.sort((a, b) => b.orders - a.orders).slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-sm shrink-0 overflow-hidden">
                  {item.image && (item.image.startsWith("http") || item.image.startsWith("/")) ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    item.image || "🍔"
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-[11px] text-muted-foreground">{item.orders} orders</p>
                </div>
                <span className="text-sm font-semibold">{formatCurrency(item.price)}</span>
              </div>
            ))}
            {restaurantMenus.length === 0 && <p className="text-xs text-muted-foreground text-center py-4">No menu items yet</p>}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="animate-fade-in" style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}>
        <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
          <ShoppingBag className="w-4 h-4 text-primary" />
          Recent Orders
        </h3>
        <DataTable
          columns={[
            { key: "id", label: "Order ID", render: (o) => <span className="text-xs font-mono font-semibold text-primary">{o.id}</span> },
            { key: "customerName", label: "Customer", render: (o) => <span className="text-sm font-medium">{o.customerName}</span> },
            { key: "items", label: "Items", render: (o) => <span className="text-xs text-muted-foreground">{o.items.length} items</span> },
            { key: "total", label: "Total", render: (o) => <span className="text-sm font-semibold">{formatCurrency(o.total)}</span> },
            { key: "orderStatus", label: "Status", render: (o) => <StatusBadge status={o.orderStatus} /> },
            { key: "deliveryType", label: "Type", render: (o) => <span className="text-xs">{o.deliveryType}</span> },
          ]}
          data={restaurantOrders.slice(0, 5)}
          keyExtractor={(o) => o.id}
        />
      </div>
    </div>
  );
}

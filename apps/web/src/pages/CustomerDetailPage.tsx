import { useParams, useNavigate } from "react-router-dom";
import { cn, formatCurrency } from "@/lib/utils";
import { ArrowLeft, Mail, Phone, Calendar, Award, ShoppingBag, CalendarCheck, Heart, CreditCard, StickyNote, Star } from "lucide-react";
import { useDataStore } from "@/stores/dataStore";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { DataTable } from "@/components/shared/DataTable";

export default function CustomerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { customers, orders, reservations, payments } = useDataStore();

  const customer = customers.find((c) => c.id === id);

  if (!customer) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] animate-fade-in">
        <div className="text-center">
          <p className="text-lg font-bold">Customer not found</p>
          <button onClick={() => navigate("/customers")} className="text-sm text-primary hover:underline mt-2">← Back to Customers</button>
        </div>
      </div>
    );
  }

  const customerOrders = orders.filter((o) => o.customerId === customer.id);
  const customerReservations = reservations.filter((r) => r.customerId === customer.id);
  const customerPayments = payments.filter((p) => p.customerId === customer.id);

  return (
    <div className="space-y-6">
      <button onClick={() => navigate("/customers")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors animate-fade-in">
        <ArrowLeft className="w-4 h-4" />Back to Customers
      </button>

      {/* Profile Header */}
      <div className="glass-card rounded-2xl p-6 border border-border/50 animate-fade-in">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-white text-xl font-bold shrink-0">{customer.avatar}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold tracking-tight">{customer.name}</h1>
              <StatusBadge status={customer.status} />
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {customer.email}</span>
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {customer.phone}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Joined {new Date(customer.joinedAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 shrink-0">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="text-lg font-bold text-amber-600 dark:text-amber-400">{customer.loyaltyPoints.toLocaleString()}</span>
            <span className="text-[10px] text-amber-600/60 dark:text-amber-400/60">pts</span>
          </div>
        </div>
      </div>

      {/* Stat Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Orders", value: String(customer.totalOrders), icon: ShoppingBag, color: "text-primary" },
          { label: "Reservations", value: String(customer.reservations), icon: CalendarCheck, color: "text-blue-500" },
          { label: "Total Spent", value: formatCurrency(customer.totalSpent), icon: CreditCard, color: "text-emerald-500" },
          { label: "Last Visit", value: new Date(customer.lastVisit).toLocaleDateString("en-IN", { day: "numeric", month: "short" }), icon: Calendar, color: "text-violet-500" },
        ].map((stat, i) => (
          <div key={stat.label} className={cn("glass-card rounded-xl p-4 border border-border/50 animate-fade-in opacity-0")} style={{ animationDelay: `${(i + 1) * 0.08}s`, animationFillMode: "forwards" }}>
            <stat.icon className={cn("w-5 h-5 mb-2", stat.color)} />
            <p className="text-xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Favorite Items */}
        <div className="glass-card rounded-2xl p-5 border border-border/50 animate-fade-in" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-4"><Heart className="w-4 h-4 text-red-500" /> Favorite Items</h3>
          <div className="space-y-2">
            {customer.favoriteItems.map((item) => (
              <div key={item} className="flex items-center gap-2.5 p-2 rounded-lg bg-muted/30">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-5 border border-border/50 animate-fade-in" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-4"><StickyNote className="w-4 h-4 text-primary" /> Notes</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{customer.notes || "No notes added yet."}</p>
        </div>
      </div>

      {/* Order History */}
      <div className="animate-fade-in" style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}>
        <h3 className="text-sm font-semibold flex items-center gap-2 mb-3"><ShoppingBag className="w-4 h-4 text-primary" /> Order History</h3>
        <DataTable
          columns={[
            { key: "id", label: "Order ID", render: (o) => <span className="text-xs font-mono font-semibold text-primary">{o.id}</span> },
            { key: "restaurantName", label: "Restaurant", render: (o) => <span className="text-sm">{o.restaurantName}</span> },
            { key: "items", label: "Items", render: (o) => <span className="text-xs text-muted-foreground">{o.items.map((i) => i.name).join(", ")}</span> },
            { key: "total", label: "Total", render: (o) => <span className="text-sm font-semibold">{formatCurrency(o.total)}</span> },
            { key: "orderStatus", label: "Status", render: (o) => <StatusBadge status={o.orderStatus} /> },
          ]}
          data={customerOrders}
          keyExtractor={(o) => o.id}
        />
      </div>

      {/* Reservation History */}
      <div className="animate-fade-in" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>
        <h3 className="text-sm font-semibold flex items-center gap-2 mb-3"><CalendarCheck className="w-4 h-4 text-primary" /> Reservation History</h3>
        <DataTable
          columns={[
            { key: "id", label: "ID", render: (r) => <span className="text-xs font-mono font-semibold text-primary">{r.id}</span> },
            { key: "restaurantName", label: "Restaurant", render: (r) => <span className="text-sm">{r.restaurantName}</span> },
            { key: "date", label: "Date & Time", render: (r) => <span className="text-xs">{new Date(r.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} at {r.time}</span> },
            { key: "guests", label: "Guests", render: (r) => <span className="text-sm">{r.guests}</span> },
            { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
          ]}
          data={customerReservations}
          keyExtractor={(r) => r.id}
        />
      </div>

      {/* Payment History */}
      <div className="animate-fade-in" style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}>
        <h3 className="text-sm font-semibold flex items-center gap-2 mb-3"><CreditCard className="w-4 h-4 text-primary" /> Payment History</h3>
        <DataTable
          columns={[
            { key: "id", label: "Payment ID", render: (p) => <span className="text-xs font-mono font-semibold text-primary">{p.id}</span> },
            { key: "orderId", label: "Order", render: (p) => <span className="text-xs font-mono">{p.orderId}</span> },
            { key: "amount", label: "Amount", render: (p) => <span className="text-sm font-semibold">{formatCurrency(p.amount)}</span> },
            { key: "paymentMethod", label: "Method", render: (p) => <span className="text-xs">{p.paymentMethod}</span> },
            { key: "status", label: "Status", render: (p) => <StatusBadge status={p.status} /> },
          ]}
          data={customerPayments}
          keyExtractor={(p) => p.id}
        />
      </div>
    </div>
  );
}

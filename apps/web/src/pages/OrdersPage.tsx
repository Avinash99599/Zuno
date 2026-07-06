import { useState, useMemo } from "react";
import { cn, formatCurrency } from "@/lib/utils";
import { ShoppingBag, Clock, CheckCircle, XCircle, Truck, ChefHat, Eye } from "lucide-react";
import { useDataStore } from "@/stores/dataStore";
import { type MockOrder } from "@/lib/mockData";
import { PageHeader } from "@/components/shared/PageHeader";
import { SearchFilter } from "@/components/shared/SearchFilter";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Pagination } from "@/components/shared/Pagination";
import { Modal } from "@/components/shared/Modal";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 6;

const statusPipeline = [
  { key: "PENDING", label: "Pending", icon: Clock, color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
  { key: "CONFIRMED", label: "Confirmed", icon: CheckCircle, color: "text-blue-500", bgColor: "bg-blue-500/10" },
  { key: "PREPARING", label: "Preparing", icon: ChefHat, color: "text-amber-500", bgColor: "bg-amber-500/10" },
  { key: "READY", label: "Ready", icon: ShoppingBag, color: "text-emerald-500", bgColor: "bg-emerald-500/10" },
  { key: "DELIVERED", label: "Delivered", icon: Truck, color: "text-emerald-600", bgColor: "bg-emerald-600/10" },
  { key: "CANCELLED", label: "Cancelled", icon: XCircle, color: "text-red-500", bgColor: "bg-red-500/10" },
];

export default function OrdersPage() {
  const { orders, updateOrderStatus, updateOrderPaymentStatus } = useDataStore();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [detailOrderId, setDetailOrderId] = useState<string | null>(null);

  const detailOrder = useMemo(() => orders.find((o) => o.id === detailOrderId) || null, [orders, detailOrderId]);

  const filtered = useMemo(() => {
    let data = [...orders];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter((o) => o.id.toLowerCase().includes(q) || o.customerName.toLowerCase().includes(q) || o.restaurantName.toLowerCase().includes(q));
    }
    if (filters.status && filters.status !== "all") data = data.filter((o) => o.orderStatus === filters.status);
    if (filters.payment && filters.payment !== "all") data = data.filter((o) => o.paymentStatus === filters.payment);
    if (filters.type && filters.type !== "all") data = data.filter((o) => o.deliveryType === filters.type);
    return data;
  }, [search, filters, orders]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const columns = [
    { key: "id", label: "Order ID", render: (o: MockOrder) => <span className="text-xs font-mono font-semibold text-primary">{o.id}</span> },
    {
      key: "customer",
      label: "Customer",
      render: (o: MockOrder) => (
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">{o.customerName}</p>
        </div>
      ),
    },
    { key: "restaurant", label: "Restaurant", render: (o: MockOrder) => <span className="text-sm">{o.restaurantName}</span> },
    {
      key: "items",
      label: "Items",
      render: (o: MockOrder) => (
        <div className="max-w-[140px]">
          <p className="text-xs text-muted-foreground truncate">{o.items.map((i) => i.name).join(", ")}</p>
          <p className="text-[10px] text-muted-foreground/60">{o.items.length} items</p>
        </div>
      ),
    },
    { key: "total", label: "Total", render: (o: MockOrder) => <span className="text-sm font-bold">{formatCurrency(o.total)}</span> },
    { key: "paymentStatus", label: "Payment", render: (o: MockOrder) => <StatusBadge status={o.paymentStatus} /> },
    { key: "orderStatus", label: "Order Status", render: (o: MockOrder) => <StatusBadge status={o.orderStatus} pulse={o.orderStatus === "PREPARING"} /> },
    {
      key: "deliveryType",
      label: "Type",
      render: (o: MockOrder) => (
        <span className={cn("inline-flex px-2 py-0.5 rounded-md text-[11px] font-medium", o.deliveryType === "Dine-in" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" : o.deliveryType === "Delivery" ? "bg-violet-500/10 text-violet-600 dark:text-violet-400" : "bg-amber-500/10 text-amber-600 dark:text-amber-400")}>
          {o.deliveryType}
        </span>
      ),
    },
    {
      key: "orderTime",
      label: "Time",
      render: (o: MockOrder) => (
        <div>
          <p className="text-xs">{new Date(o.orderTime).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</p>
          <p className="text-[10px] text-muted-foreground">{new Date(o.orderTime).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
        </div>
      ),
    },
    {
      key: "actions",
      label: "",
      render: (o: MockOrder) => (
        <button onClick={(e) => { e.stopPropagation(); setDetailOrderId(o.id); }} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors" title="View Details">
          <Eye className="w-4 h-4 text-muted-foreground" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Orders" subtitle="Track and manage all orders across restaurants" icon={ShoppingBag} />

      {/* Status Pipeline */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {statusPipeline.map((s, i) => {
          const count = orders.filter((o) => o.orderStatus === s.key).length;
          return (
            <button
              key={s.key}
              onClick={() => { setFilters((p) => ({ ...p, status: p.status === s.key ? "all" : s.key })); setPage(1); }}
              className={cn(
                "glass-card rounded-xl p-4 border border-border/50 text-center",
                "hover:-translate-y-0.5 transition-all duration-200",
                "animate-fade-in opacity-0",
                filters.status === s.key && "ring-2 ring-primary/30 border-primary/30"
              )}
              style={{ animationDelay: `${i * 0.06}s`, animationFillMode: "forwards" }}
            >
              <s.icon className={cn("w-5 h-5 mx-auto mb-1.5", s.color)} />
              <p className="text-xl font-bold">{count}</p>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{s.label}</p>
            </button>
          );
        })}
      </div>

      <SearchFilter
        searchPlaceholder="Search by order ID, customer, restaurant..."
        searchValue={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        filters={[
          { label: "Payment", key: "payment", options: [{ label: "Paid", value: "PAID" }, { label: "Pending", value: "PENDING" }, { label: "Refunded", value: "REFUNDED" }] },
          { label: "Type", key: "type", options: [{ label: "Dine-in", value: "Dine-in" }, { label: "Takeaway", value: "Takeaway" }, { label: "Delivery", value: "Delivery" }] },
        ]}
        activeFilters={filters}
        onFilterChange={(k, v) => { setFilters((p) => ({ ...p, [k]: v })); setPage(1); }}
      />

      <DataTable columns={columns} data={paginated} keyExtractor={(o) => o.id} onRowClick={(o) => setDetailOrderId(o.id)} />
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} itemsPerPage={ITEMS_PER_PAGE} />

      {/* Order Detail Modal */}
      <Modal open={!!detailOrder} onOpenChange={(open) => !open && setDetailOrderId(null)} title={`Order ${detailOrder?.id}`} subtitle={`${detailOrder?.customerName} — ${detailOrder?.restaurantName}`} size="md">
        {detailOrder && (
          <div className="space-y-5">
            {/* Status & Type */}
            <div className="flex items-center gap-3">
              <StatusBadge status={detailOrder.orderStatus} />
              <StatusBadge status={detailOrder.paymentStatus} />
              <span className="text-xs text-muted-foreground">{detailOrder.deliveryType}</span>
            </div>

            {/* Quick Actions inside Details Modal */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-muted/20 border border-border/30">
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Update Order Status</label>
                <select
                  value={detailOrder.orderStatus}
                  onChange={(e) => {
                    updateOrderStatus(detailOrder.id, e.target.value as any);
                    toast.success(`Order status updated to ${e.target.value}`);
                  }}
                  className={cn("w-full h-9 px-2 rounded-lg text-xs bg-card border border-border/50 cursor-pointer")}
                >
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="PREPARING">Preparing</option>
                  <option value="READY">Ready</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Update Payment Status</label>
                <select
                  value={detailOrder.paymentStatus}
                  onChange={(e) => {
                    updateOrderPaymentStatus(detailOrder.id, e.target.value as any);
                    toast.success(`Payment status updated to ${e.target.value}`);
                  }}
                  className={cn("w-full h-9 px-2 rounded-lg text-xs bg-card border border-border/50 cursor-pointer")}
                >
                  <option value="PAID">Paid</option>
                  <option value="PENDING">Pending</option>
                  <option value="REFUNDED">Refunded</option>
                </select>
              </div>
            </div>

            {/* Items Table */}
            <div className="rounded-xl border border-border/50 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/30 border-b border-border/50">
                    <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-muted-foreground uppercase">Item</th>
                    <th className="px-4 py-2.5 text-center text-[11px] font-semibold text-muted-foreground uppercase">Qty</th>
                    <th className="px-4 py-2.5 text-right text-[11px] font-semibold text-muted-foreground uppercase">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {detailOrder.items.map((item, i) => (
                    <tr key={i} className="border-b border-border/30 last:border-0">
                      <td className="px-4 py-2.5 font-medium">{item.name}</td>
                      <td className="px-4 py-2.5 text-center text-muted-foreground">{item.qty}</td>
                      <td className="px-4 py-2.5 text-right font-semibold">{formatCurrency(item.price)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-muted/20">
                    <td colSpan={2} className="px-4 py-3 font-semibold">Total</td>
                    <td className="px-4 py-3 text-right font-bold text-primary">{formatCurrency(detailOrder.total)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Timeline */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Timeline</p>
              <div className="flex items-center justify-between text-xs">
                <div><p className="font-medium">Ordered</p><p className="text-muted-foreground">{new Date(detailOrder.orderTime).toLocaleString("en-IN", { hour: "2-digit", minute: "2-digit", day: "numeric", month: "short" })}</p></div>
                <div className="text-right"><p className="font-medium">Est. Ready</p><p className="text-muted-foreground">{new Date(detailOrder.estimatedTime).toLocaleString("en-IN", { hour: "2-digit", minute: "2-digit", day: "numeric", month: "short" })}</p></div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

import { useState, useMemo } from "react";
import { cn, formatCurrency } from "@/lib/utils";
import { CreditCard, IndianRupee, TrendingUp, Clock, Download, FileText, Eye } from "lucide-react";
import { useDataStore } from "@/stores/dataStore";
import { revenueByDay, type MockPayment } from "@/lib/mockData";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { SearchFilter } from "@/components/shared/SearchFilter";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Pagination } from "@/components/shared/Pagination";
import { Modal } from "@/components/shared/Modal";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 6;

export default function PaymentsPage() {
  const { payments } = useDataStore();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [detailPayment, setDetailPayment] = useState<MockPayment | null>(null);

  const filtered = useMemo(() => {
    let data = [...payments];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter((p) => p.id.toLowerCase().includes(q) || p.customerName.toLowerCase().includes(q) || p.transactionId.toLowerCase().includes(q) || p.orderId.toLowerCase().includes(q));
    }
    if (filters.status && filters.status !== "all") data = data.filter((p) => p.status === filters.status);
    if (filters.method && filters.method !== "all") data = data.filter((p) => p.paymentMethod === filters.method);
    return data;
  }, [search, filters, payments]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const todayRevenue = useMemo(() => payments.filter((p) => p.status === "COMPLETED" && p.date.startsWith("2025-07-06")).reduce((s, p) => s + p.amount, 0), [payments]);
  const weeklyRevenue = useMemo(() => payments.filter((p) => p.status === "COMPLETED").reduce((s, p) => s + p.amount, 0), [payments]);
  const pendingPayments = useMemo(() => payments.filter((p) => p.status === "PENDING").reduce((s, p) => s + p.amount, 0), [payments]);

  const columns = [
    { key: "id", label: "Payment ID", render: (p: MockPayment) => <span className="text-xs font-mono font-semibold text-primary">{p.id}</span> },
    { key: "customer", label: "Customer", render: (p: MockPayment) => <span className="text-sm font-medium">{p.customerName}</span> },
    { key: "restaurant", label: "Restaurant", render: (p: MockPayment) => <span className="text-xs">{p.restaurantName}</span> },
    { key: "orderId", label: "Order", render: (p: MockPayment) => <span className="text-xs font-mono">{p.orderId}</span> },
    { key: "amount", label: "Amount", render: (p: MockPayment) => <span className="text-sm font-bold">{formatCurrency(p.amount)}</span> },
    {
      key: "paymentMethod",
      label: "Method",
      render: (p: MockPayment) => (
        <span className={cn("inline-flex px-2 py-0.5 rounded-md text-[11px] font-medium",
          p.paymentMethod === "UPI" ? "bg-violet-500/10 text-violet-600 dark:text-violet-400" :
          p.paymentMethod === "Credit Card" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" :
          p.paymentMethod === "Cash" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
          "bg-amber-500/10 text-amber-600 dark:text-amber-400"
        )}>
          {p.paymentMethod}
        </span>
      ),
    },
    { key: "transactionId", label: "Transaction ID", render: (p: MockPayment) => <span className="text-[11px] font-mono text-muted-foreground">{p.transactionId}</span> },
    { key: "status", label: "Status", render: (p: MockPayment) => <StatusBadge status={p.status} /> },
    {
      key: "date",
      label: "Date",
      render: (p: MockPayment) => <span className="text-xs text-muted-foreground">{new Date(p.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</span>,
    },
    {
      key: "actions",
      label: "",
      render: (p: MockPayment) => (
        <div className="flex items-center gap-1">
          <button onClick={(e) => { e.stopPropagation(); setDetailPayment(p); }} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors" title="View"><Eye className="w-4 h-4 text-muted-foreground" /></button>
          <button onClick={(e) => { e.stopPropagation(); toast.success("Invoice downloaded"); }} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors" title="Download Invoice"><FileText className="w-4 h-4 text-muted-foreground" /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payments"
        subtitle="Track revenue, payments, and financial transactions"
        icon={CreditCard}
        actions={
          <button onClick={() => toast.success("CSV exported!")} className={cn("flex items-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold", "bg-muted hover:bg-muted/80 border border-border/50 transition-all duration-200")}>
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Today's Revenue" value={formatCurrency(todayRevenue)} icon={IndianRupee} gradient="gradient-primary" glowClass="card-glow-purple" delay={1} change={12.5} changeLabel="vs yesterday" />
        <StatCard title="Weekly Revenue" value={formatCurrency(weeklyRevenue)} icon={TrendingUp} gradient="gradient-accent" glowClass="card-glow-emerald" delay={2} change={8.3} changeLabel="vs last week" />
        <StatCard title="Monthly Revenue" value={formatCurrency(weeklyRevenue * 4)} icon={IndianRupee} gradient="gradient-warm" glowClass="card-glow-orange" delay={3} />
        <StatCard title="Pending Payments" value={formatCurrency(pendingPayments)} icon={Clock} gradient="gradient-cool" glowClass="card-glow-blue" delay={4} />
      </div>

      {/* Revenue Chart */}
      <div className="glass-card rounded-2xl p-5 border border-border/50 animate-fade-in" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
        <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-primary" />
          Revenue This Week
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueByDay}>
              <defs>
                <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.68 0.23 45)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.68 0.23 45)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0 0 / 0.1)" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="oklch(0.5 0 0 / 0.4)" />
              <YAxis tick={{ fontSize: 12 }} stroke="oklch(0.5 0 0 / 0.4)" tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "13px" }}
                formatter={(value: number) => [formatCurrency(value), "Revenue"]}
              />
              <Area type="monotone" dataKey="revenue" stroke="oklch(0.68 0.23 45)" fill="url(#revGradient)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <SearchFilter
        searchPlaceholder="Search by payment ID, customer, transaction..."
        searchValue={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        filters={[
          { label: "Status", key: "status", options: [{ label: "Completed", value: "COMPLETED" }, { label: "Pending", value: "PENDING" }, { label: "Failed", value: "FAILED" }, { label: "Refunded", value: "REFUNDED" }] },
          { label: "Method", key: "method", options: [{ label: "UPI", value: "UPI" }, { label: "Credit Card", value: "Credit Card" }, { label: "Debit Card", value: "Debit Card" }, { label: "Cash", value: "Cash" }, { label: "Wallet", value: "Wallet" }] },
        ]}
        activeFilters={filters}
        onFilterChange={(k, v) => { setFilters((p) => ({ ...p, [k]: v })); setPage(1); }}
      />

      <DataTable columns={columns} data={paginated} keyExtractor={(p) => p.id} onRowClick={(p) => setDetailPayment(p)} />
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} itemsPerPage={ITEMS_PER_PAGE} />

      <Modal open={!!detailPayment} onOpenChange={() => setDetailPayment(null)} title={`Payment ${detailPayment?.id}`} subtitle="Transaction Details" size="sm">
        {detailPayment && (
          <div className="space-y-3">
            {[
              { label: "Customer", value: detailPayment.customerName },
              { label: "Restaurant", value: detailPayment.restaurantName },
              { label: "Order ID", value: detailPayment.orderId },
              { label: "Amount", value: formatCurrency(detailPayment.amount) },
              { label: "Method", value: detailPayment.paymentMethod },
              { label: "Transaction ID", value: detailPayment.transactionId },
              { label: "Date", value: new Date(detailPayment.date).toLocaleString("en-IN") },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <span className="text-sm font-medium">{item.value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Status</span>
              <StatusBadge status={detailPayment.status} />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { cn, formatCurrency } from "@/lib/utils";
import { Users, Plus, Eye, Pencil, Trash2, Award, ShoppingBag, CalendarCheck, IndianRupee } from "lucide-react";
import { useDataStore } from "@/stores/dataStore";
import { type MockCustomer } from "@/lib/mockData";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { SearchFilter } from "@/components/shared/SearchFilter";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Pagination } from "@/components/shared/Pagination";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 6;

export default function CustomersPage() {
  const navigate = useNavigate();
  const { customers, deleteCustomer } = useDataStore();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<MockCustomer | null>(null);

  const filtered = useMemo(() => {
    let data = [...customers];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter((c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q));
    }
    if (filters.status && filters.status !== "all") data = data.filter((c) => c.status === filters.status);
    return data;
  }, [search, filters, customers]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const totalSpent = useMemo(() => customers.reduce((s, c) => s + c.totalSpent, 0), [customers]);
  const totalLoyalty = useMemo(() => customers.reduce((s, c) => s + c.loyaltyPoints, 0), [customers]);

  const columns = [
    {
      key: "name",
      label: "Customer",
      render: (c: MockCustomer) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold shrink-0">{c.avatar}</div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{c.name}</p>
            <p className="text-[11px] text-muted-foreground truncate">{c.email}</p>
          </div>
        </div>
      ),
    },
    { key: "phone", label: "Phone", render: (c: MockCustomer) => <span className="text-xs">{c.phone}</span> },
    { key: "totalOrders", label: "Orders", render: (c: MockCustomer) => <span className="text-sm font-semibold">{c.totalOrders}</span> },
    { key: "reservations", label: "Reservations", render: (c: MockCustomer) => <span className="text-sm">{c.reservations}</span> },
    { key: "totalSpent", label: "Total Spent", render: (c: MockCustomer) => <span className="text-sm font-semibold">{formatCurrency(c.totalSpent)}</span> },
    {
      key: "loyaltyPoints",
      label: "Loyalty Points",
      render: (c: MockCustomer) => (
        <div className="flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">{c.loyaltyPoints.toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: "lastVisit",
      label: "Last Visit",
      render: (c: MockCustomer) => <span className="text-xs text-muted-foreground">{new Date(c.lastVisit).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>,
    },
    { key: "status", label: "Status", render: (c: MockCustomer) => <StatusBadge status={c.status} /> },
    {
      key: "actions",
      label: "Actions",
      render: (c: MockCustomer) => (
        <div className="flex items-center gap-1">
          <button onClick={(e) => { e.stopPropagation(); navigate(`/customers/${c.id}`); }} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors" title="View Profile"><Eye className="w-4 h-4 text-muted-foreground" /></button>
          <button onClick={(e) => { e.stopPropagation(); toast.success(`Editing ${c.name}`); }} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors" title="Edit"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
          <button onClick={(e) => { e.stopPropagation(); setDeleteTarget(c); }} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-500/10 transition-colors" title="Delete"><Trash2 className="w-4 h-4 text-red-500/70" /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Customers" subtitle="Manage your customer base and loyalty program" icon={Users} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Customers" value={String(customers.length)} icon={Users} gradient="gradient-primary" glowClass="card-glow-purple" delay={1} change={8.5} changeLabel="vs last month" />
        <StatCard title="Active Customers" value={String(customers.filter((c) => c.status === "ACTIVE").length)} icon={Users} gradient="gradient-accent" glowClass="card-glow-emerald" delay={2} />
        <StatCard title="Total Revenue" value={formatCurrency(totalSpent)} icon={IndianRupee} gradient="gradient-warm" glowClass="card-glow-orange" delay={3} />
        <StatCard title="Loyalty Points" value={totalLoyalty.toLocaleString()} icon={Award} gradient="gradient-cool" glowClass="card-glow-blue" delay={4} />
      </div>

      <SearchFilter
        searchPlaceholder="Search customers by name, email, phone..."
        searchValue={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        filters={[{ label: "Status", key: "status", options: [{ label: "Active", value: "ACTIVE" }, { label: "Inactive", value: "INACTIVE" }] }]}
        activeFilters={filters}
        onFilterChange={(k, v) => { setFilters((p) => ({ ...p, [k]: v })); setPage(1); }}
      />

      <DataTable columns={columns} data={paginated} keyExtractor={(c) => c.id} onRowClick={(c) => navigate(`/customers/${c.id}`)} />
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} itemsPerPage={ITEMS_PER_PAGE} />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        title="Delete Customer?"
        description={`Are you sure you want to delete "${deleteTarget?.name}"? This will remove all their data.`}
        onConfirm={() => {
          if (deleteTarget) {
            deleteCustomer(deleteTarget.id);
            toast.success(`${deleteTarget.name} deleted`);
            setDeleteTarget(null);
          }
        }}
      />
    </div>
  );
}

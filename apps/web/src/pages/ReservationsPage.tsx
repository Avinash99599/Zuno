import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { CalendarCheck, Users as UsersIcon, Clock, CheckCircle, XCircle, AlertCircle, Phone, MessageSquare } from "lucide-react";
import { type MockReservation } from "@/lib/mockData";
import { useDataStore } from "@/stores/dataStore";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { SearchFilter } from "@/components/shared/SearchFilter";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Pagination } from "@/components/shared/Pagination";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Modal } from "@/components/shared/Modal";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 6;

export default function ReservationsPage() {
  const { reservations, confirmReservation, cancelReservation } = useDataStore();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [view, setView] = useState<"list" | "calendar">("list");
  const [cancelTarget, setCancelTarget] = useState<MockReservation | null>(null);
  const [detailTarget, setDetailTarget] = useState<MockReservation | null>(null);

  const filtered = useMemo(() => {
    let data = [...reservations];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (r) => r.customerName.toLowerCase().includes(q) || r.restaurantName.toLowerCase().includes(q) || r.id.toLowerCase().includes(q)
      );
    }
    if (filters.status && filters.status !== "all") data = data.filter((r) => r.status === filters.status);
    if (filters.restaurant && filters.restaurant !== "all") data = data.filter((r) => r.restaurantName.toLowerCase().includes(filters.restaurant.toLowerCase()));
    return data;
  }, [search, filters, reservations]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const stats = useMemo(() => {
    return {
      total: reservations.length,
      confirmed: reservations.filter((r) => r.status === "CONFIRMED").length,
      pending: reservations.filter((r) => r.status === "PENDING").length,
      cancelled: reservations.filter((r) => r.status === "CANCELLED" || r.status === "NO_SHOW").length,
    };
  }, [reservations]);

  const columns = [
    { key: "id", label: "ID", render: (r: MockReservation) => <span className="text-xs font-mono font-semibold text-primary">{r.id}</span> },
    {
      key: "customer",
      label: "Customer",
      render: (r: MockReservation) => (
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">{r.customerName}</p>
          <p className="text-[11px] text-muted-foreground flex items-center gap-1"><Phone className="w-3 h-3" />{r.contactNumber}</p>
        </div>
      ),
    },
    { key: "restaurant", label: "Restaurant", render: (r: MockReservation) => <span className="text-sm">{r.restaurantName}</span> },
    {
      key: "dateTime",
      label: "Date & Time",
      render: (r: MockReservation) => (
        <div>
          <p className="text-sm font-medium">{new Date(r.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
          <p className="text-[11px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{r.time}</p>
        </div>
      ),
    },
    {
      key: "guests",
      label: "Guests",
      render: (r: MockReservation) => (
        <div className="flex items-center gap-1.5">
          <UsersIcon className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-sm font-semibold">{r.guests}</span>
        </div>
      ),
    },
    {
      key: "table",
      label: "Table",
      render: (r: MockReservation) => (
        <span className={cn("text-xs font-mono font-semibold", r.tableNumber === "—" ? "text-muted-foreground" : "text-foreground")}>
          {r.tableNumber}
        </span>
      ),
    },
    { key: "status", label: "Status", render: (r: MockReservation) => <StatusBadge status={r.status} /> },
    {
      key: "specialRequests",
      label: "Requests",
      render: (r: MockReservation) => r.specialRequests ? (
        <div className="max-w-[150px]">
          <p className="text-xs text-muted-foreground truncate flex items-center gap-1"><MessageSquare className="w-3 h-3 shrink-0" />{r.specialRequests}</p>
        </div>
      ) : <span className="text-xs text-muted-foreground">—</span>,
    },
    {
      key: "actions",
      label: "Actions",
      render: (r: MockReservation) => (
        <div className="flex items-center gap-1">
          {r.status === "PENDING" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                confirmReservation(r.id);
                toast.success(`${r.id} confirmed`);
              }}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-emerald-500/10 transition-colors"
              title="Confirm"
            >
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            </button>
          )}
          {(r.status === "PENDING" || r.status === "CONFIRMED") && (
            <button onClick={(e) => { e.stopPropagation(); setCancelTarget(r); }} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-500/10 transition-colors" title="Cancel">
              <XCircle className="w-4 h-4 text-red-500/70" />
            </button>
          )}
        </div>
      ),
    },
  ];

  // Calendar view - group by date
  const reservationsByDate = useMemo(() => {
    const map = new Map<string, MockReservation[]>();
    filtered.forEach((r) => {
      const existing = map.get(r.date) || [];
      existing.push(r);
      map.set(r.date, existing);
    });
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reservations"
        subtitle="Manage table reservations across all restaurants"
        icon={CalendarCheck}
        actions={
          <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/50 border border-border/50">
            {(["list", "calendar"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                  view === v ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {v === "list" ? "List View" : "Calendar View"}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Reservations" value={String(stats.total)} icon={CalendarCheck} gradient="gradient-primary" glowClass="card-glow-purple" delay={1} />
        <StatCard title="Confirmed" value={String(stats.confirmed)} icon={CheckCircle} gradient="gradient-accent" glowClass="card-glow-emerald" delay={2} />
        <StatCard title="Pending" value={String(stats.pending)} icon={AlertCircle} gradient="gradient-warm" glowClass="card-glow-orange" delay={3} />
        <StatCard title="Cancelled / No Show" value={String(stats.cancelled)} icon={XCircle} gradient="gradient-cool" glowClass="card-glow-blue" delay={4} />
      </div>

      <SearchFilter
        searchPlaceholder="Search by reservation ID, customer, restaurant..."
        searchValue={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        filters={[
          { label: "Status", key: "status", options: [{ label: "Confirmed", value: "CONFIRMED" }, { label: "Pending", value: "PENDING" }, { label: "Completed", value: "COMPLETED" }, { label: "Cancelled", value: "CANCELLED" }, { label: "No Show", value: "NO_SHOW" }] },
          { label: "Restaurant", key: "restaurant", options: [{ label: "The Golden Spoon", value: "golden spoon" }, { label: "Bistro 42", value: "bistro" }, { label: "Spice Garden", value: "spice" }, { label: "Dragon Wok", value: "dragon" }] },
        ]}
        activeFilters={filters}
        onFilterChange={(k, v) => { setFilters((p) => ({ ...p, [k]: v })); setPage(1); }}
      />

      {view === "list" ? (
        <>
          <DataTable columns={columns} data={paginated} keyExtractor={(r) => r.id} onRowClick={(r) => setDetailTarget(r)} />
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} itemsPerPage={ITEMS_PER_PAGE} />
        </>
      ) : (
        <div className="space-y-4 animate-fade-in">
          {reservationsByDate.map(([date, reservations]) => (
            <div key={date} className="glass-card rounded-2xl border border-border/50 overflow-hidden">
              <div className="px-5 py-3 bg-muted/30 border-b border-border/50">
                <h3 className="text-sm font-semibold">{new Date(date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</h3>
              </div>
              <div className="divide-y divide-border/30">
                {reservations.map((r) => (
                  <div key={r.id} className="flex items-center gap-4 px-5 py-3 hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => setDetailTarget(r)}>
                    <div className="w-14 text-center shrink-0">
                      <p className="text-sm font-bold">{r.time}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{r.customerName}</p>
                      <p className="text-xs text-muted-foreground">{r.restaurantName} • {r.guests} guests • {r.tableNumber}</p>
                    </div>
                    <StatusBadge status={r.status} />
                  </div>
                ))}
              </div>
            </div>
          ))}
          {reservationsByDate.length === 0 && (
            <div className="flex flex-col items-center py-16">
              <CalendarCheck className="w-12 h-12 text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground">No reservations found</p>
            </div>
          )}
        </div>
      )}

      {/* Cancel Dialog */}
      <ConfirmDialog
        open={!!cancelTarget}
        onOpenChange={() => setCancelTarget(null)}
        title="Cancel Reservation?"
        description={`Cancel reservation ${cancelTarget?.id} for ${cancelTarget?.customerName}?`}
        confirmLabel="Cancel Reservation"
        variant="warning"
        onConfirm={() => {
          if (cancelTarget) {
            cancelReservation(cancelTarget.id);
            toast.success(`${cancelTarget.id} cancelled`);
            setCancelTarget(null);
          }
        }}
      />

      {/* Detail Modal */}
      <Modal open={!!detailTarget} onOpenChange={() => setDetailTarget(null)} title={`Reservation ${detailTarget?.id}`} subtitle={`${detailTarget?.customerName} — ${detailTarget?.restaurantName}`} size="md">
        {detailTarget && (
          <div className="space-y-4">
            {[
              { label: "Customer", value: detailTarget.customerName },
              { label: "Restaurant", value: detailTarget.restaurantName },
              { label: "Date", value: new Date(detailTarget.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) },
              { label: "Time", value: detailTarget.time },
              { label: "Guests", value: String(detailTarget.guests) },
              { label: "Table", value: detailTarget.tableNumber },
              { label: "Contact", value: detailTarget.contactNumber },
              { label: "Special Requests", value: detailTarget.specialRequests || "None" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <span className="text-sm font-medium text-right max-w-[60%]">{item.value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Status</span>
              <StatusBadge status={detailTarget.status} />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

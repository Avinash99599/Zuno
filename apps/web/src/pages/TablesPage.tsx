import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Grid3X3, Plus, Users, CheckCircle, Clock, Sparkles, Pencil } from "lucide-react";
import { mockTables, type MockTable } from "@/lib/mockData";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { SearchFilter } from "@/components/shared/SearchFilter";
import { Modal } from "@/components/shared/Modal";
import toast from "react-hot-toast";

import { useDataStore } from "@/stores/dataStore";

const statusConfig: Record<string, { color: string; bg: string; icon: typeof CheckCircle; label: string }> = {
  AVAILABLE: { color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/30", icon: CheckCircle, label: "Available" },
  RESERVED: { color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/30", icon: Clock, label: "Reserved" },
  OCCUPIED: { color: "text-amber-500", bg: "bg-amber-500/10 border-amber-500/30", icon: Users, label: "Occupied" },
  CLEANING: { color: "text-gray-500", bg: "bg-gray-500/10 border-gray-500/30", icon: Sparkles, label: "Cleaning" },
};

export default function TablesPage() {
  const { tables, addTable, updateTable, updateTableStatus, deleteTable } = useDataStore();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [showAdd, setShowAdd] = useState(false);
  const [editTarget, setEditTarget] = useState<MockTable | null>(null);

  const filtered = useMemo(() => {
    let data = [...tables];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter((t) => t.tableNumber.toLowerCase().includes(q) || t.restaurantName.toLowerCase().includes(q) || t.assignedWaiter.toLowerCase().includes(q));
    }
    if (filters.status && filters.status !== "all") data = data.filter((t) => t.status === filters.status);
    if (filters.restaurant && filters.restaurant !== "all") data = data.filter((t) => t.restaurantName.toLowerCase().includes(filters.restaurant.toLowerCase()));
    return data;
  }, [search, filters, tables]);

  const stats = useMemo(() => {
    return {
      total: tables.length,
      occupied: tables.filter((t) => t.status === "OCCUPIED").length,
      available: tables.filter((t) => t.status === "AVAILABLE").length,
      reserved: tables.filter((t) => t.status === "RESERVED").length,
    };
  }, [tables]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tables"
        subtitle="Manage restaurant table layouts and assignments"
        icon={Grid3X3}
        actions={
          <button onClick={() => setShowAdd(true)} className={cn("flex items-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold text-white", "gradient-primary hover:opacity-90 active:scale-[0.98]", "transition-all duration-200 shadow-md shadow-black/10")}>
            <Plus className="w-4 h-4" />
            Add Table
          </button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Tables" value={String(stats.total)} icon={Grid3X3} gradient="gradient-primary" glowClass="card-glow-purple" delay={1} />
        <StatCard title="Occupied" value={String(stats.occupied)} icon={Users} gradient="gradient-warm" glowClass="card-glow-orange" delay={2} />
        <StatCard title="Available" value={String(stats.available)} icon={CheckCircle} gradient="gradient-accent" glowClass="card-glow-emerald" delay={3} />
        <StatCard title="Reserved" value={String(stats.reserved)} icon={Clock} gradient="gradient-cool" glowClass="card-glow-blue" delay={4} />
      </div>

      <SearchFilter
        searchPlaceholder="Search tables, restaurants, waiters..."
        searchValue={search}
        onSearchChange={setSearch}
        filters={[
          { label: "Status", key: "status", options: [{ label: "Available", value: "AVAILABLE" }, { label: "Occupied", value: "OCCUPIED" }, { label: "Reserved", value: "RESERVED" }, { label: "Cleaning", value: "CLEANING" }] },
          { label: "Restaurant", key: "restaurant", options: [{ label: "The Golden Spoon", value: "golden spoon" }, { label: "Bistro 42", value: "bistro" }, { label: "Spice Garden", value: "spice" }] },
        ]}
        activeFilters={filters}
        onFilterChange={(k, v) => setFilters((p) => ({ ...p, [k]: v }))}
      />

      {/* Table Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map((table, i) => {
          const config = statusConfig[table.status];
          const StatusIcon = config.icon;

          return (
            <div
              key={table.id}
              className={cn(
                "rounded-2xl p-4 border-2 relative group cursor-pointer",
                "hover:-translate-y-1 transition-all duration-300",
                "animate-fade-in opacity-0",
                config.bg
              )}
              style={{ animationDelay: `${i * 0.04}s`, animationFillMode: "forwards" }}
              onClick={() => setEditTarget(table)}
            >
              {/* Status Icon */}
              <StatusIcon className={cn("w-5 h-5 absolute top-3 right-3", config.color)} />

              {/* Table Number */}
              <div className="text-center mb-3">
                <div className={cn("w-14 h-14 rounded-2xl mx-auto flex items-center justify-center text-xl font-bold", "bg-background/60 border border-border/50", config.color)}>
                  {table.tableNumber}
                </div>
              </div>

              {/* Details */}
              <div className="text-center space-y-1.5">
                <div className="flex items-center justify-center gap-1">
                  <Users className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs font-medium">{table.capacity} seats</span>
                </div>
                <p className="text-[10px] text-muted-foreground truncate">{table.restaurantName}</p>
                <p className={cn("text-[10px] font-semibold uppercase tracking-wider", config.color)}>{config.label}</p>
                {table.reservation && (
                  <p className="text-[10px] text-blue-500 font-mono">{table.reservation}</p>
                )}
                <p className="text-[10px] text-muted-foreground">🧑‍🍳 {table.assignedWaiter}</p>
              </div>

              {/* Quick Actions */}
              <div className="mt-3 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {table.status === "AVAILABLE" && (
                  <button onClick={(e) => { e.stopPropagation(); updateTableStatus(table.id, "RESERVED", `RES-${Math.floor(1000 + Math.random() * 9000)}`); toast.success(`${table.tableNumber} reserved`); }} className="px-2.5 py-1 rounded-lg bg-blue-500 text-white text-[10px] font-medium hover:opacity-90">Reserve</button>
                )}
                {table.status === "AVAILABLE" && (
                  <button onClick={(e) => { e.stopPropagation(); updateTableStatus(table.id, "OCCUPIED"); toast.success(`${table.tableNumber} occupied`); }} className="px-2.5 py-1 rounded-lg bg-amber-500 text-white text-[10px] font-medium hover:opacity-90">Occupy</button>
                )}
                {(table.status === "OCCUPIED" || table.status === "CLEANING" || table.status === "RESERVED") && (
                  <button onClick={(e) => { e.stopPropagation(); updateTableStatus(table.id, "AVAILABLE"); toast.success(`${table.tableNumber} freed`); }} className="px-2.5 py-1 rounded-lg bg-emerald-500 text-white text-[10px] font-medium hover:opacity-90">Free</button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center py-16 animate-fade-in">
          <Grid3X3 className="w-12 h-12 text-muted-foreground/30 mb-3" />
          <p className="text-sm text-muted-foreground">No tables found</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal open={showAdd || !!editTarget} onOpenChange={() => { setShowAdd(false); setEditTarget(null); }} title={editTarget ? `Edit ${editTarget.tableNumber}` : "Add Table"} size="sm">
        <form onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const tableNumber = fd.get("tableNumber") as string;
          const capacity = parseInt(fd.get("capacity") as string) || 4;
          const status = fd.get("status") as any;

          if (editTarget) {
            updateTable(editTarget.id, { tableNumber, capacity, status });
            toast.success("Table updated");
          } else {
            addTable({
              tableNumber,
              capacity,
              restaurantId: "rest-001",
              restaurantName: "The Golden Spoon",
              assignedWaiter: "Rahul Sharma",
            });
            toast.success("Table added");
          }
          setShowAdd(false);
          setEditTarget(null);
        }} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Table Number</label>
            <input name="tableNumber" type="text" defaultValue={editTarget?.tableNumber} placeholder="T-XX" className={cn("w-full h-10 px-3.5 rounded-xl text-sm bg-muted/50 border border-border/50 placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30 transition-all duration-200")} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Capacity</label>
            <input name="capacity" type="number" defaultValue={editTarget?.capacity} placeholder="4" className={cn("w-full h-10 px-3.5 rounded-xl text-sm bg-muted/50 border border-border/50 placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30 transition-all duration-200")} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</label>
            <select name="status" defaultValue={editTarget?.status || "AVAILABLE"} className={cn("w-full h-10 px-3.5 rounded-xl text-sm bg-muted/50 border border-border/50 focus:outline-none focus:border-primary/30 transition-all duration-200 cursor-pointer")}>
              <option value="AVAILABLE">Available</option>
              <option value="RESERVED">Reserved</option>
              <option value="OCCUPIED">Occupied</option>
              <option value="CLEANING">Cleaning</option>
            </select>
          </div>
          <div className="flex justify-end pt-4 border-t border-border/50">
            <button type="submit" className="h-10 px-6 rounded-xl text-sm font-semibold text-white gradient-primary hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-md shadow-black/10">
              {editTarget ? "Save" : "Add Table"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

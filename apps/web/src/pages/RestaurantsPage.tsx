import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { cn, formatCurrency } from "@/lib/utils";
import { Store, Plus, Eye, Pencil, Trash2, Star, MapPin } from "lucide-react";
import { type MockRestaurant } from "@/lib/mockData";
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

const ITEMS_PER_PAGE = 5;

export default function RestaurantsPage() {
  const navigate = useNavigate();
  const { restaurants, addRestaurant, updateRestaurant, deleteRestaurant } = useDataStore();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<MockRestaurant | null>(null);
  const [editTarget, setEditTarget] = useState<MockRestaurant | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = useMemo(() => {
    let data = [...restaurants];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.owner.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.cuisine.some((c) => c.toLowerCase().includes(q))
      );
    }
    if (filters.status && filters.status !== "all") {
      data = data.filter((r) => r.status === filters.status);
    }
    if (filters.cuisine && filters.cuisine !== "all") {
      data = data.filter((r) => r.cuisine.some((c) => c.toLowerCase().includes(filters.cuisine.toLowerCase())));
    }
    return data;
  }, [search, filters, restaurants]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const stats = useMemo(() => {
    const active = restaurants.filter((r) => r.status === "OPEN").length;
    const pending = restaurants.filter((r) => r.status === "PENDING").length;
    const ratedRests = restaurants.filter((r) => r.rating > 0);
    const avgRating = ratedRests.length
      ? (ratedRests.reduce((s, r) => s + r.rating, 0) / ratedRests.length).toFixed(1)
      : "0.0";
    return {
      total: restaurants.length,
      active,
      pending,
      avgRating,
    };
  }, [restaurants]);

  const columns = [
    {
      key: "name",
      label: "Restaurant",
      render: (r: MockRestaurant) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-muted/60 flex items-center justify-center text-lg shrink-0 overflow-hidden">
            {r.logo && (r.logo.startsWith("http") || r.logo.startsWith("/")) ? (
              <img src={r.logo} alt={r.name} className="w-full h-full object-cover" />
            ) : (
              r.logo || "🍽️"
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{r.name}</p>
            <p className="text-[11px] text-muted-foreground truncate">{r.cuisine.join(", ")}</p>
          </div>
        </div>
      ),
    },
    {
      key: "owner",
      label: "Owner",
      render: (r: MockRestaurant) => <span className="text-sm">{r.owner}</span>,
    },
    {
      key: "contact",
      label: "Contact",
      render: (r: MockRestaurant) => (
        <div className="min-w-0">
          <p className="text-xs truncate">{r.email}</p>
          <p className="text-[11px] text-muted-foreground">{r.phone}</p>
        </div>
      ),
    },
    {
      key: "address",
      label: "Address",
      render: (r: MockRestaurant) => (
        <div className="flex items-center gap-1.5 max-w-[180px]">
          <MapPin className="w-3 h-3 text-muted-foreground shrink-0" />
          <span className="text-xs text-muted-foreground truncate">{r.address}</span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (r: MockRestaurant) => <StatusBadge status={r.status} pulse={r.status === "OPEN"} />,
    },
    {
      key: "rating",
      label: "Rating",
      render: (r: MockRestaurant) =>
        r.rating > 0 ? (
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-sm font-semibold">{r.rating}</span>
          </div>
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        ),
    },
    {
      key: "tables",
      label: "Tables",
      render: (r: MockRestaurant) => <span className="text-sm font-medium">{r.totalTables}</span>,
    },
    {
      key: "todaysOrders",
      label: "Today's Orders",
      render: (r: MockRestaurant) => (
        <span className={cn("text-sm font-semibold", r.todaysOrders > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground")}>
          {r.todaysOrders}
        </span>
      ),
    },
    {
      key: "revenue",
      label: "Revenue",
      render: (r: MockRestaurant) => (
        <span className="text-sm font-semibold">{r.revenue > 0 ? formatCurrency(r.revenue) : "—"}</span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (r: MockRestaurant) => (
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/restaurants/${r.id}`); }}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
            title="View"
          >
            <Eye className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setEditTarget(r); }}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
            title="Edit"
          >
            <Pencil className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setDeleteTarget(r); }}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-500/10 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4 text-red-500/70" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Restaurants"
        subtitle="Manage all registered restaurants on the platform"
        icon={Store}
        actions={
          <button
            onClick={() => setShowAdd(true)}
            className={cn(
              "flex items-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold text-white",
              "gradient-primary hover:opacity-90 active:scale-[0.98]",
              "transition-all duration-200 shadow-md shadow-black/10"
            )}
          >
            <Plus className="w-4 h-4" />
            Add Restaurant
          </button>
        }
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Restaurants" value={String(stats.total)} icon={Store} gradient="gradient-primary" glowClass="card-glow-purple" delay={1} />
        <StatCard title="Active / Open" value={String(stats.active)} icon={Store} gradient="gradient-accent" glowClass="card-glow-emerald" delay={2} change={12} changeLabel="vs last month" />
        <StatCard title="Pending Approval" value={String(stats.pending)} icon={Store} gradient="gradient-warm" glowClass="card-glow-orange" delay={3} />
        <StatCard title="Avg Rating" value={stats.avgRating} icon={Star} gradient="gradient-cool" glowClass="card-glow-blue" delay={4} />
      </div>

      {/* Search & Filter */}
      <SearchFilter
        searchPlaceholder="Search restaurants, owners, cuisine..."
        searchValue={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        filters={[
          { label: "Status", key: "status", options: [{ label: "Open", value: "OPEN" }, { label: "Closed", value: "CLOSED" }, { label: "Pending", value: "PENDING" }] },
          { label: "Cuisine", key: "cuisine", options: [{ label: "North Indian", value: "north indian" }, { label: "South Indian", value: "south indian" }, { label: "Continental", value: "continental" }, { label: "Chinese", value: "chinese" }, { label: "Italian", value: "italian" }] },
        ]}
        activeFilters={filters}
        onFilterChange={(key, val) => { setFilters((p) => ({ ...p, [key]: val })); setPage(1); }}
      />

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={paginated}
        keyExtractor={(r) => r.id}
        onRowClick={(r) => navigate(`/restaurants/${r.id}`)}
      />

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} itemsPerPage={ITEMS_PER_PAGE} />

      {/* Delete Dialog */}
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        title="Delete Restaurant?"
        description={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        onConfirm={() => {
          if (deleteTarget) {
            deleteRestaurant(deleteTarget.id);
            toast.success(`${deleteTarget.name} deleted successfully`);
            setDeleteTarget(null);
          }
        }}
      />

      {/* Add/Edit Modal */}
      <Modal
        open={showAdd || !!editTarget}
        onOpenChange={() => { setShowAdd(false); setEditTarget(null); }}
        title={editTarget ? "Edit Restaurant" : "Add Restaurant"}
        subtitle={editTarget ? `Editing ${editTarget.name}` : "Register a new restaurant on the platform"}
        size="lg"
      >
        <RestaurantForm
          restaurant={editTarget}
          onSubmit={(name, values) => {
            if (editTarget) {
              updateRestaurant(editTarget.id, values);
              toast.success(`${name} updated successfully`);
            } else {
              addRestaurant({
                ...values,
                logo: "🍽️",
                status: "PENDING",
                rating: 0,
                totalTables: 10,
                staffCount: 5,
                menuCount: 0,
                openingHours: [
                  { day: "Mon-Sun", open: "11:00 AM", close: "11:00 PM" }
                ]
              });
              toast.success(`${name} added successfully`);
            }
            setShowAdd(false);
            setEditTarget(null);
          }}
        />
      </Modal>
    </div>
  );
}

// ─── Restaurant Form ───
function RestaurantForm({ restaurant, onSubmit }: { restaurant?: MockRestaurant | null; onSubmit: (name: string, values: any) => void }) {
  const [name, setName] = useState(restaurant?.name || "");
  const [owner, setOwner] = useState(restaurant?.owner || "");
  const [email, setEmail] = useState(restaurant?.email || "");
  const [phone, setPhone] = useState(restaurant?.phone || "");
  const [address, setAddress] = useState(restaurant?.address || "");
  const [cuisine, setCuisine] = useState(restaurant?.cuisine.join(", ") || "");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(name, {
          name,
          owner,
          email,
          phone,
          address,
          cuisine: cuisine.split(",").map((c) => c.trim()).filter(Boolean),
        });
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: "Restaurant Name", value: name, onChange: setName, placeholder: "e.g. The Golden Spoon" },
          { label: "Owner Name", value: owner, onChange: setOwner, placeholder: "e.g. Rajesh Kumar" },
          { label: "Email", value: email, onChange: setEmail, placeholder: "owner@restaurant.com" },
          { label: "Phone", value: phone, onChange: setPhone, placeholder: "+91 98765 43210" },
          { label: "Address", value: address, onChange: setAddress, placeholder: "Full address" },
          { label: "Cuisine (comma separated)", value: cuisine, onChange: setCuisine, placeholder: "North Indian, Mughlai" },
        ].map((field) => (
          <div key={field.label} className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{field.label}</label>
            <input
              type="text"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              placeholder={field.placeholder}
              className={cn(
                "w-full h-10 px-3.5 rounded-xl text-sm",
                "bg-muted/50 border border-border/50",
                "placeholder:text-muted-foreground/40",
                "focus:outline-none focus:border-primary/30 focus:bg-background",
                "transition-all duration-200"
              )}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
        <button type="submit" className="h-10 px-6 rounded-xl text-sm font-semibold text-white gradient-primary hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-md shadow-black/10">
          {restaurant ? "Save Changes" : "Add Restaurant"}
        </button>
      </div>
    </form>
  );
}

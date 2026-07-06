import { useState, useMemo } from "react";
import { cn, formatCurrency } from "@/lib/utils";
import { UtensilsCrossed, Plus, Pencil, Trash2, Star, ShoppingBag, Leaf } from "lucide-react";
import { type MockMenuItem } from "@/lib/mockData";
import { useDataStore } from "@/stores/dataStore";
import { PageHeader } from "@/components/shared/PageHeader";
import { SearchFilter } from "@/components/shared/SearchFilter";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Pagination } from "@/components/shared/Pagination";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Modal } from "@/components/shared/Modal";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 8;
const categories = ["All", "Starters", "Main Course", "Biryani", "Pizza", "Burgers", "Desserts", "Drinks"] as const;

export default function MenusPage() {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useDataStore();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<MockMenuItem | null>(null);
  const [editTarget, setEditTarget] = useState<MockMenuItem | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = useMemo(() => {
    let data = [...menuItems];
    if (activeCategory !== "All") data = data.filter((m) => m.category === activeCategory);
    if (search) {
      const q = search.toLowerCase();
      data = data.filter((m) => m.name.toLowerCase().includes(q) || m.restaurantName.toLowerCase().includes(q));
    }
    if (filters.status && filters.status !== "all") data = data.filter((m) => m.status === filters.status);
    if (filters.restaurant && filters.restaurant !== "all") data = data.filter((m) => m.restaurantName.toLowerCase().includes(filters.restaurant.toLowerCase()));
    return data;
  }, [search, activeCategory, filters, menuItems]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Menus"
        subtitle="Manage food items across all restaurants"
        icon={UtensilsCrossed}
        actions={
          <button onClick={() => setShowAdd(true)} className={cn("flex items-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold text-white", "gradient-primary hover:opacity-90 active:scale-[0.98]", "transition-all duration-200 shadow-md shadow-black/10")}>
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        }
      />

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 animate-fade-in">
        {categories.map((cat) => {
          const count = cat === "All" ? menuItems.length : menuItems.filter((m) => m.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setPage(1); }}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap",
                "border transition-all duration-200",
                activeCategory === cat
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "bg-muted/30 border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {cat}
              <span className={cn("w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center", activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <SearchFilter
        searchPlaceholder="Search food items..."
        searchValue={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        filters={[
          { label: "Status", key: "status", options: [{ label: "Active", value: "ACTIVE" }, { label: "Inactive", value: "INACTIVE" }] },
          { label: "Restaurant", key: "restaurant", options: [{ label: "The Golden Spoon", value: "golden spoon" }, { label: "Bistro 42", value: "bistro" }, { label: "Spice Garden", value: "spice" }, { label: "Dragon Wok", value: "dragon" }, { label: "Pizza Paradise", value: "pizza" }] },
        ]}
        activeFilters={filters}
        onFilterChange={(k, v) => { setFilters((p) => ({ ...p, [k]: v })); setPage(1); }}
      />

      {/* Food Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {paginated.map((item, i) => (
          <div
            key={item.id}
            className={cn(
              "glass-card rounded-2xl border border-border/50 overflow-hidden group",
              "hover:-translate-y-1 transition-all duration-300",
              "animate-fade-in opacity-0"
            )}
            style={{ animationDelay: `${i * 0.05}s`, animationFillMode: "forwards" }}
          >
            {/* Image Header */}
            <div className="h-32 bg-muted/30 relative overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {item.discount > 0 && (
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-red-500 text-white text-[10px] font-bold">{item.discount}% OFF</span>
              )}
              {item.isVeg && (
                <span className="absolute top-2 left-2 w-5 h-5 rounded-md bg-emerald-500/20 flex items-center justify-center">
                  <Leaf className="w-3 h-3 text-emerald-500" />
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{item.name}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{item.restaurantName}</p>
                </div>
                <StatusBadge status={item.status} dot={false} className="shrink-0" />
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">{formatCurrency(item.price)}</span>
                  {item.discount > 0 && (
                    <span className="text-xs text-muted-foreground line-through">{formatCurrency(Math.round(item.price / (1 - item.discount / 100)))}</span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-semibold">{item.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ShoppingBag className="w-3 h-3" />
                  {item.orders} orders
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => setEditTarget(item)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"><Pencil className="w-3.5 h-3.5 text-muted-foreground" /></button>
                  <button onClick={() => setDeleteTarget(item)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-500/10 transition-colors"><Trash2 className="w-3.5 h-3.5 text-red-500/70" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {paginated.length === 0 && (
        <div className="flex flex-col items-center py-16 animate-fade-in">
          <UtensilsCrossed className="w-12 h-12 text-muted-foreground/30 mb-3" />
          <p className="text-sm text-muted-foreground">No menu items found</p>
        </div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} itemsPerPage={ITEMS_PER_PAGE} />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        title="Delete Menu Item?"
        description={`Remove "${deleteTarget?.name}" from ${deleteTarget?.restaurantName}?`}
        onConfirm={() => {
          if (deleteTarget) {
            deleteMenuItem(deleteTarget.id);
            toast.success(`${deleteTarget.name} deleted`);
            setDeleteTarget(null);
          }
        }}
      />

      <Modal open={showAdd || !!editTarget} onOpenChange={() => { setShowAdd(false); setEditTarget(null); }} title={editTarget ? "Edit Menu Item" : "Add Menu Item"} subtitle={editTarget ? `Editing ${editTarget.name}` : "Add a new food item"} size="md">
        <MenuForm
          item={editTarget}
          onSubmit={(name, values) => {
            if (editTarget) {
              updateMenuItem(editTarget.id, values);
              toast.success(`${name} updated`);
            } else {
              addMenuItem({
                ...values,
                image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80", // Default beautiful salad image
                restaurantId: "rest-001",
                restaurantName: "The Golden Spoon",
                discount: 0,
                isAvailable: true,
                isVeg: true,
                status: "ACTIVE",
              });
              toast.success(`${name} added`);
            }
            setShowAdd(false);
            setEditTarget(null);
          }}
        />
      </Modal>
    </div>
  );
}

function MenuForm({ item, onSubmit }: { item?: MockMenuItem | null; onSubmit: (name: string, values: any) => void }) {
  const [name, setName] = useState(item?.name || "");
  const [price, setPrice] = useState(item?.price?.toString() || "");
  const [category, setCategory] = useState(item?.category || "Main Course");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(name, {
          name,
          price: parseFloat(price) || 0,
          category,
        });
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Item Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Butter Chicken" className={cn("w-full h-10 px-3.5 rounded-xl text-sm bg-muted/50 border border-border/50 placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30 transition-all duration-200")} />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Price (₹)</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="420" className={cn("w-full h-10 px-3.5 rounded-xl text-sm bg-muted/50 border border-border/50 placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30 transition-all duration-200")} />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={cn("w-full h-10 px-3.5 rounded-xl text-sm bg-muted/50 border border-border/50 focus:outline-none focus:border-primary/30 transition-all duration-200 cursor-pointer")}>
            {categories.filter((c) => c !== "All").map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
        <button type="submit" className="h-10 px-6 rounded-xl text-sm font-semibold text-white gradient-primary hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-md shadow-black/10">
          {item ? "Save Changes" : "Add Item"}
        </button>
      </div>
    </form>
  );
}

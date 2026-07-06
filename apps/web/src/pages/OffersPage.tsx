import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Tag, Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Calendar, Hash, Percent } from "lucide-react";
import { mockOffers, type MockOffer } from "@/lib/mockData";
import { PageHeader } from "@/components/shared/PageHeader";
import { SearchFilter } from "@/components/shared/SearchFilter";
import { DataTable } from "@/components/shared/DataTable";
import { Pagination } from "@/components/shared/Pagination";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Modal } from "@/components/shared/Modal";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 6;

import { useDataStore } from "@/stores/dataStore";

export default function OffersPage() {
  const { offers, addOffer, updateOffer, toggleOfferActive, deleteOffer } = useDataStore();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<MockOffer | null>(null);
  const [editTarget, setEditTarget] = useState<MockOffer | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = useMemo(() => {
    let data = [...offers];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter((o) => o.name.toLowerCase().includes(q) || o.couponCode.toLowerCase().includes(q) || o.restaurantName.toLowerCase().includes(q));
    }
    if (filters.status && filters.status !== "all") {
      data = data.filter((o) => (filters.status === "active" ? o.isActive : !o.isActive));
    }
    return data;
  }, [search, filters, offers]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const stats = useMemo(() => {
    return {
      total: offers.length,
      active: offers.filter((o) => o.isActive).length,
      expired: offers.filter((o) => !o.isActive).length,
    };
  }, [offers]);

  const columns = [
    {
      key: "name",
      label: "Offer",
      render: (o: MockOffer) => (
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">{o.name}</p>
          <p className="text-[11px] text-muted-foreground truncate">{o.restaurantName}</p>
        </div>
      ),
    },
    {
      key: "couponCode",
      label: "Coupon Code",
      render: (o: MockOffer) => (
        <span className="inline-flex px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-mono font-bold tracking-wider">{o.couponCode}</span>
      ),
    },
    {
      key: "discount",
      label: "Discount",
      render: (o: MockOffer) => (
        <div className="flex items-center gap-1.5">
          <Percent className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-sm font-medium">{o.discount}</span>
        </div>
      ),
    },
    {
      key: "validity",
      label: "Validity",
      render: (o: MockOffer) => (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3 shrink-0" />
          <span>{new Date(o.validFrom).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} — {new Date(o.validUntil).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
        </div>
      ),
    },
    {
      key: "usage",
      label: "Usage",
      render: (o: MockOffer) => (
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-medium">{o.usedCount}/{o.usageLimit}</span>
            <span className="text-muted-foreground">{Math.round((o.usedCount / o.usageLimit) * 100)}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${Math.min((o.usedCount / o.usageLimit) * 100, 100)}%` }}
            />
          </div>
        </div>
      ),
    },
    {
      key: "isActive",
      label: "Status",
      render: (o: MockOffer) => (
        <span className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold",
          o.isActive ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" : "bg-gray-500/15 text-gray-700 dark:text-gray-400"
        )}>
          <span className={cn("w-1.5 h-1.5 rounded-full", o.isActive ? "bg-emerald-500" : "bg-gray-500")} />
          {o.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (o: MockOffer) => (
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); toggleOfferActive(o.id); toast.success(o.isActive ? "Offer deactivated" : "Offer activated"); }}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
            title={o.isActive ? "Deactivate" : "Activate"}
          >
            {o.isActive ? <ToggleRight className="w-4 h-4 text-emerald-500" /> : <ToggleLeft className="w-4 h-4 text-muted-foreground" />}
          </button>
          <button onClick={(e) => { e.stopPropagation(); setEditTarget(o); }} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors" title="Edit"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
          <button onClick={(e) => { e.stopPropagation(); setDeleteTarget(o); }} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-500/10 transition-colors" title="Delete"><Trash2 className="w-4 h-4 text-red-500/70" /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Offers & Coupons"
        subtitle="Create and manage promotional offers"
        icon={Tag}
        actions={
          <button onClick={() => setShowAdd(true)} className={cn("flex items-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold text-white", "gradient-primary hover:opacity-90 active:scale-[0.98]", "transition-all duration-200 shadow-md shadow-black/10")}>
            <Plus className="w-4 h-4" />
            Create Offer
          </button>
        }
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Offers", value: String(stats.total), color: "text-primary" },
          { label: "Active", value: String(stats.active), color: "text-emerald-500" },
          { label: "Expired", value: String(stats.expired), color: "text-muted-foreground" },
        ].map((stat, i) => (
          <div key={stat.label} className={cn("glass-card rounded-xl p-4 text-center border border-border/50 animate-fade-in opacity-0")} style={{ animationDelay: `${(i + 1) * 0.07}s`, animationFillMode: "forwards" }}>
            <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <SearchFilter
        searchPlaceholder="Search offers, coupon codes..."
        searchValue={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        filters={[{ label: "Status", key: "status", options: [{ label: "Active", value: "active" }, { label: "Inactive", value: "inactive" }] }]}
        activeFilters={filters}
        onFilterChange={(k, v) => { setFilters((p) => ({ ...p, [k]: v })); setPage(1); }}
      />

      <DataTable columns={columns} data={paginated} keyExtractor={(o) => o.id} />
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} itemsPerPage={ITEMS_PER_PAGE} />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        title="Delete Offer?"
        description={`Delete "${deleteTarget?.name}" (${deleteTarget?.couponCode})?`}
        onConfirm={() => {
          if (deleteTarget) {
            deleteOffer(deleteTarget.id);
            toast.success("Offer deleted");
            setDeleteTarget(null);
          }
        }}
      />

      <Modal open={showAdd || !!editTarget} onOpenChange={() => { setShowAdd(false); setEditTarget(null); }} title={editTarget ? "Edit Offer" : "Create Offer"} size="md">
        <form onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const name = fd.get("name") as string;
          const couponCode = fd.get("couponCode") as string;
          const discount = fd.get("discount") as string;
          const usageLimit = parseInt(fd.get("usageLimit") as string) || 100;

          if (editTarget) {
            updateOffer(editTarget.id, { name, couponCode, discount, usageLimit });
            toast.success("Offer updated");
          } else {
            addOffer({
              name,
              couponCode,
              discount,
              usageLimit,
              restaurantId: "rest-001",
              restaurantName: "The Golden Spoon",
              validFrom: new Date().toISOString().split("T")[0],
              validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
              isActive: true,
            });
            toast.success("Offer created");
          }
          setShowAdd(false);
          setEditTarget(null);
        }} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Offer Name", name: "name", defaultValue: editTarget?.name, placeholder: "Grand Opening Special" },
              { label: "Coupon Code", name: "couponCode", defaultValue: editTarget?.couponCode, placeholder: "WELCOME50" },
              { label: "Discount", name: "discount", defaultValue: editTarget?.discount, placeholder: "50% off" },
              { label: "Usage Limit", name: "usageLimit", defaultValue: editTarget?.usageLimit?.toString(), placeholder: "500" },
            ].map((f) => (
              <div key={f.label} className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{f.label}</label>
                <input name={f.name} type="text" defaultValue={f.defaultValue} placeholder={f.placeholder} className={cn("w-full h-10 px-3.5 rounded-xl text-sm bg-muted/50 border border-border/50 placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30 transition-all duration-200")} />
              </div>
            ))}
          </div>
          <div className="flex justify-end pt-4 border-t border-border/50">
            <button type="submit" className="h-10 px-6 rounded-xl text-sm font-semibold text-white gradient-primary hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-md shadow-black/10">
              {editTarget ? "Save" : "Create Offer"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

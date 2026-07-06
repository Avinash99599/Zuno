import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Star, MessageSquare, Eye, EyeOff, Trash2, Reply, Flag } from "lucide-react";
import { useDataStore } from "@/stores/dataStore";
import { PageHeader } from "@/components/shared/PageHeader";
import { SearchFilter } from "@/components/shared/SearchFilter";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Pagination } from "@/components/shared/Pagination";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Modal } from "@/components/shared/Modal";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 6;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={cn("w-3.5 h-3.5", i <= rating ? "text-amber-500 fill-amber-500" : "text-muted-foreground/30")} />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const { reviews, replyToReview, toggleReviewVisibility, deleteReview } = useDataStore();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [replyTargetId, setReplyTargetId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const replyTarget = useMemo(() => reviews.find((r) => r.id === replyTargetId) || null, [reviews, replyTargetId]);

  const filtered = useMemo(() => {
    let data = [...reviews];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter((r) => r.customerName.toLowerCase().includes(q) || r.restaurantName.toLowerCase().includes(q) || r.review.toLowerCase().includes(q) || r.foodItem.toLowerCase().includes(q));
    }
    if (filters.rating && filters.rating !== "all") data = data.filter((r) => r.rating === parseInt(filters.rating));
    if (filters.status && filters.status !== "all") data = data.filter((r) => r.status === filters.status);
    return data;
  }, [search, filters, reviews]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // Rating distribution
  const avgRating = useMemo(() => {
    if (reviews.length === 0) return "0.0";
    return (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  }, [reviews]);

  const ratingDist = useMemo(() => {
    return [5, 4, 3, 2, 1].map((r) => {
      const count = reviews.filter((rev) => rev.rating === r).length;
      const pct = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
      return { stars: r, count, pct };
    });
  }, [reviews]);

  const columns = [
    {
      key: "customer",
      label: "Customer",
      render: (r: any) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold shrink-0">{r.customerAvatar}</div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{r.customerName}</p>
          </div>
        </div>
      ),
    },
    { key: "restaurant", label: "Restaurant", render: (r: any) => <span className="text-sm">{r.restaurantName}</span> },
    { key: "foodItem", label: "Food Item", render: (r: any) => <span className="text-sm font-medium">{r.foodItem}</span> },
    { key: "rating", label: "Rating", render: (r: any) => <StarRating rating={r.rating} /> },
    {
      key: "review",
      label: "Review",
      render: (r: any) => (
        <div className="max-w-[240px]">
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{r.review}</p>
          {r.reply && (
            <p className="text-[10px] text-blue-500 dark:text-blue-400 mt-1 font-medium truncate flex items-center gap-1"><Reply className="w-2.5 h-2.5 shrink-0 rotate-180" />Replied</p>
          )}
        </div>
      ),
    },
    { key: "status", label: "Status", render: (r: any) => <StatusBadge status={r.status} /> },
    {
      key: "actions",
      label: "Actions",
      render: (r: any) => (
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setReplyTargetId(r.id);
              setReplyText(r.reply || "");
            }}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
            title="Reply"
          >
            <Reply className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleReviewVisibility(r.id);
              toast.success(r.status === "PUBLISHED" ? "Review hidden" : "Review published");
            }}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
            title={r.status === "PUBLISHED" ? "Hide" : "Publish"}
          >
            {r.status === "PUBLISHED" ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-emerald-500" />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDeleteTarget(r);
            }}
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
      <PageHeader title="Customer Reviews" subtitle="Monitor and reply to customer feedback" icon={MessageSquare} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-5 border border-border/50 flex items-center gap-6 animate-fade-in">
          <div className="text-center">
            <p className="text-4xl font-bold text-amber-500">{avgRating}</p>
            <StarRating rating={Math.round(parseFloat(avgRating))} />
            <p className="text-xs text-muted-foreground mt-1">{reviews.length} reviews</p>
          </div>
          <div className="flex-1 space-y-2">
            {ratingDist.map((d) => (
              <div key={d.stars} className="flex items-center gap-2">
                <span className="text-xs font-medium w-3">{d.stars}</span>
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-amber-500 transition-all duration-500" style={{ width: `${d.pct}%` }} />
                </div>
                <span className="text-[10px] text-muted-foreground w-8 text-right">{d.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-border/50 animate-fade-in" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-4"><MessageSquare className="w-4 h-4 text-primary" /> Review Stats</h3>
          <div className="space-y-3">
            {[
              { label: "Total Reviews", value: String(reviews.length), color: "text-foreground" },
              { label: "Published", value: String(reviews.filter((r) => r.status === "PUBLISHED").length), color: "text-emerald-500" },
              { label: "Flagged", value: String(reviews.filter((r) => r.status === "FLAGGED").length), color: "text-red-500" },
              { label: "With Replies", value: String(reviews.filter((r) => r.reply).length), color: "text-blue-500" },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{s.label}</span>
                <span className={cn("text-sm font-bold", s.color)}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-border/50 animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-4"><Star className="w-4 h-4 text-amber-500" /> Top Rated Items</h3>
          <div className="space-y-2.5">
            {[...new Set(reviews.filter((r) => r.rating >= 5).map((r) => r.foodItem))].slice(0, 5).map((item) => (
              <div key={item} className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
                <span className="text-sm font-medium">{item}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-bold">5.0</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SearchFilter
        searchPlaceholder="Search reviews, customers, restaurants..."
        searchValue={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        filters={[
          { label: "Rating", key: "rating", options: [{ label: "5 Stars", value: "5" }, { label: "4 Stars", value: "4" }, { label: "3 Stars", value: "3" }, { label: "2 Stars", value: "2" }, { label: "1 Star", value: "1" }] },
          { label: "Status", key: "status", options: [{ label: "Published", value: "PUBLISHED" }, { label: "Hidden", value: "HIDDEN" }, { label: "Flagged", value: "FLAGGED" }] },
        ]}
        activeFilters={filters}
        onFilterChange={(k, v) => { setFilters((p) => ({ ...p, [k]: v })); setPage(1); }}
      />

      <DataTable columns={columns} data={paginated} keyExtractor={(r) => r.id} onRowClick={(r) => { setReplyTargetId(r.id); setReplyText(r.reply || ""); }} />
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} itemsPerPage={ITEMS_PER_PAGE} />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        title="Delete Review?"
        description={`Delete ${deleteTarget?.customerName}'s review?`}
        onConfirm={() => {
          if (deleteTarget) {
            deleteReview(deleteTarget.id);
            toast.success("Review deleted");
            setDeleteTarget(null);
          }
        }}
      />

      <Modal open={!!replyTarget} onOpenChange={(open) => !open && setReplyTargetId(null)} title="Review Details" subtitle={`${replyTarget?.customerName} — ${replyTarget?.restaurantName}`} size="md">
        {replyTarget && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <StarRating rating={replyTarget.rating} />
              <StatusBadge status={replyTarget.status} />
              {replyTarget.status === "FLAGGED" && <Flag className="w-4 h-4 text-red-500" />}
            </div>

            <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
              <p className="text-sm font-medium mb-1">{replyTarget.foodItem}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{replyTarget.review}</p>
              <p className="text-xs text-muted-foreground/60 mt-2">{new Date(replyTarget.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Reply</label>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply to this review..."
                rows={3}
                className={cn("w-full mt-1.5 p-3.5 rounded-xl text-sm bg-muted/50 border border-border/50 placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30 transition-all duration-200 resize-none")}
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  replyToReview(replyTarget.id, replyText);
                  toast.success("Reply saved");
                  setReplyTargetId(null);
                }}
                className="h-10 px-6 rounded-xl text-sm font-semibold text-white gradient-primary hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-md shadow-black/10"
              >
                Save Reply
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

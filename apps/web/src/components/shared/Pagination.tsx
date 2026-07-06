import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers to show
  const getPages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className={cn("flex flex-col sm:flex-row items-center justify-between gap-3 pt-4", className)}>
      <p className="text-xs text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{startItem}</span> to{" "}
        <span className="font-semibold text-foreground">{endItem}</span> of{" "}
        <span className="font-semibold text-foreground">{totalItems}</span> results
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center text-sm",
            "border border-border/50 transition-all duration-200",
            currentPage === 1
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-muted hover:border-border"
          )}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {getPages().map((page, idx) =>
          page === "..." ? (
            <span key={`dots-${idx}`} className="w-8 h-8 flex items-center justify-center text-xs text-muted-foreground">
              ···
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium",
                "transition-all duration-200",
                page === currentPage
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "hover:bg-muted border border-transparent hover:border-border/50"
              )}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center text-sm",
            "border border-border/50 transition-all duration-200",
            currentPage === totalPages
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-muted hover:border-border"
          )}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

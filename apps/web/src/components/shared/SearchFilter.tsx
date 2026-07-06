import { cn } from "@/lib/utils";
import { Search, Filter, X } from "lucide-react";
import { useState } from "react";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterGroup {
  label: string;
  key: string;
  options: FilterOption[];
}

interface SearchFilterProps {
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filters?: FilterGroup[];
  activeFilters?: Record<string, string>;
  onFilterChange?: (key: string, value: string) => void;
  className?: string;
}

export function SearchFilter({
  searchPlaceholder = "Search...",
  searchValue,
  onSearchChange,
  filters = [],
  activeFilters = {},
  onFilterChange,
  className,
}: SearchFilterProps) {
  const [showFilters, setShowFilters] = useState(false);
  const activeCount = Object.values(activeFilters).filter((v) => v && v !== "all").length;

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className={cn(
              "w-full h-10 pl-9 pr-4 rounded-xl text-sm",
              "bg-muted/50 border border-border/50",
              "placeholder:text-muted-foreground/50",
              "focus:outline-none focus:border-primary/30 focus:bg-background",
              "transition-all duration-200"
            )}
          />
          {searchValue && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Toggle */}
        {filters.length > 0 && (
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "flex items-center gap-2 h-10 px-4 rounded-xl text-sm font-medium",
              "border border-border/50 transition-all duration-200",
              showFilters || activeCount > 0
                ? "bg-primary/10 border-primary/30 text-primary"
                : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
            {activeCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Filter Dropdowns */}
      {showFilters && filters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 animate-fade-in">
          {filters.map((filter) => (
            <select
              key={filter.key}
              value={activeFilters[filter.key] || "all"}
              onChange={(e) => onFilterChange?.(filter.key, e.target.value)}
              className={cn(
                "h-9 px-3 rounded-lg text-xs font-medium",
                "bg-muted/50 border border-border/50",
                "focus:outline-none focus:border-primary/30",
                "transition-all duration-200 cursor-pointer",
                "appearance-none"
              )}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23888' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
                paddingRight: "30px",
              }}
            >
              <option value="all">{filter.label}: All</option>
              {filter.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ))}
          {activeCount > 0 && (
            <button
              onClick={() => {
                filters.forEach((f) => onFilterChange?.(f.key, "all"));
              }}
              className="text-xs text-primary hover:underline font-medium"
            >
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  );
}

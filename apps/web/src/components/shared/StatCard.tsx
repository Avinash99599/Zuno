import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  gradient: string;
  glowClass?: string;
  delay?: number;
}

export function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  gradient,
  glowClass = "",
  delay = 0,
}: StatCardProps) {
  const isPositive = (change || 0) >= 0;

  return (
    <div
      className={cn(
        "glass-card rounded-2xl p-5 relative overflow-hidden group border border-border/50",
        "hover:-translate-y-1 transition-all duration-300 ease-out",
        glowClass,
        "animate-fade-in opacity-0"
      )}
      style={{ animationDelay: `${delay * 0.07}s`, animationFillMode: "forwards" }}
    >
      {/* Gradient accent */}
      <div
        className={cn(
          "absolute top-0 right-0 w-24 h-24 rounded-full opacity-15 blur-2xl",
          "group-hover:opacity-30 transition-opacity duration-500",
          gradient
        )}
      />

      <div className="flex items-start justify-between relative">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
          <p className="text-2xl font-bold mt-1.5 tracking-tight text-foreground">
            {value}
          </p>
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {isPositive ? (
                <TrendingUp className="w-3 h-3 text-emerald-500" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-500" />
              )}
              <span
                className={cn(
                  "text-xs font-bold",
                  isPositive ? "text-emerald-500" : "text-red-500"
                )}
              >
                {isPositive ? "+" : ""}
                {change}%
              </span>
              {changeLabel && (
                <span className="text-[10px] text-muted-foreground">
                  {changeLabel}
                </span>
              )}
            </div>
          )}
        </div>
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
            gradient,
            "shadow-md shadow-black/10"
          )}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
}

import { cn, getStatusColor } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
  dot?: boolean;
  pulse?: boolean;
}

export function StatusBadge({ status, className, dot = true, pulse = false }: StatusBadgeProps) {
  const displayText = status.replace(/_/g, " ");

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase",
        getStatusColor(status),
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full bg-current",
            pulse && "animate-pulse"
          )}
        />
      )}
      {displayText}
    </span>
  );
}

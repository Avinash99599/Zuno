import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, icon: Icon, actions, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in", className)}>
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2.5">
          {Icon && (
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-md shadow-black/10">
              <Icon className="w-5 h-5 text-white" />
            </div>
          )}
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}

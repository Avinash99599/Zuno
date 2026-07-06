import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function Modal({ open, onOpenChange, title, subtitle, children, size = "md" }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-fade-in" />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
            "w-[calc(100%-2rem)] rounded-2xl",
            "bg-card border border-border shadow-2xl shadow-black/20",
            "max-h-[85vh] overflow-y-auto",
            "animate-scale-in",
            sizeMap[size]
          )}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 pb-0">
            <div>
              <Dialog.Title className="text-lg font-bold tracking-tight">
                {title}
              </Dialog.Title>
              {subtitle && (
                <Dialog.Description className="text-sm text-muted-foreground mt-0.5">
                  {subtitle}
                </Dialog.Description>
              )}
            </div>
            <Dialog.Close
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center",
                "text-muted-foreground hover:text-foreground hover:bg-muted",
                "transition-all duration-200"
              )}
            >
              <X className="w-4 h-4" />
            </Dialog.Close>
          </div>

          {/* Content */}
          <div className="p-6">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

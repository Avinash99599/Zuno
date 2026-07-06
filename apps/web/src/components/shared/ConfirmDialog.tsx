import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning";
  onConfirm: () => void;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  variant = "danger",
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-fade-in" />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
            "w-[calc(100%-2rem)] max-w-sm rounded-2xl",
            "bg-card border border-border shadow-2xl shadow-black/20",
            "animate-scale-in p-6"
          )}
        >
          <div className="flex flex-col items-center text-center">
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center mb-4",
                variant === "danger" ? "bg-red-500/15" : "bg-amber-500/15"
              )}
            >
              <AlertTriangle
                className={cn(
                  "w-6 h-6",
                  variant === "danger" ? "text-red-500" : "text-amber-500"
                )}
              />
            </div>

            <Dialog.Title className="text-base font-bold">
              {title}
            </Dialog.Title>
            <Dialog.Description className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
              {description}
            </Dialog.Description>

            <div className="flex items-center gap-3 mt-6 w-full">
              <Dialog.Close
                className={cn(
                  "flex-1 h-10 rounded-xl text-sm font-medium",
                  "bg-muted hover:bg-muted/80 transition-colors"
                )}
              >
                {cancelLabel}
              </Dialog.Close>
              <button
                onClick={() => {
                  onConfirm();
                  onOpenChange(false);
                }}
                className={cn(
                  "flex-1 h-10 rounded-xl text-sm font-semibold text-white",
                  "transition-all duration-200 hover:opacity-90 active:scale-[0.98]",
                  variant === "danger"
                    ? "bg-red-500 shadow-md shadow-red-500/25"
                    : "bg-amber-500 shadow-md shadow-amber-500/25"
                )}
              >
                {confirmLabel}
              </button>
            </div>
          </div>

          <Dialog.Close
            className={cn(
              "absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center",
              "text-muted-foreground hover:text-foreground hover:bg-muted",
              "transition-all duration-200"
            )}
          >
            <X className="w-3.5 h-3.5" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

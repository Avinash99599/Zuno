import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { useSidebarStore } from "@/stores/sidebarStore";

export function AppLayout() {
  const { isCollapsed } = useSidebarStore();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          isCollapsed ? "ml-[72px]" : "ml-[260px]"
        )}
      >
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="pt-16">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

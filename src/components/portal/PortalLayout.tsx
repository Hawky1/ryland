import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import PortalSidebar from "./PortalSidebar";
import AuthGuard from "./AuthGuard";
import { useAuth } from "@/hooks/useAuth";

export default function PortalLayout() {
  const { affiliate } = useAuth();

  return (
    <AuthGuard>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <PortalSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            {/* Top bar */}
            <header className="h-14 flex items-center justify-between border-b border-border bg-background px-4 lg:px-6 shrink-0">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="text-muted-foreground" />
                <div className="h-5 w-px bg-border" />
                <span className="text-sm text-muted-foreground hidden sm:block">
                  Welcome back{affiliate ? `, ${affiliate.full_name.split(" ")[0]}` : ""}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                  {affiliate?.full_name?.charAt(0) ?? "P"}
                </div>
              </div>
            </header>

            {/* Page content */}
            <main className="flex-1 overflow-y-auto p-4 lg:p-8">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </AuthGuard>
  );
}

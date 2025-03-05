import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/sonner";

import { AppSidebar } from "@/components/root-layout/app-sidebar";
import { AppHeader } from "@/components/root-layout/app-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <div className="[--header-height:calc(theme(spacing.14))]">
        <SidebarProvider className="flex flex-col">
          <AppHeader />
          <div className="flex flex-1">
            <AppSidebar />
            <SidebarInset>
              <Outlet />
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
      <Toaster />
    </>
  );
}

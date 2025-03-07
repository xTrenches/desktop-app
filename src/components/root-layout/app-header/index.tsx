import { SidebarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SearchForm } from "@/components/root-layout/search-form";
import AppBreadcrumb from "./breadcrumb";

export function AppHeader() {
  const { toggleSidebar, state } = useSidebar();

  return (
    <header className="flex sticky top-0 z-50 w-full items-center border-b bg-background">
      <div className="flex h-[var(--header-height)] w-full items-center gap-2 px-4">
        <Button
          className={cn("h-8 w-8 transition-[margin] duration-200 ease-linear", {
            "-ml-[calc(theme(spacing.2)+1px)]": state === "collapsed",
          })}
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <AppBreadcrumb />
        <SearchForm className="w-full sm:ml-auto sm:w-auto" />
      </div>
    </header>
  );
}

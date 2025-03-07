import { Fragment } from "react";
import { useLocation, Link } from "@tanstack/react-router";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from "@/components/ui/breadcrumb";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export interface BreadcrumbItem {
  path: string;
  label: string;
}

function AppBreadcrumb() {
  const pathname = useLocation({ select: (l) => l.pathname });

  // Get current route path segments
  const segments = pathname.split("/").filter(Boolean);

  // Create breadcrumb items with proper links
  const breadcrumbItems = segments.map((segment: string, index: number) => {
    const path = `/${segments.slice(0, index + 1).join("/")}`;
    const label = segment
      .split("-")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return { path, label };
  });

  // Show ellipsis dropdown if more than 3 levels deep
  const visibleItems = breadcrumbItems.length > 3 ? [...breadcrumbItems.slice(0, 1), ...breadcrumbItems.slice(-2)] : breadcrumbItems;

  const hiddenItems = breadcrumbItems.length > 3 ? breadcrumbItems.slice(1, -2) : [];

  return (
    <Breadcrumb className="hidden sm:block">
      <BreadcrumbList>
        {visibleItems.map((item: BreadcrumbItem, index: number) => {
          const isLast = index === visibleItems.length - 1;
          return (
            <Fragment key={item.path}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={item.path}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <>
                  {index === 0 && hiddenItems.length > 0 && (
                    <BreadcrumbItem>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center">
                          <BreadcrumbEllipsis />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          {hiddenItems.map((hidden: BreadcrumbItem) => (
                            <DropdownMenuItem key={hidden.path} asChild>
                              <Link to={hidden.path}>{hidden.label}</Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </BreadcrumbItem>
                  )}
                  <BreadcrumbSeparator />
                </>
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default AppBreadcrumb;

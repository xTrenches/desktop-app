import { ChevronRight } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link, MatchRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: React.ElementType;
    isActive?: boolean;
    badge?: {
      text: string;
      variant?: "default" | "secondary" | "destructive" | "outline";
    };
    items?: {
      title: string;
      url: string;
      badge?: {
        text: string;
        variant?: "default" | "secondary" | "destructive" | "outline";
      };
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Sources</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <MatchRoute key={item.title} to={item.url}>
            {(_match) => (
              <Collapsible
                asChild
                // defaultOpen={!!match}
                defaultOpen
              >
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link to={item.url} activeOptions={{ exact: true }}>
                      <item.icon />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant={item.badge.variant} className="ml-auto">
                          {item.badge.text}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                          <ChevronRight />
                          <span className="sr-only">Toggle</span>
                        </SidebarMenuAction>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <Link to={subItem.url} activeOptions={{ exact: true }}>
                                {({ isActive }) => (
                                  <SidebarMenuSubButton isActive={isActive}>
                                    {subItem.title}
                                    {subItem.badge && (
                                      <Badge variant={subItem.badge.variant} className="ml-auto">
                                        {subItem.badge.text}
                                      </Badge>
                                    )}
                                  </SidebarMenuSubButton>
                                )}
                              </Link>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            )}
          </MatchRoute>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

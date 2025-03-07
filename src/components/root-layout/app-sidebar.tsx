import * as React from "react";
import { Command, Frame, LifeBuoy, Map, PieChart, Send } from "lucide-react";

import { NavMain } from "@/components/root-layout/nav-main";
import { NavProjects } from "@/components/root-layout/nav-projects";
import { NavSecondary } from "@/components/root-layout/nav-secondary";
import { NavUser } from "@/components/root-layout/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

import PumpDotFunIcon from "@/assets/svg/pump-dot-fun-logo.svg?react";
import MoonshotLogo from "@/assets/svg/moonshot-logo.svg?react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="top-[var(--header-height)] !h-[calc(100svh-var(--header-height))]" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={[
            {
              title: "Pump.fun",
              url: "/pump-dot-fun",
              icon: PumpDotFunIcon,
              isActive: true,
              items: [
                {
                  title: "Newly Created",
                  url: "/pump-dot-fun",
                },
                {
                  title: "Featured",
                  url: "/pump-dot-fun/featured",
                },
              ],
            },
            // {
            //   title: "Moonshot",
            //   url: "#",
            //   icon: MoonshotLogo,
            // },
          ]}
        />
        {/* <NavProjects
          projects={[
            {
              name: "Design Engineering",
              url: "#",
              icon: Frame,
            },
            {
              name: "Sales & Marketing",
              url: "#",
              icon: PieChart,
            },
            {
              name: "Travel",
              url: "#",
              icon: Map,
            },
          ]}
        /> */}
        <NavSecondary
          items={[
            {
              title: "Support",
              url: "#",
              icon: LifeBuoy,
            },
            {
              title: "Feedback",
              url: "#",
              icon: Send,
            },
          ]}
          className="mt-auto"
        />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser
          user={{
            name: "shadcn",
            email: "m@example.com",
            avatar: "/avatars/shadcn.jpg",
          }}
        />
      </SidebarFooter> */}
    </Sidebar>
  );
}

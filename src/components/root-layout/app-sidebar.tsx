import * as React from "react";
import { BotIcon, ChartLineIcon, Clock10Icon, LifeBuoy, Send } from "lucide-react";

import { NavMain } from "@/components/root-layout/nav-main";
import { NavProjects } from "@/components/root-layout/nav-projects";
import { NavSecondary } from "@/components/root-layout/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import PumpDotFunIcon from "@/assets/svg/pump-dot-fun-logo.svg?react";
import MoonshotLogo from "@/assets/svg/moonshot-logo.svg?react";
import SolanaLogo from "@/assets/svg/solana-logo.svg?react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      className="top-[var(--header-height)] !h-[calc(100svh-var(--header-height))]"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-neutral-800 text-sidebar-primary-foreground">
                  <SolanaLogo className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Main Account</span>
                  <span className="truncate text-xs">Solana</span>
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
                  title: "Newly Graduated",
                  url: "/pump-dot-fun/newly-graduated",
                },
                {
                  title: "Featured",
                  url: "/pump-dot-fun/featured",
                },
              ],
            },
            {
              title: "Moonshot",
              url: "#",
              icon: MoonshotLogo,
              badge: {
                text: "Upcoming",
                variant: "secondary",
              },
            },
          ]}
        />
        <NavProjects
          projects={[
            {
              name: "Charts",
              url: "#",
              icon: ChartLineIcon,
            },
            {
              name: "Watch List",
              url: "#",
              icon: Clock10Icon,
            },
            {
              name: "Workers",
              url: "#",
              icon: BotIcon,
            },
          ]}
        />
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

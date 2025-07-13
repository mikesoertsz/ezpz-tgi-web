"use client";

import {
  Bot,
  Brain,
  FolderSearch2,
  LifeBuoy,
  Search,
  Send,
  Shield,
  SquareDashedBottom,
  Users,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CreateReportDialog } from "./create-report-dialog";
import NavUser from "./nav-user";
import TerminalTextLine from "./TerminalTextLine";

const data = {
  user: {
    name: "Analyst",
    email: "analyst@example.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareDashedBottom,
      isActive: true,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: FolderSearch2,
      items: [
        {
          title: "All Reports",
          url: "/reports",
        },
        {
          title: "Recent",
          url: "/reports/recent",
        },
        {
          title: "In Progress",
          url: "/reports/in-progress",
        },
        {
          title: "Archived",
          url: "/reports/archived",
        },
      ],
    },
    {
      title: "AI Agents",
      url: "/agents",
      icon: Bot,
      items: [
        {
          title: "Active Agents",
          url: "/agents",
        },
        {
          title: "Agent Config",
          url: "/agents/config",
        },
        {
          title: "Search History",
          url: "/agents/history",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "/support",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Corporate Security Assessment",
      url: "/projects/1",
      icon: Shield,
    },
    {
      name: "Executive Background Check",
      url: "/projects/2",
      icon: Users,
    },
    {
      name: "Competitive Intelligence",
      url: "/projects/3",
      icon: Search,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="flex aspect-square items-center justify-center">
                  <Brain
                    className="text-orange-500"
                    size={20}
                    strokeWidth={2}
                  />
                </div>
                <div className="flex text-left text-xs items-center justify-between w-full gap-1 h-8">
                  <div className="flex">
                    <span className="truncate font-semibold text-sm sr-only">
                      Triangle
                    </span>
                    <span className="font-mono font-semibold text-sm text-orange-500">
                      PENSA
                    </span>
                  </div>
                  <TerminalTextLine
                    className="font-mono font-semibold text-[11px] text-stone-400 mt-1"
                    text="v0.02a"
                  />
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <div className="mt-auto p-3">
        <CreateReportDialog />
      </div>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

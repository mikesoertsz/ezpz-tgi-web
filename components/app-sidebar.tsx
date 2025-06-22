"use client";

import * as React from "react";
import {
  Shield,
  Users,
  FolderOpen,
  FileText,
  Bot,
  Settings2,
  LifeBuoy,
  Send,
  Activity,
  Search,
  Building2,
  Triangle,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
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
      icon: Activity,
      isActive: true,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: FileText,
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
      title: "Projects",
      url: "/projects",
      icon: FolderOpen,
      items: [
        {
          title: "All Projects",
          url: "/projects",
        },
        {
          title: "Active",
          url: "/projects/active",
        },
        {
          title: "Completed",
          url: "/projects/completed",
        },
      ],
    },
    {
      title: "Clients",
      url: "/clients",
      icon: Building2,
      items: [
        {
          title: "All Clients",
          url: "/clients",
        },
        {
          title: "Add Client",
          url: "/clients/new",
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
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/settings",
        },
        {
          title: "Security",
          url: "/settings/security",
        },
        {
          title: "API Keys",
          url: "/settings/api",
        },
        {
          title: "Notifications",
          url: "/settings/notifications",
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
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Triangle className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-xs leading-tight">
                  <span className="truncate font-semibold text-sm sr-only">
                    Triangle
                  </span>
                  <span className="truncate text-xs opacity-80">
                    Intelligence Platform
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <div className="mt-auto p-3">
          <CreateReportDialog />
        </div>
        <NavSecondary items={data.navSecondary} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}

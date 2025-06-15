"use client"

import { ChevronRight, Plus, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
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
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const itemsWithCreateAction = ["Reports", "Projects", "Clients"]

  const handleCreateNew = (itemTitle: string) => {
    // Handle create new action for each item type
    console.log(`Create new ${itemTitle}`)
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-medium">Intelligence Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.title} className="text-sm">
                <a href={item.url}>
                  <item.icon className="size-4" />
                  <span className="text-sm">{item.title}</span>
                </a>
              </SidebarMenuButton>
              {(itemsWithCreateAction.includes(item.title) || item.items?.length) && (
                <div className="flex items-center">
                  {itemsWithCreateAction.includes(item.title) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                      onClick={() => handleCreateNew(item.title)}
                      title={`Create new ${item.title.slice(0, -1)}`}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  )}
                  {item.items?.length ? (
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction className="data-[state=open]:rotate-90">
                        <ChevronRight className="size-3" />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                  ) : null}
                </div>
              )}
              {item.items?.length ? (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild size="sm">
                          <a href={subItem.url}>
                            <span className="text-xs">{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
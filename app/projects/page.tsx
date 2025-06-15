import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FolderOpen, Plus, Search, MoreHorizontal, FileText, Calendar, User } from "lucide-react"

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      name: "Corporate Security Assessment",
      client: "Acme Corporation",
      status: "In Progress",
      reports: 5,
      created: "2024-01-15",
      lastUpdate: "2 hours ago",
      priority: "High"
    },
    {
      id: 2,
      name: "Executive Background Check",
      client: "Global Dynamics",
      status: "Completed",
      reports: 3,
      created: "2024-01-10",
      lastUpdate: "1 day ago",
      priority: "Medium"
    },
    {
      id: 3,
      name: "Competitive Intelligence",
      client: null,
      status: "In Progress",
      reports: 8,
      created: "2024-01-20",
      lastUpdate: "30 minutes ago",
      priority: "Low"
    },
    {
      id: 4,
      name: "Threat Assessment - Q1",
      client: "TechStart Inc",
      status: "Planning",
      reports: 0,
      created: "2024-01-25",
      lastUpdate: "3 days ago",
      priority: "High"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'default'
      case 'In Progress': return 'secondary'
      case 'Planning': return 'outline'
      default: return 'secondary'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'destructive'
      case 'Medium': return 'secondary'
      case 'Low': return 'outline'
      default: return 'secondary'
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Projects</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Project Management</h1>
              <p className="text-muted-foreground">Organize and track your intelligence gathering projects</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search projects..." className="pl-8" />
            </div>
          </div>

          <div className="grid gap-4">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <FolderOpen className="h-5 w-5 text-muted-foreground" />
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    {project.client ? (
                      <Badge variant="outline" className="text-xs">
                        <User className="h-3 w-3 mr-1" />
                        {project.client}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        Independent Project
                      </Badge>
                    )}
                    <Badge variant={getStatusColor(project.status)} className="text-xs">
                      {project.status}
                    </Badge>
                    <Badge variant={getPriorityColor(project.priority)} className="text-xs">
                      {project.priority} Priority
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Reports:</span>
                      <div className="flex items-center space-x-1 mt-1">
                        <FileText className="h-3 w-3" />
                        <span className="font-medium">{project.reports}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Created:</span>
                      <div className="flex items-center space-x-1 mt-1">
                        <Calendar className="h-3 w-3" />
                        <span className="font-medium">{project.created}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Update:</span>
                      <div className="flex items-center space-x-1 mt-1">
                        <Calendar className="h-3 w-3" />
                        <span className="font-medium">{project.lastUpdate}</span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        View Project
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Project Templates</CardTitle>
              <CardDescription>Start new projects with pre-configured templates</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2 md:grid-cols-3">
              <Button variant="outline" className="justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Security Assessment
              </Button>
              <Button variant="outline" className="justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Background Check
              </Button>
              <Button variant="outline" className="justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Competitive Analysis
              </Button>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
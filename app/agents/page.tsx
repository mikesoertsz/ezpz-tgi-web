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
import { Badge } from "@/components/ui/badge"
import { Bot, Play, Pause, Settings, Activity, Clock, CheckCircle, AlertCircle } from "lucide-react"

export default function AgentsPage() {
  const agents = [
    {
      id: 1,
      name: "Web Scraper Agent",
      description: "Scrapes public web data and social media profiles",
      status: "Active",
      lastRun: "2 minutes ago",
      successRate: 94,
      tasksCompleted: 1247,
      capabilities: ["Web Scraping", "Data Extraction", "Content Analysis"]
    },
    {
      id: 2,
      name: "LinkedIn Intelligence",
      description: "Analyzes LinkedIn profiles and professional networks",
      status: "Active",
      lastRun: "5 minutes ago",
      successRate: 89,
      tasksCompleted: 892,
      capabilities: ["LinkedIn API", "Profile Analysis", "Network Mapping"]
    },
    {
      id: 3,
      name: "Social Media Analyzer",
      description: "Monitors and analyzes social media activity across platforms",
      status: "Active",
      lastRun: "1 minute ago",
      successRate: 91,
      tasksCompleted: 2156,
      capabilities: ["Twitter API", "Facebook Graph", "Instagram Analysis"]
    },
    {
      id: 4,
      name: "Email Validator",
      description: "Validates email addresses and checks for data breaches",
      status: "Idle",
      lastRun: "2 hours ago",
      successRate: 97,
      tasksCompleted: 543,
      capabilities: ["Email Validation", "Breach Detection", "Domain Analysis"]
    },
    {
      id: 5,
      name: "Risk Assessment Engine",
      description: "Analyzes collected data to generate risk scores and insights",
      status: "Active",
      lastRun: "30 seconds ago",
      successRate: 88,
      tasksCompleted: 678,
      capabilities: ["Risk Scoring", "Pattern Recognition", "Threat Analysis"]
    },
    {
      id: 6,
      name: "Report Generator",
      description: "Compiles intelligence data into comprehensive reports",
      status: "Idle",
      lastRun: "1 hour ago",
      successRate: 95,
      tasksCompleted: 234,
      capabilities: ["Report Generation", "Data Visualization", "PDF Export"]
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <Activity className="h-4 w-4 text-green-500" />
      case 'Idle': return <Clock className="h-4 w-4 text-yellow-500" />
      case 'Error': return <AlertCircle className="h-4 w-4 text-red-500" />
      default: return <Bot className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'default'
      case 'Idle': return 'secondary'
      case 'Error': return 'destructive'
      default: return 'outline'
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
                  <BreadcrumbPage>AI Agents</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">AI Agent Management</h1>
              <p className="text-muted-foreground">Monitor and control your intelligence gathering agents</p>
            </div>
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              Agent Settings
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">
                  2 idle agents
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tasks Today</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
                <p className="text-xs text-muted-foreground">
                  +23 from yesterday
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <Bot className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">
                  +2% from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Data Processed</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4GB</div>
                <p className="text-xs text-muted-foreground">
                  Last 24 hours
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {agents.map((agent) => (
              <Card key={agent.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-5 w-5 text-muted-foreground" />
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                    </div>
                    <div className="flex items-center space-x-2">
                      {agent.status === 'Active' ? (
                        <Button variant="outline" size="sm">
                          <Pause className="h-3 w-3 mr-1" />
                          Pause
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm">
                          <Play className="h-3 w-3 mr-1" />
                          Start
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>{agent.description}</CardDescription>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(agent.status)}
                      <Badge variant={getStatusColor(agent.status)} className="text-xs">
                        {agent.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Last Run:</span>
                      <div className="font-medium">{agent.lastRun}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Success Rate:</span>
                      <div className="font-medium">{agent.successRate}%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Tasks Completed:</span>
                      <div className="font-medium">{agent.tasksCompleted.toLocaleString()}</div>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">Capabilities:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {agent.capabilities.map((capability, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {capability}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Agent Controls</CardTitle>
              <CardDescription>Manage all agents and system operations</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2 md:grid-cols-4">
              <Button variant="outline" className="justify-start">
                <Play className="h-4 w-4 mr-2" />
                Start All
              </Button>
              <Button variant="outline" className="justify-start">
                <Pause className="h-4 w-4 mr-2" />
                Pause All
              </Button>
              <Button variant="outline" className="justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Global Config
              </Button>
              <Button variant="outline" className="justify-start">
                <Activity className="h-4 w-4 mr-2" />
                View Logs
              </Button>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
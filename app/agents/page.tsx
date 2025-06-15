"use client"

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Bot, Play, Pause, Settings, Activity, Clock, CheckCircle, AlertCircle, User, Building2, DollarSign, Briefcase, Home, Scale, Globe, FileText } from "lucide-react"
import { AgentSettingsDialog } from "@/components/agent-settings-dialog"
import { useState } from "react"

export default function AgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState<any>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const agents = [
    {
      id: 1,
      name: "Personal Information Agent",
      description: "Gathers basic personal details, demographics, and background information",
      status: "Active",
      lastRun: "2 minutes ago",
      successRate: 96,
      tasksCompleted: 1847,
      icon: User,
      category: "Personal Intelligence"
    },
    {
      id: 2,
      name: "Social Media Intelligence",
      description: "Analyzes social media profiles, posts, connections, and digital footprint",
      status: "Active",
      lastRun: "1 minute ago",
      successRate: 91,
      tasksCompleted: 2156,
      icon: Globe,
      category: "Digital Intelligence"
    },
    {
      id: 3,
      name: "Financial Assets Analyzer",
      description: "Investigates financial records, assets, investments, and economic indicators",
      status: "Active",
      lastRun: "5 minutes ago",
      successRate: 88,
      tasksCompleted: 743,
      icon: DollarSign,
      category: "Financial Intelligence"
    },
    {
      id: 4,
      name: "Business Interests Agent",
      description: "Researches corporate affiliations, business ventures, and professional networks",
      status: "Active",
      lastRun: "3 minutes ago",
      successRate: 93,
      tasksCompleted: 1205,
      icon: Briefcase,
      category: "Corporate Intelligence"
    },
    {
      id: 5,
      name: "Property Holdings Scanner",
      description: "Identifies real estate ownership, property records, and asset holdings",
      status: "Idle",
      lastRun: "1 hour ago",
      successRate: 89,
      tasksCompleted: 567,
      icon: Home,
      category: "Asset Intelligence"
    },
    {
      id: 6,
      name: "Legal & Litigation Monitor",
      description: "Tracks legal proceedings, court records, and litigation history",
      status: "Active",
      lastRun: "10 minutes ago",
      successRate: 94,
      tasksCompleted: 892,
      icon: Scale,
      category: "Legal Intelligence"
    },
    {
      id: 7,
      name: "Online Presence Tracker",
      description: "Maps digital footprint, web presence, and online activity patterns",
      status: "Active",
      lastRun: "30 seconds ago",
      successRate: 92,
      tasksCompleted: 1634,
      icon: Globe,
      category: "Digital Intelligence"
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

  const handleSettingsClick = (agent: any) => {
    // Only pass the properties that AgentSettingsDialog expects
    const filteredAgent = {
      id: agent.id,
      name: agent.name,
      description: agent.description,
      category: agent.category,
      status: agent.status
    }
    setSelectedAgent(filteredAgent)
    setSettingsOpen(true)
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
          <div className="ml-auto flex items-center gap-2 px-4">
            <Button variant="outline" size="sm" title="Start All Agents">
              <Play className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" title="Pause All Agents">
              <Pause className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" title="Global Configuration">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" title="View Logs">
              <FileText className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              Agent Settings
            </Button>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">AI Agent Management</h1>
              <p className="text-muted-foreground">Monitor and control your intelligence gathering agents</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6</div>
                <p className="text-xs text-muted-foreground">
                  1 idle agent
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tasks Today</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">247</div>
                <p className="text-xs text-muted-foreground">
                  +45 from yesterday
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
                  +3% from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Data Processed</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.2GB</div>
                <p className="text-xs text-muted-foreground">
                  Last 24 hours
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Intelligence Agents</CardTitle>
              <CardDescription>
                Specialized AI agents for comprehensive threat analysis and intelligence gathering
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Run</TableHead>
                    <TableHead>Success Rate</TableHead>
                    <TableHead>Tasks</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agents.map((agent) => {
                    const IconComponent = agent.icon
                    return (
                      <TableRow key={agent.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <IconComponent className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{agent.name}</div>
                              <div className="text-sm text-muted-foreground">{agent.description}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {agent.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(agent.status)}
                            <Badge variant={getStatusColor(agent.status)} className="text-xs">
                              {agent.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{agent.lastRun}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{agent.successRate}%</span>
                            <div className="w-16 h-2 bg-muted rounded-full">
                              <div 
                                className="h-2 bg-green-500 rounded-full" 
                                style={{ width: `${agent.successRate}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm font-medium">
                          {agent.tasksCompleted.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
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
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleSettingsClick(agent)}
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {selectedAgent && (
          <AgentSettingsDialog
            open={settingsOpen}
            onOpenChange={setSettingsOpen}
            agent={selectedAgent}
          />
        )}
      </SidebarInset>
    </SidebarProvider>
  )
}
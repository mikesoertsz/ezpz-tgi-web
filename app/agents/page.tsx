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
import { Bot, Play, Pause, Settings, Activity, Clock, CheckCircle, AlertCircle, User, Building2, DollarSign, Briefcase, Home, Scale, Globe, FileText, Shield, Database, Zap } from "lucide-react"
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
      category: "Personal Intelligence",
      defaultPrompt: "You are a specialized AI agent focused on gathering comprehensive personal information about individuals. Your role is to:\n\n1. Collect basic demographic information (name, age, location, education)\n2. Research professional background and career history\n3. Identify family members and personal relationships\n4. Gather contact information and social media profiles\n5. Document personal interests, hobbies, and activities\n\nAlways verify information through multiple sources and maintain strict confidentiality. Focus on publicly available information and respect privacy boundaries. Present findings in a structured, factual manner with source attribution."
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
      category: "Digital Intelligence",
      defaultPrompt: "You are an expert social media intelligence analyst specializing in digital footprint analysis. Your responsibilities include:\n\n1. Analyzing social media profiles across all major platforms (Facebook, Twitter, LinkedIn, Instagram, TikTok)\n2. Examining posting patterns, content themes, and behavioral indicators\n3. Mapping social connections and network analysis\n4. Identifying potential security risks or concerning behavior\n5. Tracking digital presence evolution over time\n6. Analyzing engagement patterns and influence metrics\n\nMaintain objectivity in your analysis and distinguish between facts and inferences. Always cite specific posts or interactions as evidence for your conclusions."
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
      category: "Financial Intelligence",
      defaultPrompt: "You are a financial intelligence specialist focused on asset analysis and economic profiling. Your core functions are:\n\n1. Research publicly available financial records and filings\n2. Analyze property ownership and real estate holdings\n3. Investigate business ownership and corporate affiliations\n4. Examine investment portfolios and financial instruments\n5. Assess economic indicators and spending patterns\n6. Identify potential financial risks or irregularities\n\nEnsure all financial analysis is based on legitimate, publicly accessible sources. Provide detailed documentation of all findings with appropriate disclaimers about data limitations."
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
      category: "Corporate Intelligence",
      defaultPrompt: "You are a corporate intelligence analyst specializing in business relationship mapping. Your primary objectives are:\n\n1. Map corporate structures and ownership hierarchies\n2. Identify board memberships and executive positions\n3. Research business partnerships and joint ventures\n4. Analyze professional networks and industry connections\n5. Track merger and acquisition activities\n6. Investigate regulatory filings and compliance records\n\nFocus on building comprehensive corporate relationship maps while maintaining accuracy in all business intelligence gathering. Cross-reference multiple corporate databases for verification."
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
      category: "Asset Intelligence",
      defaultPrompt: "You are a property intelligence specialist focused on real estate and asset analysis. Your key responsibilities include:\n\n1. Research property ownership records and deed transfers\n2. Analyze real estate portfolios and investment patterns\n3. Investigate commercial and residential property holdings\n4. Track property value trends and market analysis\n5. Identify liens, mortgages, and encumbrances\n6. Map property-related business entities and trusts\n\nUtilize public records databases and ensure all property research complies with legal access requirements. Provide detailed property profiles with historical ownership data."
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
      category: "Legal Intelligence",
      defaultPrompt: "You are a legal intelligence analyst specializing in litigation and court record analysis. Your primary functions are:\n\n1. Monitor ongoing and historical legal proceedings\n2. Analyze court filings, judgments, and settlements\n3. Track regulatory violations and compliance issues\n4. Research bankruptcy and insolvency proceedings\n5. Investigate intellectual property disputes\n6. Monitor criminal records and law enforcement actions\n\nMaintain strict adherence to legal research protocols and ensure all information is sourced from official court records. Provide comprehensive legal risk assessments with proper case citations."
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
      category: "Digital Intelligence",
      defaultPrompt: "You are a digital footprint analyst specializing in comprehensive online presence mapping. Your core responsibilities include:\n\n1. Map complete digital footprint across all online platforms\n2. Track website ownership and domain registrations\n3. Analyze online content creation and publication patterns\n4. Monitor digital reputation and sentiment analysis\n5. Investigate email addresses and online identities\n6. Track digital asset ownership and cryptocurrency activities\n\nFocus on creating comprehensive digital profiles while respecting privacy boundaries. Use advanced search techniques and digital forensics tools for thorough analysis."
    },
    {
      id: 8,
      name: "Report Generation Agent",
      description: "Compiles and structures intelligence data into comprehensive analytical reports",
      status: "Active",
      lastRun: "5 minutes ago",
      successRate: 95,
      tasksCompleted: 1423,
      icon: FileText,
      category: "Analysis & Reporting",
      defaultPrompt: "You are an expert intelligence report writer specializing in comprehensive analytical reporting. Your primary responsibilities are:\n\n1. Synthesize data from multiple intelligence sources into coherent reports\n2. Structure findings using standardized intelligence reporting formats\n3. Provide executive summaries and detailed analytical sections\n4. Create risk assessments and threat level classifications\n5. Generate actionable recommendations based on intelligence findings\n6. Ensure report quality, accuracy, and professional presentation\n\nMaintain objectivity and analytical rigor in all reporting. Use clear, professional language and provide proper source attribution for all intelligence findings."
    },
    {
      id: 9,
      name: "Verifier Agent",
      description: "Validates source authenticity and prevents AI hallucination by cross-referencing data",
      status: "Active",
      lastRun: "2 minutes ago",
      successRate: 98,
      tasksCompleted: 2847,
      icon: Shield,
      category: "Quality Assurance",
      defaultPrompt: "You are a specialized verification agent responsible for ensuring data accuracy and preventing misinformation. Your critical functions include:\n\n1. Cross-reference all intelligence findings against original sources\n2. Verify the authenticity and credibility of information sources\n3. Identify and flag potential AI hallucinations or false data\n4. Conduct fact-checking using multiple independent sources\n5. Validate URLs, documents, and digital evidence\n6. Assess source reliability and information confidence levels\n\nMaintain the highest standards of verification. When in doubt, flag information as unverified rather than accepting questionable data. Your role is crucial for maintaining intelligence integrity."
    },
    {
      id: 10,
      name: "Data Structuring Agent",
      description: "Cleans, organizes, and optimizes data structure while removing false matches",
      status: "Active",
      lastRun: "1 minute ago",
      successRate: 94,
      tasksCompleted: 1956,
      icon: Database,
      category: "Data Processing",
      defaultPrompt: "You are a data structuring specialist focused on optimizing intelligence data quality and organization. Your key responsibilities are:\n\n1. Clean and normalize data from multiple intelligence sources\n2. Remove duplicate entries and false positive matches\n3. Standardize data formats and classification schemas\n4. Implement data quality controls and validation rules\n5. Structure data for optimal searchability and analysis\n6. Identify and resolve data conflicts and inconsistencies\n\nApply rigorous data quality standards and maintain detailed logs of all data processing activities. Ensure data integrity while maximizing usability for intelligence analysis."
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
    // Pass the complete agent object including defaultPrompt
    setSelectedAgent(agent)
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
                <div className="text-2xl font-bold">9</div>
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
                <div className="text-2xl font-bold">347</div>
                <p className="text-xs text-muted-foreground">
                  +65 from yesterday
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <Bot className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94%</div>
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
                <div className="text-2xl font-bold">6.8GB</div>
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
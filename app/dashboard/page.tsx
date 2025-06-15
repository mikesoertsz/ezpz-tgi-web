import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Activity,
  Bot,
  FileText,
  FolderOpen,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";

export default function DashboardPage() {
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
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Reports
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  +3 from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Projects
                </CardTitle>
                <FolderOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  +2 new this month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Clients
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  +1 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Agents</CardTitle>
                <Bot className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6</div>
                <p className="text-xs text-muted-foreground">
                  4 active, 2 idle
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Intelligence Reports</CardTitle>
                <CardDescription>
                  Latest threat analysis and security assessments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 rounded-md border p-4">
                  <Shield className="h-6 w-6 text-red-500" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Executive Background Check - John Smith
                    </p>
                    <p className="text-sm text-muted-foreground">
                      High-risk indicators found in social media analysis
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    2 hours ago
                  </div>
                </div>
                <div className="flex items-center space-x-4 rounded-md border p-4">
                  <Activity className="h-6 w-6 text-yellow-500" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Corporate Security Assessment - TechCorp Inc
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Medium-risk vulnerabilities identified
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    4 hours ago
                  </div>
                </div>
                <div className="flex items-center space-x-4 rounded-md border p-4">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Competitive Intelligence - Market Analysis
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Low-risk profile with positive indicators
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    6 hours ago
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Agent Activity</CardTitle>
                <CardDescription>
                  Current AI agent status and performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Web Scraper Agent</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Social Media Analyzer</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">LinkedIn Intelligence</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Email Validator</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Idle</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Risk Assessment</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Report Generator</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Idle</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

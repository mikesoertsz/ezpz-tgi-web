"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Building2,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  MoreHorizontal,
  Search,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { useProfiles } from "@/hooks/use-profiles";
import { Profile, RawDataEntry } from "@/types/database";
import { createClient } from "@/utils/supabase/client";
import TableView from "@/components/ui/table-view";
import { TableRow, TableCell } from "@/components/ui/table";
import { toast } from "sonner";

function ReportsPageContent() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [clientFilter, setClientFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const { profiles, loading, error, refetch } = useProfiles();
  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());

  type Report = {
    id: number;
    title: string;
    project: string;
    client: string | null;
    target: string;
    targetEmail: string;
    targetLinkedIn: string;
    status: string;
    riskLevel: string;
    generated: string;
    findings: number;
    type: string;
    execution_id?: string | null;
    ai_summary?: unknown;
    raw_data?: RawDataEntry[] | null;
  };

  const defaultReport: Report = {
    id: 0,
    title: "Default Report",
    project: "Default Project",
    client: "Default Client",
    target: "Default Target",
    targetEmail: "default@example.com",
    targetLinkedIn: "N/A",
    status: "Unknown",
    riskLevel: "Unknown",
    generated: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    findings: 0,
    type: "Default Type",
    execution_id: null,
    ai_summary: null,
    raw_data: null,
  };

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Report;
    direction: string;
  } | null>(null);

  // Transform profiles data into reports format
  const transformProfileToReport = (profile: Profile): Report => {
    const name = profile.name || "Unknown";
    const email = profile.email || "N/A";

    // Extract data from raw_data if it exists
    let linkedInUrl = "N/A";
    let company = null;
    let findings = 0;
    let riskFactors = 0;
    let headline = "";

    if (profile.raw_data && Array.isArray(profile.raw_data)) {
      const firstEntry = profile.raw_data[0];
      if (firstEntry) {
        linkedInUrl = firstEntry.profileUrl || "N/A";
        company = firstEntry.basic_info?.current_company || null;
        headline = firstEntry.basic_info?.headline || "";

        // Count findings from different sections
        findings =
          (firstEntry.experience?.length || 0) +
          (firstEntry.education?.length || 0) +
          (firstEntry.certifications?.length || 0) +
          (firstEntry.projects?.length || 0);

        // Calculate risk factors based on profile completeness and security-related content
        if (
          headline.toLowerCase().includes("security") ||
          headline.toLowerCase().includes("cyber")
        ) {
          riskFactors += 1;
        }
        if (
          firstEntry.experience?.some(
            (exp: { title?: string }) =>
              exp.title?.toLowerCase().includes("security") ||
              exp.title?.toLowerCase().includes("admin")
          )
        ) {
          riskFactors += 1;
        }
        if (
          firstEntry.certifications?.length &&
          firstEntry.certifications.length > 0
        ) {
          riskFactors += 1;
        }
      }
    }

    // Determine status and risk based on data availability and content
    let status = "Processing";
    let riskLevel = "Unknown";

    if (profile.ai_summary) {
      status = "Completed";
      // Determine risk based on findings and risk factors
      if (riskFactors >= 2 || findings > 10) {
        riskLevel = "High";
      } else if (riskFactors >= 1 || findings > 5) {
        riskLevel = "Medium";
      } else {
        riskLevel = "Low";
      }
    } else if (profile.raw_data && findings > 0) {
      status = "In Progress";
      riskLevel = "Medium";
    }

    return {
      id: profile.id,
      title: `Profile Analysis - ${name}`,
      project: company
        ? `${company} Assessment`
        : "Individual Profile Analysis",
      client: company,
      target: name,
      targetEmail: email,
      targetLinkedIn: linkedInUrl,
      status,
      riskLevel,
      generated: new Date(profile.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      findings,
      type: "LinkedIn Profile Analysis",
      execution_id: profile.execution_id,
      ai_summary: profile.ai_summary,
      raw_data: profile.raw_data,
    };
  };

  const reports: Report[] =
    profiles.length > 0
      ? profiles.map(transformProfileToReport)
      : [defaultReport];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "In Progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "Processing":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  // Get unique values for filters
  const uniqueClients = [
    ...new Set(reports.map((r) => r.client).filter((c): c is string => !!c)),
  ];
  const uniqueStatuses = [...new Set(reports.map((r) => r.status))];

  // Filter reports based on search and filters
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.targetEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClient =
      clientFilter === "all" || report.client === clientFilter;
    const matchesStatus =
      statusFilter === "all" || report.status === statusFilter;

    return matchesSearch && matchesClient && matchesStatus;
  });

  const sortedReports = [...filteredReports].sort((a, b) => {
    if (sortConfig !== null) {
      const key = sortConfig.key;
      const aValue = a[key];
      const bValue = b[key];
      // Handle null or undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortConfig.direction === "ascending" ? -1 : 1;
      if (bValue == null) return sortConfig.direction === "ascending" ? 1 : -1;
      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });

  const requestSort = (key: keyof Report) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleRowClick = (reportId: number) => {
    // Find the report to get execution_id
    const report = reports.find((r) => r.id === reportId);
    const navigationId = report?.execution_id || reportId;
    router.push(`/reports/${navigationId}`);
  };

  const handleDeleteReport = async (reportId: number) => {
    if (
      !confirm(
        "Are you sure you want to delete this report? This action cannot be undone."
      )
    ) {
      return;
    }

    setDeletingIds((prev) => new Set(prev).add(reportId));

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", reportId);

      if (error) {
        throw error;
      }

      // Refresh the data after successful deletion
      await refetch();
    } catch (error) {
      console.error("Error deleting report:", error);
      alert("Failed to delete report. Please try again.");
    } finally {
      setDeletingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(reportId);
        return newSet;
      });
    }
  };

  const handleActionClick = (
    e: React.MouseEvent,
    action: string,
    reportId: number
  ) => {
    e.stopPropagation(); // Prevent row click when clicking action buttons

    switch (action) {
      case "view":
        router.push(`/reports/${reportId}`);
        break;
      case "download":
        // Handle download logic
        console.log(`Downloading report ${reportId}`);
        break;
      case "delete":
        handleDeleteReport(reportId);
        break;
      case "more":
        // Handle more options
        console.log(`More options for report ${reportId}`);
        break;
    }
  };

  if (error) {
    toast.error(
      typeof error === "string" ? error : "An error occurred loading reports."
    );
  }

  return (
    <SidebarInset className="rounded-sm">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
          {/* Reports Table with Filters and Search */}
          <Card>
            <CardHeader className="flex justify-between items-center">
              <div>
                <CardTitle>
                  Intelligence Reports ({sortedReports.length})
                </CardTitle>
                <CardDescription>
                  Comprehensive intelligence reports and security assessments
                </CardDescription>
              </div>
              <div className="flex gap-2 items-center">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={clientFilter} onValueChange={setClientFilter}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Clients</SelectItem>
                    {uniqueClients.map((client) => (
                      <SelectItem key={client} value={client}>
                        {client}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {uniqueStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading profiles...</p>
                  </div>
                </div>
              ) : reports.length === 0 && !loading ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">
                    No reports found
                  </h3>
                  <p className="text-muted-foreground">
                    Get started by creating your first intelligence report.
                  </p>
                </div>
              ) : (
                <TableView
                  columns={[
                    {
                      key: "title",
                      label: "Report & Target",
                      onSort: () => requestSort("title"),
                      sortIcon:
                        sortConfig?.key === "title" ? (
                          sortConfig.direction === "ascending" ? (
                            <ChevronUp className="inline-block ml-1" />
                          ) : (
                            <ChevronDown className="inline-block ml-1" />
                          )
                        ) : null,
                    },
                    {
                      key: "client",
                      label: "Client",
                      onSort: () => requestSort("client"),
                      sortIcon:
                        sortConfig?.key === "client" ? (
                          sortConfig.direction === "ascending" ? (
                            <ChevronUp className="inline-block ml-1" />
                          ) : (
                            <ChevronDown className="inline-block ml-1" />
                          )
                        ) : null,
                    },
                    {
                      key: "status",
                      label: "Status",
                      onSort: () => requestSort("status"),
                      sortIcon:
                        sortConfig?.key === "status" ? (
                          sortConfig.direction === "ascending" ? (
                            <ChevronUp className="inline-block ml-1" />
                          ) : (
                            <ChevronDown className="inline-block ml-1" />
                          )
                        ) : null,
                    },
                    {
                      key: "generated",
                      label: "Generated",
                      onSort: () => requestSort("generated"),
                      sortIcon:
                        sortConfig?.key === "generated" ? (
                          sortConfig.direction === "ascending" ? (
                            <ChevronUp className="inline-block ml-1" />
                          ) : (
                            <ChevronDown className="inline-block ml-1" />
                          )
                        ) : null,
                    },
                    {
                      key: "findings",
                      label: "Findings",
                      onSort: () => requestSort("findings"),
                      sortIcon:
                        sortConfig?.key === "findings" ? (
                          sortConfig.direction === "ascending" ? (
                            <ChevronUp className="inline-block ml-1" />
                          ) : (
                            <ChevronDown className="inline-block ml-1" />
                          )
                        ) : null,
                    },
                    {
                      key: "actions",
                      label: "Actions",
                      className: "text-right",
                    },
                  ]}
                  data={sortedReports}
                  renderRow={(report) => (
                    <TableRow
                      key={report.id}
                      className="hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => handleRowClick(report.id)}
                    >
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{report.title}</div>
                            <div className="text-sm text-muted-foreground">
                              Target: {report.target}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {report.targetEmail}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {report.client ? (
                          <div className="flex items-center space-x-1">
                            <Building2 className="h-3 w-3" />
                            <span className="text-sm">{report.client}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            Independent
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(report.status)}
                          <Badge variant="secondary" className="text-xs">
                            {report.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{report.generated}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">
                          {report.findings} findings
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => e.stopPropagation()}
                              title="More Options"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handleActionClick(e, "view", report.id);
                              }}
                            >
                              View Report
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handleActionClick(e, "download", report.id);
                              }}
                            >
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handleActionClick(e, "delete", report.id);
                              }}
                              className="text-red-600 hover:text-red-800 hover:bg-red-50"
                              disabled={deletingIds.has(report.id)}
                            >
                              {deletingIds.has(report.id) ? (
                                <div className="flex items-center space-x-2">
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                                  <span>Deleting...</span>
                                </div>
                              ) : (
                                <div className="flex items-center space-x-2">
                                  <Trash2 className="h-4 w-4" />
                                  <span>Delete</span>
                                </div>
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarProvider>
    </SidebarInset>
  );
}

export default function ReportsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p>Loading reports...</p>
          </div>
        </div>
      }
    >
      <ReportsPageContent />
    </Suspense>
  );
}

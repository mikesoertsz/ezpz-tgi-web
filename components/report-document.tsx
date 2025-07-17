"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ReportData } from "@/lib/report-data";
import {
  loadReportData,
  saveReportData,
  updateReportSection,
} from "@/lib/report-loader";
import {
  Building2,
  Code,
  DollarSign,
  Globe,
  Home,
  Scale,
  Search,
  Shield,
  User,
  Image as ImageIcon,
  Copy as CopyIcon,
  Download as DownloadIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

// Import section components
import ProcessingStatusBar from "./processing-status-bar";
import AccordionSection from "./report/accordion-section";
import { BusinessInterestsSection } from "./report/business-interests-section";
import { createDummyReport } from "./report/create-dummy-report";
import { FinancialAssetsSection } from "./report/financial-assets-section";
import { LegalRecordsSection } from "./report/legal-records-section";
import { OnlinePresenceSection } from "./report/online-presence-section";
import { PersonalInformationSection } from "./report/personal-information-section";
import { PropertyHoldingsSection } from "./report/property-holdings-section";
import { SocialMediaSection } from "./report/social-media-section";
import { transformWebhookDataToReportData } from "./report/transform-webhook-data-to-report-data";
import ReportToolbar from "./report-toolbar";
import { ImagesSection } from "./report/images-section";
import { useProfileUpdate } from "@/hooks/use-profile-update";
import { createClient } from "@/utils/supabase/client";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface ReportDocumentProps {
  reportId?: string;
}

export function ReportDocument({ reportId }: ReportDocumentProps) {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingReport, setProcessingReport] = useState(false);
  const [pollingAttempt, setPollingAttempt] = useState(0);
  const [maxPollingAttempts] = useState(15);
  const { updatePersonalInfo, error: updateError } = useProfileUpdate();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    personal: true,
    social: false,
    financial: false,
    business: false,
    property: false,
    legal: false,
    online: false,
  });
  const [editingSections, setEditingSections] = useState<
    Record<string, boolean>
  >({});
  const [refreshingSections, setRefreshingSections] = useState<
    Record<string, boolean>
  >({});
  const [savingSections, setSavingSections] = useState<Record<string, boolean>>(
    {}
  );
  const [approvedSections, setApprovedSections] = useState<
    Record<string, boolean>
  >({});

  const [realData, setRealData] = useState<unknown>(null);
  // Load report data

  useEffect(() => {
    async function loadData() {
      if (reportId) {
        // Check if this is a new execution_id (numeric) vs existing report
        const isNumeric = /^\d+$/.test(reportId);

        if (isNumeric) {
          // This is a new execution - show dummy content and wait for real data
          setProcessingReport(true);

          // Create dummy report data
          const dummyData = createDummyReport(reportId);
          setReportData(dummyData);
          setLoading(false);

          // Poll starting after 2 seconds, then every 30 seconds until we get data, max 15 attempts
          const pollForData = async () => {
            setPollingAttempt((prev) => prev + 1);

            try {
              const response = await fetch(
                `https://ezpzagents.app.n8n.cloud/webhook/9a215e95-ecd0-482c-931e-3c5f72328878?execution_id=${reportId}`
              );

              if (response.ok) {
                const webhookData = await response.json();

                // Store the raw data for JSON section
                setRealData(webhookData);

                // Transform data for the report sections
                const transformedData = transformWebhookDataToReportData(
                  webhookData,
                  reportId
                );
                setReportData(transformedData);
                setProcessingReport(false);
                return; // Success - stop polling
              } else {
                console.log(
                  `Attempt ${
                    pollingAttempt + 1
                  }/${maxPollingAttempts}: Data not ready yet`
                );
              }
            } catch (error) {
              console.log(
                `Attempt ${
                  pollingAttempt + 1
                }/${maxPollingAttempts}: Error fetching data:`,
                error
              );
            }

            // If we haven't reached max attempts, schedule next poll
            if (pollingAttempt < maxPollingAttempts - 1) {
              setTimeout(pollForData, 30000); // 30 seconds for subsequent polls
            } else {
              console.error(
                "Max polling attempts reached. Investigation may still be processing."
              );
              // Keep dummy data but stop processing indicator
              setProcessingReport(false);
            }
          };

          // Start first poll after 2 seconds
          setTimeout(pollForData, 500);
        } else {
          // This is an existing report - load normally and check for database updates
          const data = await loadReportData(reportId);

          // Try to load updated data from Supabase
          if (data) {
            try {
              const supabase = createClient();
              const { data: profileData, error } = await supabase
                .from("profiles")
                .select("ai_summary, raw_data")
                .eq("execution_id", reportId)
                .single();

              if (!error && profileData) {
                // Set raw data for JSON section
                if (profileData.raw_data) {
                  setRealData(profileData.raw_data);
                }

                // Merge database data with local data if personal info exists
                if (profileData.ai_summary?.personal_info) {
                  const mergedData: ReportData = {
                    ...data,
                    personalInformation: {
                      ...data.personalInformation,
                      ...profileData.ai_summary.personal_info,
                    },
                  };
                  setReportData(mergedData);
                } else {
                  setReportData(data);
                }
              } else {
                setReportData(data);
              }
            } catch (error) {
              console.error("Error loading from database:", error);
              setReportData(data);
            }
          } else {
            setReportData(data);
          }

          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
    loadData();
  }, [reportId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading report...</p>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">No Report Data</h2>
          <p className="text-muted-foreground">
            Start a new investigation to generate a report.
          </p>
        </div>
      </div>
    );
  }

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleApprovalToggle = (sectionId: string) => {
    setApprovedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handleRefresh = (sectionId: string) => {
    setRefreshingSections((prev) => ({ ...prev, [sectionId]: true }));

    // Simulate AI research duration (3-5 seconds)
    const duration = Math.random() * 2000 + 3000;

    setTimeout(() => {
      setRefreshingSections((prev) => ({ ...prev, [sectionId]: false }));
    }, duration);
  };

  const handleEdit = (sectionId: string) => {
    setEditingSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const handleSaveField = async (
    sectionId: string,
    field: string,
    value: string | string[]
  ) => {
    if (!reportData || !reportId) return;

    const updates = { [field]: value };
    const updatedReport = updateReportSection(reportData, sectionId, updates);

    // Update local state immediately for UI responsiveness
    setReportData(updatedReport);

    // Save to local storage for persistence
    await saveReportData(updatedReport);

    // If this is personal information and we have a valid reportId, also save to Supabase
    if (sectionId === "personal" && reportId) {
      try {
        const personalInfo = {
          ...updatedReport.personalInformation,
          [field]: value,
        };

        const success = await updatePersonalInfo(reportId, personalInfo);
        if (!success && updateError) {
          console.error("Failed to save to database:", updateError);
          // You could show a toast notification here
        }
      } catch (error) {
        console.error("Error saving personal information:", error);
      }
    }
  };

  const handleSave = async (sectionId: string) => {
    if (!reportData || !reportId) return;

    // Set saving state
    setSavingSections((prev) => ({ ...prev, [sectionId]: true }));

    try {
      if (sectionId === "personal") {
        const success = await updatePersonalInfo(
          reportId,
          reportData.personalInformation
        );
        if (success) {
          console.log("Personal information saved successfully");
        } else {
          console.error("Failed to save personal information:", updateError);
        }
      }
      // Add more section save logic here for other sections as needed
    } catch (error) {
      console.error("Error saving section:", error);
    } finally {
      // Clear saving state after a delay
      setTimeout(() => {
        setSavingSections((prev) => ({ ...prev, [sectionId]: false }));
      }, 1000);
    }
  };

  return (
    <ScrollArea className="h-screen">
      <div className="bg-[#F7F0E8] w-full max-w-full  rounded-2xl overflow-hidden">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none z-0">
          <div className="transform rotate-45 text-black text-9xl font-bold">
            CLASSIFIED
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 w-full max-w-full overflow-hidden">
          <div className="flex w-full items-center justify-between gap-3 py-0 px-4 bg-gray-50 rounded-sm mb-4 border border-gray-200">
            {processingReport && (
              <ProcessingStatusBar
                pollingAttempt={pollingAttempt}
                maxPollingAttempts={maxPollingAttempts}
              />
            )}
            <ReportToolbar />
          </div>

          {/* Subject Information */}
          <div className="mb-6">
            <div className="flex p-4">
              <div className="flex-grow">
                <p className="text-[11px] uppercase font-mono text-orange-600 tracking-widest subpixel-antialiased mb-1 font-medium">
                  Report <span className="animate-pulse">/</span>
                </p>
                <h2 className="mb-2 text-md font-semibold text-gray-900">
                  {reportData.targetName}
                </h2>
              </div>
              <div className="w-28 h-36 bg-gray-200 rounded-sm border border-gray-200 flex items-center justify-center">
                <User className="h-12 w-12 text-gray-400" />
              </div>
            </div>

            {/* Report Sections */}
            <div className="space-y-1 p-4">
              {/* Personal Information */}
              <AccordionSection
                sectionId="personal"
                title="Personal Information"
                icon={User}
                creditCost={2.1}
                reportData={reportData}
                openSections={openSections}
                editingSections={editingSections}
                refreshingSections={refreshingSections}
                savingSections={savingSections}
                approvedSections={approvedSections}
                toggleSection={toggleSection}
                handleApprovalToggle={handleApprovalToggle}
                handleRefresh={handleRefresh}
                handleEdit={handleEdit}
                handleSave={handleSave}
              >
                <PersonalInformationSection
                  data={reportData.personalInformation}
                  isEditing={editingSections.personal || false}
                  isRefreshing={refreshingSections.personal || false}
                  onSave={(field, value) =>
                    handleSaveField(
                      "personal",
                      field,
                      value as string | string[]
                    )
                  }
                />
              </AccordionSection>

              {/* Images Section */}
              <AccordionSection
                sectionId="images"
                title="Images"
                icon={ImageIcon}
                creditCost={2.5}
                reportData={reportData}
                openSections={openSections}
                editingSections={editingSections}
                refreshingSections={refreshingSections}
                savingSections={savingSections}
                approvedSections={approvedSections}
                toggleSection={toggleSection}
                handleApprovalToggle={handleApprovalToggle}
                handleRefresh={handleRefresh}
                handleEdit={handleEdit}
                handleSave={handleSave}
              >
                <ImagesSection images={reportData.images?.images || []} />
              </AccordionSection>

              {/* Social Media Intelligence */}
              <AccordionSection
                sectionId="social"
                title="Social Media Intelligence"
                icon={Globe}
                creditCost={3.2}
                reportData={reportData}
                openSections={openSections}
                editingSections={editingSections}
                refreshingSections={refreshingSections}
                savingSections={savingSections}
                approvedSections={approvedSections}
                toggleSection={toggleSection}
                handleApprovalToggle={handleApprovalToggle}
                handleRefresh={handleRefresh}
                handleEdit={handleEdit}
                handleSave={handleSave}
              >
                <SocialMediaSection profiles={reportData.socialMediaProfiles} />
              </AccordionSection>

              {/* Financial Assets */}
              <AccordionSection
                sectionId="financial"
                title="Financial Assets"
                icon={DollarSign}
                creditCost={4.1}
                reportData={reportData}
                openSections={openSections}
                editingSections={editingSections}
                refreshingSections={refreshingSections}
                savingSections={savingSections}
                approvedSections={approvedSections}
                toggleSection={toggleSection}
                handleApprovalToggle={handleApprovalToggle}
                handleRefresh={handleRefresh}
                handleEdit={handleEdit}
                handleSave={handleSave}
              >
                <FinancialAssetsSection
                  data={reportData.financialAssets}
                  isEditing={editingSections.financial || false}
                  isRefreshing={refreshingSections.financial || false}
                  onSave={(field, value) =>
                    handleSaveField(
                      "financial",
                      field,
                      value as string | string[]
                    )
                  }
                />
              </AccordionSection>

              {/* Business Interests */}
              <AccordionSection
                sectionId="business"
                title="Business Interests"
                icon={Building2}
                creditCost={3.8}
                reportData={reportData}
                openSections={openSections}
                editingSections={editingSections}
                refreshingSections={refreshingSections}
                savingSections={savingSections}
                approvedSections={approvedSections}
                toggleSection={toggleSection}
                handleApprovalToggle={handleApprovalToggle}
                handleRefresh={handleRefresh}
                handleEdit={handleEdit}
                handleSave={handleSave}
              >
                <BusinessInterestsSection
                  businesses={reportData.businessInterests}
                />
              </AccordionSection>

              {/* Property Holdings */}
              <AccordionSection
                sectionId="property"
                title="Property Holdings"
                icon={Home}
                creditCost={3.5}
                reportData={reportData}
                openSections={openSections}
                editingSections={editingSections}
                refreshingSections={refreshingSections}
                savingSections={savingSections}
                approvedSections={approvedSections}
                toggleSection={toggleSection}
                handleApprovalToggle={handleApprovalToggle}
                handleRefresh={handleRefresh}
                handleEdit={handleEdit}
                handleSave={handleSave}
              >
                <PropertyHoldingsSection
                  properties={reportData.propertyHoldings}
                />
              </AccordionSection>

              {/* Legal & Litigation */}
              <AccordionSection
                sectionId="legal"
                title="Legal & Litigation"
                icon={Scale}
                creditCost={2.9}
                reportData={reportData}
                openSections={openSections}
                editingSections={editingSections}
                refreshingSections={refreshingSections}
                savingSections={savingSections}
                approvedSections={approvedSections}
                toggleSection={toggleSection}
                handleApprovalToggle={handleApprovalToggle}
                handleRefresh={handleRefresh}
                handleEdit={handleEdit}
                handleSave={handleSave}
              >
                <LegalRecordsSection
                  data={reportData.legalRecords}
                  isEditing={editingSections.legal || false}
                  isRefreshing={refreshingSections.legal || false}
                  onSave={(field, value) =>
                    handleSaveField("legal", field, value as string | string[])
                  }
                />
              </AccordionSection>

              {/* Online Presence */}
              <AccordionSection
                sectionId="online"
                title="Online Presence"
                icon={Search}
                creditCost={2.7}
                reportData={reportData}
                openSections={openSections}
                editingSections={editingSections}
                refreshingSections={refreshingSections}
                savingSections={savingSections}
                approvedSections={approvedSections}
                toggleSection={toggleSection}
                handleApprovalToggle={handleApprovalToggle}
                handleRefresh={handleRefresh}
                handleEdit={handleEdit}
                handleSave={handleSave}
              >
                <OnlinePresenceSection
                  data={reportData.onlinePresence}
                  isEditing={editingSections.online || false}
                  isRefreshing={refreshingSections.online || false}
                  onSave={(field, value) =>
                    handleSaveField("online", field, value as string | string[])
                  }
                />
              </AccordionSection>

              {/* JSON */}
              <AccordionSection
                sectionId="json"
                title="JSON"
                icon={Code}
                creditCost={0}
                reportData={{
                  ...reportData,
                  sections: {
                    ...reportData.sections,
                    json: {
                      id: "json",
                      title: "Raw JSON Data",
                      hasData: !!realData,
                      lastUpdated: new Date().toISOString(),
                      agentStatus: "completed",
                      bibliography: [],
                    },
                  },
                }}
                openSections={openSections}
                editingSections={editingSections}
                refreshingSections={refreshingSections}
                savingSections={savingSections}
                approvedSections={approvedSections}
                toggleSection={toggleSection}
                handleApprovalToggle={handleApprovalToggle}
                handleRefresh={handleRefresh}
                handleEdit={handleEdit}
                // No handleSave for JSON section - it's read-only
                headerActions={
                  <>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                          onClick={async (e) => {
                            e.stopPropagation();
                            if (realData) {
                              await navigator.clipboard.writeText(
                                JSON.stringify(realData, null, 2)
                              );
                            }
                          }}
                          title="Copy JSON"
                          tabIndex={-1}
                        >
                          <CopyIcon size={16} className="text-gray-600" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Copy JSON</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (realData) {
                              const blob = new Blob(
                                [JSON.stringify(realData, null, 2)],
                                { type: "application/json" }
                              );
                              const url = URL.createObjectURL(blob);
                              const a = document.createElement("a");
                              a.href = url;
                              a.download = `report-${reportId || "data"}.json`;
                              document.body.appendChild(a);
                              a.click();
                              setTimeout(() => {
                                document.body.removeChild(a);
                                URL.revokeObjectURL(url);
                              }, 0);
                            }
                          }}
                          title="Download JSON"
                          tabIndex={-1}
                        >
                          <DownloadIcon size={16} className="text-gray-600" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Download JSON</TooltipContent>
                    </Tooltip>
                  </>
                }
              >
                <div className="max-w-full overflow-hidden">
                  <div className="overflow-x-auto overflow-y-hidden">
                    <pre className="text-xs text-gray-500 whitespace-pre font-mono block max-w-none">
                      {realData
                        ? JSON.stringify(realData, null, 2)
                        : "Waiting for webhook data..."}
                    </pre>
                  </div>
                </div>
              </AccordionSection>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

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
  DollarSign,
  Globe,
  Home,
  Scale,
  Search,
  Shield,
  User,
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

interface ReportDocumentProps {
  reportId?: string;
}

export function ReportDocument({ reportId }: ReportDocumentProps) {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingReport, setProcessingReport] = useState(false);
  const [pollingAttempt, setPollingAttempt] = useState(0);
  const [maxPollingAttempts] = useState(15);
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
  const [approvedSections, setApprovedSections] = useState<
    Record<string, boolean>
  >({});

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

          // Poll every 30 seconds until we get data, max 10 attempts
          const pollForData = async () => {
            setPollingAttempt((prev) => prev + 1);

            try {
              const response = await fetch(
                `https://ezpzagents.app.n8n.cloud/webhook/b84ee335-266e-4732-b52f-3ae2c03e60ee?execution_id=${reportId}`
              );

              if (response.ok) {
                const realData = await response.json();
                const transformedData = transformWebhookDataToReportData(
                  realData,
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
              setTimeout(pollForData, 30000); // 30 seconds
            } else {
              console.error(
                "Max polling attempts reached. Investigation may still be processing."
              );
              // Keep dummy data but stop processing indicator
              setProcessingReport(false);
            }
          };

          // Start polling after 30 seconds
          setTimeout(pollForData, 30000);
        } else {
          // This is an existing report - load normally
          const data = await loadReportData(reportId);
          setReportData(data);
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
    if (!reportData) return;

    const updates = { [field]: value };
    const updatedReport = updateReportSection(reportData, sectionId, updates);

    setReportData(updatedReport);
    await saveReportData(updatedReport);
  };

  return (
    <ScrollArea className="h-screen overflow-y-scroll">
      <div className="bg-[#F4F3EC]">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none z-0">
          <div className="transform rotate-45 text-black text-9xl font-bold">
            CLASSIFIED
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-6">
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
                <h2 className="mb-2 text-lg font-medium text-gray-900">
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
                approvedSections={approvedSections}
                toggleSection={toggleSection}
                handleApprovalToggle={handleApprovalToggle}
                handleRefresh={handleRefresh}
                handleEdit={handleEdit}
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
                approvedSections={approvedSections}
                toggleSection={toggleSection}
                handleApprovalToggle={handleApprovalToggle}
                handleRefresh={handleRefresh}
                handleEdit={handleEdit}
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
                approvedSections={approvedSections}
                toggleSection={toggleSection}
                handleApprovalToggle={handleApprovalToggle}
                handleRefresh={handleRefresh}
                handleEdit={handleEdit}
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
                approvedSections={approvedSections}
                toggleSection={toggleSection}
                handleApprovalToggle={handleApprovalToggle}
                handleRefresh={handleRefresh}
                handleEdit={handleEdit}
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
                approvedSections={approvedSections}
                toggleSection={toggleSection}
                handleApprovalToggle={handleApprovalToggle}
                handleRefresh={handleRefresh}
                handleEdit={handleEdit}
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
                approvedSections={approvedSections}
                toggleSection={toggleSection}
                handleApprovalToggle={handleApprovalToggle}
                handleRefresh={handleRefresh}
                handleEdit={handleEdit}
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
                approvedSections={approvedSections}
                toggleSection={toggleSection}
                handleApprovalToggle={handleApprovalToggle}
                handleRefresh={handleRefresh}
                handleEdit={handleEdit}
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
              {/* JSON   */}
              <AccordionSection
                sectionId="json"
                title="JSON"
                icon={Search}
                creditCost={2.7}
                reportData={reportData}
                openSections={openSections}
                editingSections={editingSections}
                refreshingSections={refreshingSections}
                approvedSections={approvedSections}
                toggleSection={toggleSection}
                handleApprovalToggle={handleApprovalToggle}
                handleRefresh={handleRefresh}
                handleEdit={handleEdit}
              >
                <pre className="text-xs text-gray-500">
                  {JSON.stringify(reportData, null, 2)}
                </pre>
              </AccordionSection>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Shield,
  Share2,
  Lock,
  Settings,
  ChevronDown,
  ChevronUp,
  User,
  Globe,
  DollarSign,
  Building2,
  Home,
  Scale,
  Search,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
} from "lucide-react";
import {
  loadReportData,
  updateReportSection,
  saveReportData,
} from "@/lib/report-loader";
import { ReportData } from "@/lib/report-data";
import type { LucideIcon } from "lucide-react";

// Import section components
import { SectionFooter } from "./report/section-footer";
import { PersonalInformationSection } from "./report/personal-information-section";
import { SocialMediaSection } from "./report/social-media-section";
import { FinancialAssetsSection } from "./report/financial-assets-section";
import { BusinessInterestsSection } from "./report/business-interests-section";
import { PropertyHoldingsSection } from "./report/property-holdings-section";
import { LegalRecordsSection } from "./report/legal-records-section";
import { OnlinePresenceSection } from "./report/online-presence-section";
import { ReportPDFExport } from "./report/pdf-export";

interface ReportDocumentProps {
  reportId?: string;
}

export function ReportDocument({ reportId }: ReportDocumentProps) {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingReport, setProcessingReport] = useState(false);
  const [loadingRealData, setLoadingRealData] = useState(false);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
            setPollingAttempt(prev => prev + 1);
            setLoadingRealData(true);
            console.log(reportId)
            try {
              const response = await fetch(
                `https://ezpzagents.app.n8n.cloud/webhook-test/b84ee335-266e-4732-b52f-3ae2c03e60ee?execution_id=${reportId}`
              );
              
              if (response.ok) {
                const realData = await response.json();
                const transformedData = transformWebhookDataToReportData(realData, reportId);
                setReportData(transformedData);
                setProcessingReport(false);
                setLoadingRealData(false);
                return; // Success - stop polling
              } else {
                console.log(`Attempt ${pollingAttempt + 1}/${maxPollingAttempts}: Data not ready yet`);
              }
            } catch (error) {
              console.log(`Attempt ${pollingAttempt + 1}/${maxPollingAttempts}: Error fetching data:`, error);
            }
            
            setLoadingRealData(false);
            
            // If we haven't reached max attempts, schedule next poll
            if (pollingAttempt < maxPollingAttempts - 1) {
              setTimeout(pollForData, 30000); // 30 seconds
            } else {
              console.error("Max polling attempts reached. Investigation may still be processing.");
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

  const AccordionSection = ({
    sectionId,
    title,
    icon: Icon,
    children,
    creditCost = 2.1,
  }: {
    sectionId: string;
    title: string;
    icon: LucideIcon;
    children: React.ReactNode;
    creditCost?: number;
  }) => {
    const isOpen = openSections[sectionId];
    const isEditing = editingSections[sectionId];
    const isRefreshing = refreshingSections[sectionId];
    const isApproved = approvedSections[sectionId];
    const section =
      reportData?.sections[sectionId as keyof typeof reportData.sections];
    const bibliography = section?.bibliography || [];

    return (
      <div className="mb-3 bg-white border border-gray-200 rounded-lg">
        <button
          onClick={() => toggleSection(sectionId)}
          className="flex items-center justify-between w-full p-4 transition-colors hover:bg-gray-50"
        >
          <div className="flex items-center space-x-2">
            <Icon className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-gray-900">{title}</h3>
            {section?.hasData && (
              <Badge variant="secondary" className="text-xs">
                Data Available
              </Badge>
            )}
          </div>
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {isOpen && (
          <div className="px-4 pb-4">
            <div className="mb-3">{children}</div>

            <SectionFooter
              sectionId={sectionId}
              creditCost={creditCost}
              bibliography={bibliography}
              isRefreshing={isRefreshing || false}
              isEditing={isEditing || false}
              isApproved={isApproved || false}
              onRefresh={handleRefresh}
              onEdit={handleEdit}
              onApprovalToggle={handleApprovalToggle}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <ScrollArea className="h-full">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none z-0">
          <div className="transform rotate-45 text-black text-9xl font-bold">
            CLASSIFIED
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-6">
          {/* Processing Banner */}
          {processingReport && (
            <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    {loadingRealData ? "Checking for Updates..." : "Investigation in Progress"}
                  </h3>
                  <p className="text-sm text-blue-700">
                    {loadingRealData 
                      ? `Polling for data (Attempt ${pollingAttempt}/${maxPollingAttempts})...` 
                      : "AI agents are gathering intelligence. Data will be refreshed automatically."}
                  </p>
                  {pollingAttempt > 0 && (
                    <div className="mt-2">
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${(pollingAttempt / maxPollingAttempts) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-blue-600 mt-1">
                        Next check in 30 seconds... (Max wait: {Math.max(0, (maxPollingAttempts - pollingAttempt) * 0.5)} minutes)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="mb-6 border-b border-gray-200 pb-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <Shield size={20} className="text-gray-400" />
                <div>
                  <h1 className="text-sm font-medium text-gray-900">
                    INTELLIGENCE BRIEFING
                  </h1>
                  <p className="text-xs text-gray-500">
                    Case: {reportData.caseNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                {/* Collaborators */}
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center">
                    <span className="text-xs">A</span>
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center">
                    <span className="text-xs">B</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Share2 size={16} className="text-gray-600" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Lock size={16} className="text-gray-600" />
                  </Button>
                  <ReportPDFExport reportData={reportData} />
                  <Button variant="ghost" size="sm">
                    <Settings size={16} className="text-gray-600" />
                  </Button>
                </div>

                <div className="text-right">
                  <div className="inline-block bg-red-50 text-red-700 px-2 py-0.5 text-xs font-medium rounded">
                    {reportData.classification}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(reportData.dateGenerated).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Subject Information */}
          <div className="mb-6">
            <div className="flex gap-6 mb-6">
              <div className="flex-grow">
                <h2 className="mb-2 text-lg font-medium text-gray-900">
                  {reportData.targetName}
                </h2>
                <div className="flex gap-3 mb-2">
                  <Twitter size={16} className="text-gray-700" />
                  <Linkedin size={16} className="text-gray-700" />
                  <Facebook size={16} className="text-gray-300" />
                  <Instagram size={16} className="text-gray-700" />
                </div>
                <p className="text-sm text-gray-600">
                  Investigation in progress -{" "}
                  {reportData.overallProgress ?? "0"}% complete
                </p>
              </div>
              <div className="w-28 h-36 bg-gray-200 rounded-lg border border-gray-200 flex items-center justify-center">
                <User className="h-12 w-12 text-gray-400" />
              </div>
            </div>

            {/* Report Sections */}
            <div className="space-y-3">
              {/* Personal Information */}
              <AccordionSection
                sectionId="personal"
                title="Personal Information"
                icon={User}
                creditCost={2.1}
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
              >
                <SocialMediaSection profiles={reportData.socialMediaProfiles} />
              </AccordionSection>

              {/* Financial Assets */}
              <AccordionSection
                sectionId="financial"
                title="Financial Assets"
                icon={DollarSign}
                creditCost={4.1}
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
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 mt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              This document contains sensitive information and is intended for
              authorized personnel only.
            </p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs font-medium text-gray-900">
                {reportData.classification}
              </p>
              <p className="text-xs text-gray-500">Page 1 of 1</p>
            </div>
          </div>
        </div>

        {/* Classification marks */}
        <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
      </div>
    </ScrollArea>
  );
}

// Helper function to create dummy report data
function createDummyReport(reportId: string): ReportData {
  const caseNumber = `${new Date().getFullYear()}-${String(
    Math.floor(Math.random() * 1000)
  ).padStart(3, "0")}`;

  return {
    id: reportId,
    caseNumber,
    classification: "CONFIDENTIAL",
    targetName: "Processing...",
    targetEmail: null,
    targetLinkedIn: null,
    dateGenerated: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    status: "in-progress",
    overallProgress: 0,
    agentsCompleted: 0,
    agentsTotal: 11,

    personalInformation: {
      dob: null,
      nationality: null,
      aliases: [],
      currentLocation: null,
      education: null,
      languages: [],
    },

    socialMediaProfiles: [],

    financialAssets: {
      netWorth: null,
      bankAccounts: null,
      investments: null,
      cryptoHoldings: null,
      offshoreAccounts: null,
      annualIncome: null,
    },

    businessInterests: [],
    propertyHoldings: [],

    legalRecords: {
      criminalRecord: null,
      activeLawsuits: null,
      regulatoryViolations: null,
      civilCases: null,
      bankruptcies: null,
      judgments: null,
    },

    onlinePresence: {
      socialMedia: null,
      emailAccounts: null,
      digitalFootprint: null,
      communicationMethods: null,
      websites: null,
      domains: null,
    },

    sections: {
      personalInformation: {
        id: "personal",
        title: "Personal Information",
        hasData: false,
        lastUpdated: null,
        agentStatus: "running",
        bibliography: [],
      },
      socialMedia: {
        id: "social",
        title: "Social Media Intelligence",
        hasData: false,
        lastUpdated: null,
        agentStatus: "running",
        bibliography: [],
      },
      financial: {
        id: "financial",
        title: "Financial Assets",
        hasData: false,
        lastUpdated: null,
        agentStatus: "idle",
        bibliography: [],
      },
      business: {
        id: "business",
        title: "Business Interests",
        hasData: false,
        lastUpdated: null,
        agentStatus: "idle",
        bibliography: [],
      },
      property: {
        id: "property",
        title: "Property Holdings",
        hasData: false,
        lastUpdated: null,
        agentStatus: "idle",
        bibliography: [],
      },
      legal: {
        id: "legal",
        title: "Legal & Litigation",
        hasData: false,
        lastUpdated: null,
        agentStatus: "idle",
        bibliography: [],
      },
      online: {
        id: "online",
        title: "Online Presence",
        hasData: false,
        lastUpdated: null,
        agentStatus: "idle",
        bibliography: [],
      },
    },
  };
}

// Helper function to transform webhook data to ReportData format
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformWebhookDataToReportData(webhookData: any, reportId: string): ReportData {
  const caseNumber = `${new Date().getFullYear()}-${String(
    Math.floor(Math.random() * 1000)
  ).padStart(3, "0")}`;

  // Extract data from the webhook response
  const aiSummary = webhookData.ai_summary || {};
  const personalInfo = aiSummary.personal_info || {};
  const socialMedia = aiSummary.social_media || {};
  const education = aiSummary.education || [];
  const languages = aiSummary.languages || {};

  // Extract basic info from raw data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawLinkedInData = webhookData.raw_data?.find((item: any) => item.source === "linkedin");
  const basicInfo = rawLinkedInData?.basic_info || {};

  // Transform social media profiles
  const socialMediaProfiles = [];
  
  // Add LinkedIn profile
  if (socialMedia.LinkedIn?.handle) {
    socialMediaProfiles.push({
      platform: "LinkedIn",
      handle: socialMedia.LinkedIn.handle,
      url: `https://linkedin.com/in/${socialMedia.LinkedIn.handle}`,
      followers: socialMedia.LinkedIn.followers || null,
      verified: false,
      lastActive: socialMedia.LinkedIn.last_active || null,
      profileImage: null,
    });
  }

  // Add Twitter profile
  if (socialMedia.Twitter?.handle) {
    socialMediaProfiles.push({
      platform: "Twitter",
      handle: socialMedia.Twitter.handle,
      url: `https://twitter.com/${socialMedia.Twitter.handle}`,
      followers: socialMedia.Twitter.followers || null,
      verified: false,
      lastActive: socialMedia.Twitter.last_active || null,
      profileImage: null,
    });
  }

  // Add Instagram profile
  if (socialMedia.Instagram?.handle) {
    socialMediaProfiles.push({
      platform: "Instagram",
      handle: socialMedia.Instagram.handle,
      url: `https://instagram.com/${socialMedia.Instagram.handle}`,
      followers: socialMedia.Instagram.followers || null,
      verified: false,
      lastActive: socialMedia.Instagram.last_active || null,
      profileImage: null,
    });
  }

  return {
    id: reportId,
    caseNumber,
    classification: "CONFIDENTIAL",
    targetName: basicInfo.fullname || personalInfo.known_aliases?.[0] || "Unknown",
    targetEmail: null,
    targetLinkedIn: socialMedia.LinkedIn?.handle ? `https://linkedin.com/in/${socialMedia.LinkedIn.handle}` : null,
    dateGenerated: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    status: "completed",
    overallProgress: 100,
    agentsCompleted: 7,
    agentsTotal: 11,

    personalInformation: {
      dob: personalInfo.dob || null,
      nationality: personalInfo.nationality?.[0] || null,
      aliases: personalInfo.known_aliases || [],
      currentLocation: personalInfo.current_location?.[0] || null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      education: education.map((edu: any) => `${edu.degree} - ${edu.institution} (${edu.year})`).join(", ") || null,
      languages: Object.keys(languages).filter(lang => languages[lang]) || [],
    },

    socialMediaProfiles,

    financialAssets: {
      netWorth: null,
      bankAccounts: null,
      investments: null,
      cryptoHoldings: null,
      offshoreAccounts: null,
      annualIncome: null,
    },

    businessInterests: [],
    propertyHoldings: [],

    legalRecords: {
      criminalRecord: null,
      activeLawsuits: null,
      regulatoryViolations: null,
      civilCases: null,
      bankruptcies: null,
      judgments: null,
    },

    onlinePresence: {
      socialMedia: socialMediaProfiles.length > 0 ? "Active on multiple platforms" : null,
      emailAccounts: null,
      digitalFootprint: personalInfo.travel || null,
      communicationMethods: null,
      websites: null,
      domains: null,
    },

    sections: {
      personalInformation: {
        id: "personal",
        title: "Personal Information",
        hasData: true,
        lastUpdated: new Date().toISOString(),
        agentStatus: "completed",
        bibliography: [],
      },
      socialMedia: {
        id: "social",
        title: "Social Media Intelligence",
        hasData: socialMediaProfiles.length > 0,
        lastUpdated: new Date().toISOString(),
        agentStatus: "completed",
        bibliography: [],
      },
      financial: {
        id: "financial",
        title: "Financial Assets",
        hasData: false,
        lastUpdated: null,
        agentStatus: "completed",
        bibliography: [],
      },
      business: {
        id: "business",
        title: "Business Interests",
        hasData: false,
        lastUpdated: null,
        agentStatus: "completed",
        bibliography: [],
      },
      property: {
        id: "property",
        title: "Property Holdings",
        hasData: false,
        lastUpdated: null,
        agentStatus: "completed",
        bibliography: [],
      },
      legal: {
        id: "legal",
        title: "Legal & Litigation",
        hasData: false,
        lastUpdated: null,
        agentStatus: "completed",
        bibliography: [],
      },
      online: {
        id: "online",
        title: "Online Presence",
        hasData: true,
        lastUpdated: new Date().toISOString(),
        agentStatus: "completed",
        bibliography: [],
      },
    },
  };
}

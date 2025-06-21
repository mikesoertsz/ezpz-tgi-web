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
        const data = await loadReportData(reportId);
        setReportData(data);
      }
      setLoading(false);
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

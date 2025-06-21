import React, { useState } from "react";
import Image from "next/image";
import Accordion from "@/components/report/accordion";
import DocumentPage from "@/components/DocumentPage";
import ReportHeader from "@/components/ReportHeader";
import TeamManagementModal from "@/components/TeamManagementModal";
import { SocialMediaSection } from "@/components/report/social-media-section";
import { PersonalInformationSection } from "@/components/report/personal-information-section";
import { FinancialAssetsSection } from "@/components/report/financial-assets-section";
import { BusinessInterestsSection } from "@/components/report/business-interests-section";
import { PropertyHoldingsSection } from "@/components/report/property-holdings-section";
import { LegalRecordsSection } from "@/components/report/legal-records-section";
import { OnlinePresenceSection } from "@/components/report/online-presence-section";
import reportData from "@/data/reports/report-1.json";
import { ReportData } from "@/lib/report-data";

interface BibliographyItem {
  id: string;
  source: string;
  url?: string;
  type: "url" | "document" | "database";
}

type SectionKey =
  | "personal"
  | "socialMedia"
  | "financial"
  | "business"
  | "property"
  | "legal"
  | "online";

const IntelligenceBriefing: React.FC = () => {
  // Use the imported JSON as the initial data
  const [personData, setPersonData] = useState<ReportData>(
    reportData as ReportData
  );
  const [showTeamManagement, setShowTeamManagement] = useState(false);
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>(
    {
      personal: true,
      socialMedia: false,
      financial: false,
      business: false,
      property: false,
      legal: false,
      online: false,
    }
  );
  const [approvedSections, setApprovedSections] = useState<
    Record<string, boolean>
  >({});
  const [refreshingSections, setRefreshingSections] = useState<
    Record<string, boolean>
  >({});
  const [editingSections, setEditingSections] = useState<
    Record<string, boolean>
  >({});
  const [creditCosts] = useState<Record<SectionKey, number>>({
    personal: Math.round((Math.random() * 3 + 1) * 10) / 10,
    socialMedia: Math.round((Math.random() * 3 + 1) * 10) / 10,
    financial: Math.round((Math.random() * 3 + 1) * 10) / 10,
    business: Math.round((Math.random() * 3 + 1) * 10) / 10,
    property: Math.round((Math.random() * 3 + 1) * 10) / 10,
    legal: Math.round((Math.random() * 3 + 1) * 10) / 10,
    online: Math.round((Math.random() * 3 + 1) * 10) / 10,
  });

  // Bibliography data for each section (move to a separate file if needed)
  const bibliographies: Record<SectionKey, BibliographyItem[]> = {
    personal: [
      {
        id: "linkedin-profile",
        source: "LinkedIn Profile",
        url: "https://linkedin.com/in/alexander-mercer",
        type: "url",
      },
      {
        id: "passport-records",
        source: "US Passport Records Database",
        type: "database",
      },
      {
        id: "university-records",
        source: "Harvard Business School Alumni Directory",
        url: "https://hbs.edu/alumni",
        type: "url",
      },
      { id: "mit-records", source: "MIT Alumni Database", type: "database" },
    ],
    socialMedia: [
      {
        id: "twitter-api",
        source: "Twitter API Data",
        url: "https://twitter.com/alexmercer_nyc",
        type: "url",
      },
      {
        id: "linkedin-scrape",
        source: "LinkedIn",
        url: "https://linkedin.com/in/alexander-mercer-consulting",
        type: "url",
      },
      {
        id: "facebook-osint",
        source: "Facebook",
        url: "https://facebook.com/Alexander.J.Mercer",
        type: "url",
      },
      {
        id: "instagram-posts",
        source: "Instagram",
        url: "https://instagram.com/amercer_global",
        type: "url",
      },
    ],
    financial: [
      {
        id: "sec-filings",
        source: "SEC Filing 10-K Forms",
        url: "https://sec.gov/edgar",
        type: "url",
      },
      {
        id: "bank-statements",
        source: "Financial Institution Reports",
        type: "document",
      },
      {
        id: "crypto-wallets",
        source: "Blockchain Analysis Report",
        type: "document",
      },
      {
        id: "offshore-leaks",
        source: "Panama Papers Database",
        url: "https://offshoreleaks.icij.org",
        type: "url",
      },
    ],
    business: [
      {
        id: "corp-filings",
        source: "Delaware Corporate Registry",
        url: "https://corp.delaware.gov",
        type: "url",
      },
      {
        id: "uk-companies",
        source: "UK Companies House",
        url: "https://companieshouse.gov.uk",
        type: "url",
      },
      {
        id: "annual-reports",
        source: "Company Annual Reports",
        type: "document",
      },
      {
        id: "board-minutes",
        source: "Board Meeting Minutes",
        type: "document",
      },
    ],
    property: [
      {
        id: "nyc-records",
        source: "NYC Property Records",
        url: "https://nyc.gov/property",
        type: "url",
      },
      {
        id: "uk-land-registry",
        source: "UK Land Registry",
        url: "https://landregistry.gov.uk",
        type: "url",
      },
      {
        id: "dubai-property",
        source: "Dubai Land Department",
        type: "database",
      },
      {
        id: "trust-documents",
        source: "Family Trust Documentation",
        type: "document",
      },
    ],
    legal: [
      {
        id: "court-records",
        source: "Federal Court Records",
        url: "https://pacer.gov",
        type: "url",
      },
      {
        id: "sec-enforcement",
        source: "SEC Enforcement Actions",
        url: "https://sec.gov/enforce",
        type: "url",
      },
      {
        id: "swiss-investigation",
        source: "Swiss Federal Prosecutor Files",
        type: "document",
      },
      { id: "civil-suits", source: "State Court Filings", type: "database" },
    ],
    online: [
      { id: "social-media", source: "Social Media Platforms", type: "url" },
      {
        id: "domain-records",
        source: "WHOIS Database",
        url: "https://whois.net",
        type: "url",
      },
      {
        id: "email-headers",
        source: "Email Metadata Analysis",
        type: "document",
      },
      {
        id: "digital-forensics",
        source: "Digital Forensics Report",
        type: "document",
      },
    ],
  };

  const toggleSection = (id: SectionKey) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleApprovalToggle = (sectionId: string) => {
    setApprovedSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const handleRefresh = (sectionId: string) => {
    setRefreshingSections((prev) => ({ ...prev, [sectionId]: true }));
    const duration = Math.random() * 2000 + 3000;
    setTimeout(() => {
      setRefreshingSections((prev) => ({ ...prev, [sectionId]: false }));
    }, duration);
  };

  const handleEdit = (sectionId: string) => {
    setEditingSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  // Only used for editable sections
  const handleSaveField = (field: string, value: unknown, section?: string) => {
    setPersonData((prev: ReportData) => {
      const newData: ReportData = { ...prev };
      if (section === "financialAssets") {
        newData.financialAssets = {
          ...newData.financialAssets,
          [field]: value,
        };
      } else if (section === "legal") {
        newData.legalRecords = { ...newData.legalRecords, [field]: value };
      } else if (section === "onlinePresence") {
        newData.onlinePresence = { ...newData.onlinePresence, [field]: value };
      } else if (field === "aliases" || field === "languages") {
        newData.personalInformation = {
          ...newData.personalInformation,
          [field]: value,
        };
      } else {
        newData.personalInformation = {
          ...newData.personalInformation,
          [field]: value,
        };
      }
      return newData;
    });
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Main Navigation Bar */}
      {/* <Header onOpenTeamManagement={() => setShowTeamManagement(true)} /> */}
      {/* <SubNavigation /> */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Menu */}
        {/* <AppSidebar activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem} /> */}
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6">
            <DocumentPage>
              <ReportHeader
                caseNumber={personData.caseNumber}
                classification={personData.classification}
                dateCompiled={personData.dateGenerated}
              />
              <div className="mb-6">
                <div className="flex gap-6 mb-6">
                  <div className="flex-grow">
                    <h2 className="mb-2 text-lg font-medium text-gray-900">
                      {personData.targetName}
                    </h2>
                  </div>
                  <Image
                    src="/1723734329689.jpg"
                    alt="Subject"
                    className="object-cover border border-gray-200 rounded-lg w-28 h-36"
                    width={112}
                    height={144}
                  />
                </div>
                <div className="space-y-3">
                  <Accordion
                    title="Personal Information"
                    isOpen={openSections.personal}
                    onToggle={() => toggleSection("personal")}
                    sectionId="personal"
                    approvedSections={approvedSections}
                    onApprovalToggle={handleApprovalToggle}
                    bibliography={bibliographies.personal}
                    onRefresh={handleRefresh}
                    isRefreshing={refreshingSections.personal || false}
                    onEdit={handleEdit}
                    isEditing={editingSections.personal || false}
                    creditCost={creditCosts.personal}
                  >
                    <PersonalInformationSection
                      data={personData.personalInformation}
                      isEditing={editingSections.personal || false}
                      isRefreshing={refreshingSections.personal || false}
                      onSave={handleSaveField}
                    />
                  </Accordion>
                  <Accordion
                    title="Social Media"
                    isOpen={openSections.socialMedia}
                    onToggle={() => toggleSection("socialMedia")}
                    sectionId="socialMedia"
                    approvedSections={approvedSections}
                    onApprovalToggle={handleApprovalToggle}
                    bibliography={bibliographies.socialMedia}
                    onRefresh={handleRefresh}
                    isRefreshing={refreshingSections.socialMedia || false}
                    onEdit={handleEdit}
                    isEditing={editingSections.socialMedia || false}
                    creditCost={creditCosts.socialMedia}
                  >
                    <SocialMediaSection
                      profiles={personData.socialMediaProfiles || []}
                    />
                  </Accordion>
                  <Accordion
                    title="Financial Assets"
                    isOpen={openSections.financial}
                    onToggle={() => toggleSection("financial")}
                    sectionId="financial"
                    approvedSections={approvedSections}
                    onApprovalToggle={handleApprovalToggle}
                    bibliography={bibliographies.financial}
                    onRefresh={handleRefresh}
                    isRefreshing={refreshingSections.financial || false}
                    onEdit={handleEdit}
                    isEditing={editingSections.financial || false}
                    creditCost={creditCosts.financial}
                  >
                    <FinancialAssetsSection
                      data={personData.financialAssets}
                      isEditing={editingSections.financial || false}
                      isRefreshing={refreshingSections.financial || false}
                      onSave={handleSaveField}
                    />
                  </Accordion>
                  <Accordion
                    title="Business Interests"
                    isOpen={openSections.business}
                    onToggle={() => toggleSection("business")}
                    sectionId="business"
                    approvedSections={approvedSections}
                    onApprovalToggle={handleApprovalToggle}
                    bibliography={bibliographies.business}
                    onRefresh={handleRefresh}
                    isRefreshing={refreshingSections.business || false}
                    onEdit={handleEdit}
                    isEditing={editingSections.business || false}
                    creditCost={creditCosts.business}
                  >
                    <BusinessInterestsSection
                      businesses={personData.businessInterests || []}
                    />
                  </Accordion>
                  <Accordion
                    title="Property Holdings"
                    isOpen={openSections.property}
                    onToggle={() => toggleSection("property")}
                    sectionId="property"
                    approvedSections={approvedSections}
                    onApprovalToggle={handleApprovalToggle}
                    bibliography={bibliographies.property}
                    onRefresh={handleRefresh}
                    isRefreshing={refreshingSections.property || false}
                    onEdit={handleEdit}
                    isEditing={editingSections.property || false}
                    creditCost={creditCosts.property}
                  >
                    <PropertyHoldingsSection
                      properties={personData.propertyHoldings || []}
                    />
                  </Accordion>
                  <Accordion
                    title="Legal & Litigation"
                    isOpen={openSections.legal}
                    onToggle={() => toggleSection("legal")}
                    sectionId="legal"
                    approvedSections={approvedSections}
                    onApprovalToggle={handleApprovalToggle}
                    bibliography={bibliographies.legal}
                    onRefresh={handleRefresh}
                    isRefreshing={refreshingSections.legal || false}
                    onEdit={handleEdit}
                    isEditing={editingSections.legal || false}
                    creditCost={creditCosts.legal}
                  >
                    <LegalRecordsSection
                      data={personData.legalRecords}
                      isEditing={editingSections.legal || false}
                      isRefreshing={refreshingSections.legal || false}
                      onSave={handleSaveField}
                    />
                  </Accordion>
                  <Accordion
                    title="Online Presence"
                    isOpen={openSections.online}
                    onToggle={() => toggleSection("online")}
                    sectionId="online"
                    approvedSections={approvedSections}
                    onApprovalToggle={handleApprovalToggle}
                    bibliography={bibliographies.online}
                    onRefresh={handleRefresh}
                    isRefreshing={refreshingSections.online || false}
                    onEdit={handleEdit}
                    isEditing={editingSections.online || false}
                    creditCost={creditCosts.online}
                  >
                    <OnlinePresenceSection
                      data={personData.onlinePresence}
                      isEditing={editingSections.online || false}
                      isRefreshing={refreshingSections.online || false}
                      onSave={handleSaveField}
                    />
                  </Accordion>
                </div>
              </div>
              <div className="pt-4 mt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  This document contains sensitive information and is intended
                  for authorized personnel only.
                </p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs font-medium text-gray-900">
                    {personData.classification}
                  </p>
                  <p className="text-xs text-gray-500">Page 1 of 1</p>
                </div>
              </div>
            </DocumentPage>
          </div>
        </div>
      </div>
      <TeamManagementModal
        isOpen={showTeamManagement}
        onClose={() => setShowTeamManagement(false)}
      />
    </div>
  );
};

export default IntelligenceBriefing;

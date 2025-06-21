"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ReportData } from "@/lib/report-data";
import { generateReportPDF } from "@/lib/pdf-generator";

// Helper functions for PDF generation
function generatePersonalInfoContent(reportData: ReportData): string {
  const info = reportData.personalInformation;
  return `DOB: ${info.dob || "Not available"}
Nationality: ${info.nationality || "Not available"}
Known Aliases: ${info.aliases.join(", ") || "Not available"}
Current Location: ${info.currentLocation || "Not available"}
Education: ${info.education || "Not available"}
Languages: ${info.languages.join(", ") || "Not available"}`;
}

function generateSocialMediaContent(reportData: ReportData): string {
  if (reportData.socialMediaProfiles.length === 0)
    return "No social media profiles found";

  return reportData.socialMediaProfiles
    .map(
      (profile) =>
        `${profile.platform}: ${profile.handle || "Not available"} (${
          profile.followers || "Unknown"
        } followers)`
    )
    .join("\n");
}

function generateFinancialContent(reportData: ReportData): string {
  const assets = reportData.financialAssets;
  return `Net Worth: ${assets.netWorth || "Not available"}
Bank Accounts: ${assets.bankAccounts || "Not available"}
Investments: ${assets.investments || "Not available"}
Crypto Holdings: ${assets.cryptoHoldings || "Not available"}
Offshore Accounts: ${assets.offshoreAccounts || "Not available"}
Annual Income: ${assets.annualIncome || "Not available"}`;
}

function generateBusinessContent(reportData: ReportData): string {
  if (reportData.businessInterests.length === 0)
    return "No business interests found";

  return reportData.businessInterests
    .map(
      (business) =>
        `${business.name || "Unknown"} - ${business.role || "Unknown"} (${
          business.revenue || "Unknown"
        })`
    )
    .join("\n");
}

function generatePropertyContent(reportData: ReportData): string {
  if (reportData.propertyHoldings.length === 0)
    return "No property holdings found";

  return reportData.propertyHoldings
    .map(
      (property) =>
        `${property.address || "Unknown"} - ${property.type || "Unknown"} (${
          property.value || "Unknown"
        })`
    )
    .join("\n");
}

function generateLegalContent(reportData: ReportData): string {
  const legal = reportData.legalRecords;
  return `Criminal Record: ${legal.criminalRecord || "Not available"}
Active Lawsuits: ${legal.activeLawsuits || "Not available"}
Regulatory Violations: ${legal.regulatoryViolations || "Not available"}
Civil Cases: ${legal.civilCases || "Not available"}`;
}

function generateOnlinePresenceContent(reportData: ReportData): string {
  const online = reportData.onlinePresence;
  return `Social Media: ${online.socialMedia || "Not available"}
Email Accounts: ${online.emailAccounts || "Not available"}
Digital Footprint: ${online.digitalFootprint || "Not available"}
Communication Methods: ${online.communicationMethods || "Not available"}`;
}

interface ReportPDFExportProps {
  reportData: ReportData | null;
}

export function ReportPDFExport({ reportData }: ReportPDFExportProps) {
  const handleDownloadPDF = () => {
    if (!reportData) return;

    const pdfData = {
      caseNumber: reportData.caseNumber,
      classification: reportData.classification,
      targetName: reportData.targetName,
      targetEmail: reportData.targetEmail ?? undefined,
      targetLinkedIn: reportData.targetLinkedIn ?? undefined,
      dateGenerated: new Date(reportData.dateGenerated).toLocaleDateString(),
      sections: [
        {
          title: "Personal Information",
          content: generatePersonalInfoContent(reportData),
          hasData: reportData.sections.personalInformation.hasData,
        },
        {
          title: "Social Media Intelligence",
          content: generateSocialMediaContent(reportData),
          hasData: reportData.sections.socialMedia.hasData,
        },
        {
          title: "Financial Assets",
          content: generateFinancialContent(reportData),
          hasData: reportData.sections.financial.hasData,
        },
        {
          title: "Business Interests",
          content: generateBusinessContent(reportData),
          hasData: reportData.sections.business.hasData,
        },
        {
          title: "Property Holdings",
          content: generatePropertyContent(reportData),
          hasData: reportData.sections.property.hasData,
        },
        {
          title: "Legal & Litigation",
          content: generateLegalContent(reportData),
          hasData: reportData.sections.legal.hasData,
        },
        {
          title: "Online Presence",
          content: generateOnlinePresenceContent(reportData),
          hasData: reportData.sections.online.hasData,
        },
      ],
    };

    generateReportPDF(pdfData);
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleDownloadPDF}>
      <Download size={16} className="text-gray-600" />
    </Button>
  );
}

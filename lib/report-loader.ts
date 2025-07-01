import {
  ReportData,
  BusinessInterest,
  PropertyHolding,
  SocialMediaProfile,
} from "./report-data";

// Cache for loaded reports
const reportCache = new Map<string, ReportData>();

export async function loadReportData(
  reportId: string
): Promise<ReportData | null> {
  // Check cache first
  if (reportCache.has(reportId)) {
    return reportCache.get(reportId)!;
  }

  try {
    // In a real application, this would be an API call
    // For now, we'll simulate loading from JSON files
    const response = await fetch(`/data/reports/report-${reportId}.json`);

    if (!response.ok) {
      console.warn(`Report ${reportId} not found`);
      return null;
    }

    const reportData: ReportData = await response.json();

    // Cache the loaded report
    reportCache.set(reportId, reportData);

    return reportData;
  } catch (error) {
    console.error(`Error loading report ${reportId}:`, error);
    return null;
  }
}

export async function saveReportData(reportData: ReportData): Promise<boolean> {
  try {
    // In a real application, this would be an API call to save the data
    // For now, we'll just update the cache and simulate success
    reportCache.set(reportData.id, reportData);

    console.log(`Report ${reportData.id} saved successfully`);
    return true;
  } catch (error) {
    console.error(`Error saving report ${reportData.id}:`, error);
    return false;
  }
}

export function updateReportSection(
  reportData: ReportData,
  sectionId: string,
  updates: Partial<Record<string, unknown>>
): ReportData {
  const updatedReport = { ...reportData };

  // Update the section data
  switch (sectionId) {
    case "personal":
      updatedReport.personalInformation = {
        ...updatedReport.personalInformation,
        ...updates,
      };
      break;
    case "social":
      if (updates.profiles) {
        updatedReport.socialMediaProfiles =
          updates.profiles as SocialMediaProfile[];
      }
      break;
    case "financial":
      updatedReport.financialAssets = {
        ...updatedReport.financialAssets,
        ...updates,
      };
      break;
    case "business":
      if (updates.interests) {
        updatedReport.businessInterests =
          updates.interests as BusinessInterest[];
      }
      break;
    case "property":
      if (updates.holdings) {
        updatedReport.propertyHoldings = updates.holdings as PropertyHolding[];
      }
      break;
    case "legal":
      updatedReport.legalRecords = {
        ...updatedReport.legalRecords,
        ...updates,
      };
      break;
    case "online":
      updatedReport.onlinePresence = {
        ...updatedReport.onlinePresence,
        ...updates,
      };
      break;
  }

  // Update section metadata
  if (
    updatedReport.sections[sectionId as keyof typeof updatedReport.sections]
  ) {
    const section =
      updatedReport.sections[sectionId as keyof typeof updatedReport.sections];
    if (section) {
      section.lastUpdated = new Date().toISOString();
      section.hasData = true;
    }
  }

  // Update overall report metadata
  updatedReport.lastUpdated = new Date().toISOString();

  return updatedReport;
}

export function createEmptyReport(
  targetName: string,
  targetEmail?: string
): ReportData {
  const reportId = Date.now().toString();
  const caseNumber = `${new Date().getFullYear()}-${String(
    Math.floor(Math.random() * 1000)
  ).padStart(3, "0")}`;

  return {
    id: reportId,
    caseNumber,
    classification: "CONFIDENTIAL",
    targetName,
    targetEmail: targetEmail || null,
    targetLinkedIn: null,
    dateGenerated: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    status: "draft",
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
        agentStatus: "idle",
        bibliography: [],
      },
      socialMedia: {
        id: "social",
        title: "Social Media Intelligence",
        hasData: false,
        lastUpdated: null,
        agentStatus: "idle",
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

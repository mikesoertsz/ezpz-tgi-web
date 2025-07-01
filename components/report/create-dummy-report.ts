import { ReportData } from "@/lib/report-data";

// Local type for createDummyReport
export type CreateDummyReportArgs = { reportId: string };

export function createDummyReport(reportId: string): ReportData {
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

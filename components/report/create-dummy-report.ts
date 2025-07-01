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

    images: {
      images: [
        {
          url: "https://placekitten.com/400/400",
          caption: "Kitten 1 (Square)",
          date: "2024-01-01",
        },
        {
          url: "https://placekitten.com/401/401",
          caption: "Kitten 2 (Square)",
          date: "2024-01-02",
        },
        {
          url: "https://placekitten.com/402/402",
          caption: "Kitten 3 (Square)",
          date: "2024-01-03",
        },
        {
          url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
          caption: "Unsplash Forest",
          date: "2024-01-04",
        },
        {
          url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
          caption: "Unsplash Mountain",
          date: "2024-01-05",
        },
      ],
    },

    sections: {
      personalInformation: {
        id: "personalInformation",
        title: "Personal Information",
        hasData: true,
        lastUpdated: new Date().toISOString(),
        agentStatus: "completed",
        bibliography: [],
      },
      socialMedia: {
        id: "socialMedia",
        title: "Social Media Intelligence",
        hasData: true,
        lastUpdated: new Date().toISOString(),
        agentStatus: "completed",
        bibliography: [],
      },
      financial: {
        id: "financial",
        title: "Financial Assets",
        hasData: true,
        lastUpdated: new Date().toISOString(),
        agentStatus: "completed",
        bibliography: [],
      },
      business: {
        id: "business",
        title: "Business Interests",
        hasData: true,
        lastUpdated: new Date().toISOString(),
        agentStatus: "completed",
        bibliography: [],
      },
      property: {
        id: "property",
        title: "Property Holdings",
        hasData: true,
        lastUpdated: new Date().toISOString(),
        agentStatus: "completed",
        bibliography: [],
      },
      legal: {
        id: "legal",
        title: "Legal & Litigation",
        hasData: true,
        lastUpdated: new Date().toISOString(),
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
      images: {
        id: "images",
        title: "Images",
        hasData: true,
        lastUpdated: new Date().toISOString(),
        agentStatus: "completed",
        bibliography: [],
      },
    },
  };
}

import { ReportData } from "@/lib/report-data";

// Local type for webhookData argument
export type WebhookData = {
  ai_summary?: {
    personal_info?: {
      dob?: string;
      nationality?: string[];
      known_aliases?: string[];
      current_location?: string[];
      travel?: string;
    };
    social_media?: {
      LinkedIn?: {
        handle?: string;
        followers?: string;
        last_active?: string;
      };
      Twitter?: {
        handle?: string;
        followers?: string;
        last_active?: string;
      };
      Instagram?: {
        handle?: string;
        followers?: string;
        last_active?: string;
      };
    };
    education?: { degree: string; institution: string; year: string }[];
    languages?: { [lang: string]: boolean };
  };
  raw_data?: {
    source: string;
    basic_info?: {
      fullname?: string;
    };
  }[];
};

export function transformWebhookDataToReportData(
  webhookData: WebhookData,
  reportId: string
): ReportData {
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
  const rawLinkedInData = (webhookData.raw_data || []).find(
    (item) => item.source === "linkedin"
  );
  const basicInfo = rawLinkedInData?.basic_info || {};

  // Transform social media profiles
  const socialMediaProfiles: {
    platform: string;
    handle: string;
    url: string;
    followers: string | null;
    verified: boolean;
    lastActive: string | null;
    profileImage: string | null;
  }[] = [];

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
    targetName:
      basicInfo.fullname || personalInfo.known_aliases?.[0] || "Unknown",
    targetEmail: null,
    targetLinkedIn: socialMedia.LinkedIn?.handle
      ? `https://linkedin.com/in/${socialMedia.LinkedIn.handle}`
      : null,
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
      education:
        education
          .map((edu) => `${edu.degree} - ${edu.institution} (${edu.year})`)
          .join(", ") || null,
      languages: Object.keys(languages).filter((lang) => languages[lang]) || [],
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
      socialMedia:
        socialMediaProfiles.length > 0 ? "Active on multiple platforms" : null,
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

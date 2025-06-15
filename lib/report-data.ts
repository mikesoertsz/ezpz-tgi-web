export interface PersonalInformation {
  dob: string | null
  nationality: string | null
  aliases: string[]
  currentLocation: string | null
  education: string | null
  languages: string[]
}

export interface SocialMediaProfile {
  platform: string
  handle: string | null
  url: string | null
  followers: string | null
  lastActive: string | null
  verified: boolean
  profileImage: string | null
}

export interface FinancialAssets {
  netWorth: string | null
  bankAccounts: string | null
  investments: string | null
  cryptoHoldings: string | null
  offshoreAccounts: string | null
  annualIncome: string | null
}

export interface BusinessInterest {
  name: string | null
  role: string | null
  location: string | null
  revenue: string | null
  ownership: string | null
  founded: string | null
}

export interface PropertyHolding {
  address: string | null
  type: string | null
  value: string | null
  ownership: string | null
  purchaseDate: string | null
  mortgageInfo: string | null
}

export interface LegalRecord {
  criminalRecord: string | null
  activeLawsuits: string | null
  regulatoryViolations: string | null
  civilCases: string | null
  bankruptcies: string | null
  judgments: string | null
}

export interface OnlinePresence {
  socialMedia: string | null
  emailAccounts: string | null
  digitalFootprint: string | null
  communicationMethods: string | null
  websites: string | null
  domains: string | null
}

export interface BibliographySource {
  id: string
  source: string
  url?: string
  type: 'url' | 'document' | 'database'
  accessDate: string
  reliability: 'high' | 'medium' | 'low'
}

export interface ReportSection {
  id: string
  title: string
  hasData: boolean
  lastUpdated: string | null
  agentStatus: 'idle' | 'running' | 'completed' | 'error'
  bibliography: BibliographySource[]
}

export interface ReportData {
  // Report metadata
  id: string
  caseNumber: string
  classification: string
  targetName: string
  targetEmail: string | null
  targetLinkedIn: string | null
  dateGenerated: string
  lastUpdated: string
  status: 'draft' | 'in-progress' | 'completed' | 'archived'
  
  // Investigation progress
  overallProgress: number
  agentsCompleted: number
  agentsTotal: number
  
  // Data sections
  personalInformation: PersonalInformation
  socialMediaProfiles: SocialMediaProfile[]
  financialAssets: FinancialAssets
  businessInterests: BusinessInterest[]
  propertyHoldings: PropertyHolding[]
  legalRecords: LegalRecord
  onlinePresence: OnlinePresence
  
  // Section metadata
  sections: {
    personalInformation: ReportSection
    socialMedia: ReportSection
    financial: ReportSection
    business: ReportSection
    property: ReportSection
    legal: ReportSection
    online: ReportSection
  }
}

// Helper function to check if a value is empty/null
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

// Helper function to format display value
export function formatDisplayValue(value: any, fallback: string = 'Not available'): string {
  if (isEmpty(value)) return fallback
  if (Array.isArray(value)) return value.filter(v => !isEmpty(v)).join(', ') || fallback
  return String(value)
}

// Helper function to calculate section completion
export function calculateSectionCompletion(sectionData: any): number {
  if (!sectionData) return 0
  
  const fields = Object.values(sectionData)
  const filledFields = fields.filter(field => !isEmpty(field))
  
  return Math.round((filledFields.length / fields.length) * 100)
}

// Helper function to determine if section has data
export function sectionHasData(sectionData: any): boolean {
  if (!sectionData) return false
  
  if (Array.isArray(sectionData)) {
    return sectionData.some(item => 
      Object.values(item).some(value => !isEmpty(value))
    )
  }
  
  return Object.values(sectionData).some(value => !isEmpty(value))
}
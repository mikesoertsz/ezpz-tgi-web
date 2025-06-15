'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { 
  Shield, 
  Download, 
  Share2, 
  Lock, 
  Settings, 
  User, 
  Globe, 
  DollarSign, 
  Building2, 
  Home, 
  Scale, 
  Search,
  Image,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Copy,
  Trash2,
  Edit,
  CheckCircle,
  Circle,
  Coins,
  Github,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Mail,
  ExternalLink
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { generateReportPDF, sampleReportData } from "@/lib/pdf-generator"

interface BibliographyItem {
  id: string
  source: string
  url?: string
  type: 'url' | 'document' | 'database'
}

interface AccordionSectionProps {
  title: string
  icon: any
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
  isApproved?: boolean
  onApprovalToggle?: () => void
  onRefresh?: () => void
  isRefreshing?: boolean
  creditCost?: number
  hasData?: boolean
  bibliography?: BibliographyItem[]
  sectionId: string
  editingSections: Record<string, boolean>
  onEdit: (sectionId: string) => void
}

function AccordionSection({ 
  title, 
  icon: Icon, 
  isOpen, 
  onToggle, 
  children, 
  isApproved = false,
  onApprovalToggle,
  onRefresh,
  isRefreshing = false,
  creditCost = 2.5,
  hasData = false,
  bibliography = [],
  sectionId,
  editingSections,
  onEdit
}: AccordionSectionProps) {
  const [bibliographyOpen, setBibliographyOpen] = useState(false)
  const [hoveredSource, setHoveredSource] = useState<string | null>(null)
  const isEditing = editingSections[sectionId] || false

  const handleSourceClick = (item: BibliographyItem) => {
    if (item.url) {
      window.open(item.url, '_blank')
    }
  }

  return (
    <div className="mb-3 bg-white border border-gray-200 rounded-lg">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full p-4 transition-colors hover:bg-gray-50"
      >
        <div className="flex items-center space-x-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          {hasData && (
            <Badge variant="secondary" className="text-xs">
              Data Available
            </Badge>
          )}
        </div>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && (
        <div className="px-4 pb-4">
          <div className="mb-3">
            {children}
          </div>
          
          {/* Bibliography Section */}
          {bibliography.length > 0 && (
            <div className="border-t border-gray-100 pt-3 mb-3">
              <button
                onClick={() => setBibliographyOpen(!bibliographyOpen)}
                className="flex items-center space-x-2 text-xs text-gray-600 hover:text-gray-800 transition-colors"
              >
                <span>Bibliography</span>
                {bibliographyOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
              
              {bibliographyOpen && (
                <div className="mt-2 space-y-1">
                  {bibliography.map((item) => (
                    <div
                      key={item.id}
                      className={`text-xs p-2 rounded transition-colors cursor-pointer ${
                        hoveredSource === item.id 
                          ? 'bg-yellow-100 border border-yellow-300' 
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => handleSourceClick(item)}
                      onMouseEnter={() => setHoveredSource(item.id)}
                      onMouseLeave={() => setHoveredSource(null)}
                    >
                      <span className="text-gray-700">{item.source}</span>
                      {item.url && (
                        <ExternalLink className="inline ml-1 h-3 w-3 text-blue-600" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Footer with action buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <button
                  onClick={onRefresh}
                  disabled={isRefreshing}
                  className={`p-1.5 rounded-md transition-all duration-300 ${
                    isRefreshing 
                      ? 'bg-green-100 text-green-600 cursor-not-allowed' 
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  title="Refresh"
                >
                  <RefreshCw 
                    size={14} 
                    className={`${isRefreshing ? 'animate-spin text-green-600' : 'text-gray-600'} transition-colors duration-300`} 
                  />
                </button>
                <div className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-md">
                  <Coins size={10} className="text-gray-500" />
                  <span className="text-xs text-gray-600 font-medium">{creditCost}</span>
                </div>
              </div>
              <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors" title="Copy">
                <Copy size={14} className="text-gray-600" />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors" title="Clear">
                <Trash2 size={14} className="text-gray-600" />
              </button>
              <button 
                onClick={() => onEdit(sectionId)}
                className={`p-1.5 rounded-md transition-colors ${
                  isEditing 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
                title={isEditing ? "Exit Edit Mode" : "Edit"}
              >
                <Edit size={14} className={isEditing ? 'text-blue-600' : 'text-gray-600'} />
              </button>
            </div>

            <button
              onClick={onApprovalToggle}
              className={`p-1.5 rounded-md transition-colors ${
                isApproved 
                  ? 'hover:bg-green-50 text-green-600' 
                  : 'hover:bg-gray-100 text-gray-400'
              }`}
              title={isApproved ? "Content Approved" : "Approve Content"}
            >
              {isApproved ? (
                <CheckCircle size={14} className="text-green-600" />
              ) : (
                <Circle size={14} className="text-gray-400" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Editable text component
const EditableText: React.FC<{ 
  value: string; 
  isEditing: boolean; 
  onSave: (newValue: string) => void;
  className?: string;
}> = ({ value, isEditing, onSave, className = "" }) => {
  const [editValue, setEditValue] = useState(value)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    setEditValue(value)
  }, [value])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSave(editValue)
      setIsFocused(false)
    } else if (e.key === 'Escape') {
      setEditValue(value)
      setIsFocused(false)
    }
  }

  const handleBlur = () => {
    setIsFocused(false)
    if (editValue !== value) {
      onSave(editValue)
    }
  }

  if (isEditing) {
    return (
      <Input
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onKeyDown={handleKeyPress}
        onBlur={handleBlur}
        onFocus={() => setIsFocused(true)}
        className={`bg-blue-50 border border-blue-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
        style={{ minWidth: '200px' }}
      />
    )
  }

  return <span className={className}>{value}</span>
}

// Terminal-like text animation component
const TerminalText: React.FC<{ text: string; isAnimating: boolean; delay?: number }> = ({ 
  text, 
  isAnimating, 
  delay = 0 
}) => {
  const [displayText, setDisplayText] = useState(text)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsTyping(true)
        setDisplayText('')
        
        let currentIndex = 0
        const typeInterval = setInterval(() => {
          if (currentIndex < text.length) {
            setDisplayText(text.substring(0, currentIndex + 1))
            currentIndex++
          } else {
            clearInterval(typeInterval)
            setIsTyping(false)
          }
        }, 50)

        return () => clearInterval(typeInterval)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [isAnimating, text, delay])

  return (
    <span className={`${isTyping ? 'bg-blue-50' : ''} transition-colors duration-200`}>
      {displayText}
      {isTyping && <span className="animate-pulse">|</span>}
    </span>
  )
}

interface ReportDocumentProps {
  reportId?: string
}

export function ReportDocument({ reportId }: ReportDocumentProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    personal: true,
    socialMedia: false,
    financial: false,
    business: false,
    property: false,
    legal: false,
    online: false,
  })
  
  const [approvedSections, setApprovedSections] = useState<Record<string, boolean>>({})
  const [refreshingSections, setRefreshingSections] = useState<Record<string, boolean>>({})
  const [editingSections, setEditingSections] = useState<Record<string, boolean>>({})

  // Sample data for existing reports with complete information
  const [reportData, setReportData] = useState<any>(null)

  useEffect(() => {
    if (reportId) {
      // Simulate loading report data with complete information
      const sampleData = {
        1: {
          targetName: "Alexander Mercer",
          targetEmail: "alexander.mercer@example.com",
          targetLinkedIn: "linkedin.com/in/alexander-mercer",
          caseNumber: "TGI-2024-001",
          personal: {
            hasData: true,
            dob: "March 15, 1978",
            nationality: "United States (Dual citizenship with UK)",
            aliases: ["Alex Grey", "Alexander James", "A.J. Morris"],
            currentLocation: "New York, NY / London, UK (frequent travel)",
            education: "MBA, Harvard Business School (2004); BSc Computer Science, MIT (2000)",
            languages: ["English (native)", "German (fluent)", "Mandarin (conversational)", "Russian (basic)"]
          },
          socialMedia: {
            hasData: true,
            platforms: [
              {
                name: 'Twitter/X',
                handle: '@alexmercer_nyc',
                url: 'https://twitter.com/alexmercer_nyc',
                followers: '12.4K',
                lastActive: '2 hours ago',
                verified: true
              },
              {
                name: 'LinkedIn',
                handle: 'alexander-mercer-consulting',
                url: 'https://linkedin.com/in/alexander-mercer-consulting',
                followers: '8.9K',
                lastActive: '1 day ago',
                verified: true
              },
              {
                name: 'Facebook',
                handle: 'Alexander.J.Mercer',
                url: 'https://facebook.com/Alexander.J.Mercer',
                followers: '3.2K',
                lastActive: '5 days ago',
                verified: false
              },
              {
                name: 'Instagram',
                handle: '@amercer_global',
                url: 'https://instagram.com/amercer_global',
                followers: '5.7K',
                lastActive: '3 hours ago',
                verified: false
              }
            ]
          },
          financial: {
            hasData: true,
            netWorth: "$8.2M (estimated)",
            bankAccounts: "Primary: Chase Private Client, Secondary: HSBC Premier (UK), Offshore: UBS Switzerland",
            investments: "Diversified portfolio: 40% equities, 25% real estate, 20% bonds, 10% cryptocurrency, 5% alternative investments",
            cryptoHoldings: "Bitcoin (12.5 BTC), Ethereum (180 ETH), Various altcoins (~$450K total)",
            offshoreAccounts: "UBS Switzerland ($1.2M), Cayman Islands trust structure",
            annualIncome: "$850K (consulting fees + investment returns)"
          },
          business: {
            hasData: true,
            businesses: [
              {
                name: "Mercer Global Consulting LLC",
                role: "Founder & CEO",
                location: "New York, NY",
                revenue: "$2.8M annually"
              },
              {
                name: "TechVenture Partners",
                role: "Managing Partner",
                location: "London, UK",
                revenue: "$1.5M annually"
              },
              {
                name: "Digital Assets Fund",
                role: "Co-founder",
                location: "Delaware, USA",
                revenue: "$950K annually"
              }
            ]
          },
          property: {
            hasData: true,
            properties: [
              {
                address: "432 Park Avenue, Penthouse 78A, New York, NY",
                type: "Primary Residence",
                value: "$4.2M",
                ownership: "Direct ownership"
              },
              {
                address: "15 Belgrave Square, London, UK",
                type: "Secondary Residence",
                value: "£2.1M",
                ownership: "Through UK Ltd company"
              },
              {
                address: "Aspen Mountain Lodge, Colorado",
                type: "Vacation Property",
                value: "$1.8M",
                ownership: "Family trust"
              },
              {
                address: "Commercial Building, Brooklyn, NY",
                type: "Investment Property",
                value: "$3.5M",
                ownership: "LLC ownership"
              }
            ]
          },
          legal: {
            hasData: true,
            criminalRecord: "No criminal convictions found",
            activeLawsuits: "Plaintiff in intellectual property dispute vs. TechCorp Inc (ongoing since 2023)",
            regulatoryViolations: "SEC inquiry regarding cryptocurrency investments (resolved 2022, no violations found)",
            civilCases: "Divorce proceedings finalized 2021, custody agreement in place"
          },
          online: {
            hasData: true,
            socialMedia: "Active across LinkedIn, Twitter, Instagram with professional focus",
            emailAccounts: "Primary: alexander.mercer@gmail.com, Business: am@mercerglobal.com, Secure: encrypted@protonmail.com",
            digitalFootprint: "Strong professional presence, regular speaking engagements, published articles on fintech",
            communicationMethods: "Signal, WhatsApp, Telegram for secure communications"
          }
        },
        2: {
          targetName: "Sarah Johnson",
          targetEmail: "sarah.j@globaldynamics.com",
          targetLinkedIn: "linkedin.com/in/sarahjohnson",
          caseNumber: "TGI-2024-002",
          personal: {
            hasData: false
          },
          socialMedia: {
            hasData: true,
            platforms: [
              {
                name: 'LinkedIn',
                handle: 'sarahjohnson',
                url: 'https://linkedin.com/in/sarahjohnson',
                followers: '2.1K',
                lastActive: '1 day ago',
                verified: false
              }
            ]
          }
        }
      }
      
      setReportData(sampleData[reportId as keyof typeof sampleData] || null)
    }
  }, [reportId])

  // Bibliography data for each section
  const bibliographies = {
    personal: [
      { id: 'linkedin-profile', source: 'LinkedIn Profile', url: 'https://linkedin.com/in/alexander-mercer', type: 'url' as const },
      { id: 'passport-records', source: 'US Passport Records Database', type: 'database' as const },
      { id: 'university-records', source: 'Harvard Business School Alumni Directory', url: 'https://hbs.edu/alumni', type: 'url' as const },
      { id: 'mit-records', source: 'MIT Alumni Database', type: 'database' as const }
    ],
    socialMedia: [
      { id: 'twitter-api', source: 'Twitter API Data', url: 'https://twitter.com/alexmercer_nyc', type: 'url' as const },
      { id: 'linkedin-scrape', source: 'LinkedIn', url: 'https://linkedin.com/in/alexander-mercer-consulting', type: 'url' as const },
      { id: 'facebook-osint', source: 'Facebook', url: 'https://facebook.com/Alexander.J.Mercer', type: 'url' as const },
      { id: 'instagram-posts', source: 'Instagram', url: 'https://instagram.com/amercer_global', type: 'url' as const }
    ],
    financial: [
      { id: 'sec-filings', source: 'SEC Filing 10-K Forms', url: 'https://sec.gov/edgar', type: 'url' as const },
      { id: 'bank-statements', source: 'Financial Institution Reports', type: 'document' as const },
      { id: 'crypto-wallets', source: 'Blockchain Analysis Report', type: 'document' as const },
      { id: 'offshore-leaks', source: 'Panama Papers Database', url: 'https://offshoreleaks.icij.org', type: 'url' as const }
    ],
    business: [
      { id: 'corp-filings', source: 'Delaware Corporate Registry', url: 'https://corp.delaware.gov', type: 'url' as const },
      { id: 'uk-companies', source: 'UK Companies House', url: 'https://companieshouse.gov.uk', type: 'url' as const },
      { id: 'annual-reports', source: 'Company Annual Reports', type: 'document' as const },
      { id: 'board-minutes', source: 'Board Meeting Minutes', type: 'document' as const }
    ],
    property: [
      { id: 'nyc-records', source: 'NYC Property Records', url: 'https://nyc.gov/property', type: 'url' as const },
      { id: 'uk-land-registry', source: 'UK Land Registry', url: 'https://landregistry.gov.uk', type: 'url' as const },
      { id: 'dubai-property', source: 'Dubai Land Department', type: 'database' as const },
      { id: 'trust-documents', source: 'Family Trust Documentation', type: 'document' as const }
    ],
    legal: [
      { id: 'court-records', source: 'Federal Court Records', url: 'https://pacer.gov', type: 'url' as const },
      { id: 'sec-enforcement', source: 'SEC Enforcement Actions', url: 'https://sec.gov/enforce', type: 'url' as const },
      { id: 'swiss-investigation', source: 'Swiss Federal Prosecutor Files', type: 'document' as const },
      { id: 'civil-suits', source: 'State Court Filings', type: 'database' as const }
    ],
    online: [
      { id: 'social-media', source: 'Social Media Platforms', type: 'url' as const },
      { id: 'domain-records', source: 'WHOIS Database', url: 'https://whois.net', type: 'url' as const },
      { id: 'email-headers', source: 'Email Metadata Analysis', type: 'document' as const },
      { id: 'digital-forensics', source: 'Digital Forensics Report', type: 'document' as const }
    ]
  }

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handleApprovalToggle = (sectionId: string) => {
    setApprovedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const handleRefresh = (sectionId: string) => {
    setRefreshingSections(prev => ({ ...prev, [sectionId]: true }))
    
    setTimeout(() => {
      setRefreshingSections(prev => ({ ...prev, [sectionId]: false }))
    }, 3000)
  }

  const handleEdit = (sectionId: string) => {
    setEditingSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }))
  }

  const handleSaveField = (field: string, value: string, section?: string, index?: number) => {
    setReportData((prev: any) => {
      if (!prev) return prev
      const newData = { ...prev }
      
      if (section === 'businesses' && index !== undefined) {
        newData.business.businesses[index] = { ...newData.business.businesses[index], [field]: value }
      } else if (section === 'properties' && index !== undefined) {
        newData.property.properties[index] = { ...newData.property.properties[index], [field]: value }
      } else if (section === 'personal') {
        if (field === 'aliases' || field === 'languages') {
          newData.personal[field] = value.split(', ')
        } else {
          newData.personal[field] = value
        }
      } else if (section === 'financial') {
        newData.financial[field] = value
      } else if (section === 'legal') {
        newData.legal[field] = value
      } else if (section === 'online') {
        newData.online[field] = value
      }
      
      return newData
    })
  }

  const handleDownloadPDF = () => {
    const pdfData = {
      ...sampleReportData,
      targetName: reportData?.targetName || 'Investigation Target',
      targetEmail: reportData?.targetEmail || 'target@example.com',
      targetLinkedIn: reportData?.targetLinkedIn || 'linkedin.com/in/target',
      caseNumber: reportData?.caseNumber || 'TGI-2024-001',
      dateGenerated: new Date().toLocaleDateString(),
    }
    
    generateReportPDF(pdfData)
  }

  const socialIcons = [
    { Icon: Twitter, active: true },
    { Icon: Linkedin, active: true },
    { Icon: Github, active: false },
    { Icon: Facebook, active: true },
    { Icon: Instagram, active: true },
    { Icon: Mail, active: true }
  ]

  const targetName = reportData?.targetName || (reportId ? `Report Subject #${reportId}` : 'Investigation Target')
  const targetEmail = reportData?.targetEmail || ''
  const caseNumber = reportData?.caseNumber || `TGI-2024-${reportId?.padStart(3, '0') || '001'}`

  return (
    <div className="h-full">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none z-0">
        <div className="transform rotate-45 text-black text-9xl font-bold">
          CLASSIFIED
        </div>
      </div>
      
      <ScrollArea className="h-full">
        <div className="relative z-10 p-6">
          {/* Header */}
          <div className="mb-6 border-b border-gray-200 pb-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <Shield size={20} className="text-gray-400" />
                <div>
                  <h1 className="text-sm font-medium text-gray-900">INTELLIGENCE BRIEFING</h1>
                  <p className="text-xs text-gray-500">Case: {caseNumber}</p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                {/* Collaborators */}
                <div className="flex -space-x-2">
                  <img
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                    alt="Collaborator"
                    className="w-6 h-6 rounded-full border-2 border-white"
                  />
                  <img
                    src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
                    alt="Collaborator"
                    className="w-6 h-6 rounded-full border-2 border-white"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                    <Share2 size={16} className="text-gray-600" />
                  </button>
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                    <Lock size={16} className="text-gray-600" />
                  </button>
                  <button 
                    onClick={handleDownloadPDF}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Download PDF Report"
                  >
                    <Download size={16} className="text-gray-600" />
                  </button>
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                    <Settings size={16} className="text-gray-600" />
                  </button>
                </div>

                <div className="text-right">
                  <div className="inline-block bg-red-50 text-red-700 px-2 py-0.5 text-xs font-medium rounded">
                    CONFIDENTIAL
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Generated: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Subject Information */}
          <div className="mb-6">
            <div className="flex gap-6 mb-6">
              <div className="flex-grow">
                <h2 className="mb-2 text-lg font-medium text-gray-900">{targetName}</h2>
                {targetEmail && (
                  <p className="text-sm text-gray-600 mb-2">{targetEmail}</p>
                )}
                {reportId ? (
                  <p className="text-sm text-gray-600 mb-2">Investigation in progress - {reportId ? '65%' : '0%'} complete</p>
                ) : (
                  <p className="text-sm text-gray-600 mb-2">Enter target information to begin intelligence gathering</p>
                )}
                <div className="flex gap-3 mb-2">
                  {socialIcons.map(({ Icon, active }, index) => (
                    <Icon 
                      key={index}
                      size={16}
                      className={active ? "text-gray-700" : "text-gray-300"}
                    />
                  ))}
                </div>
              </div>
              <div className="w-28 h-36 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center">
                {reportData?.targetImage ? (
                  <img src={reportData.targetImage} alt="Subject" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <User className="h-12 w-12 text-gray-400" />
                )}
              </div>
            </div>

            <div className="space-y-3">
              <AccordionSection
                title="Personal Information"
                icon={User}
                isOpen={openSections.personal}
                onToggle={() => toggleSection('personal')}
                isApproved={approvedSections.personal}
                onApprovalToggle={() => handleApprovalToggle('personal')}
                onRefresh={() => handleRefresh('personal')}
                isRefreshing={refreshingSections.personal}
                creditCost={2.1}
                hasData={reportData?.personal?.hasData}
                bibliography={bibliographies.personal}
                sectionId="personal"
                editingSections={editingSections}
                onEdit={handleEdit}
              >
                <div className="space-y-2 text-sm">
                  {reportData?.personal?.hasData ? (
                    <>
                      <p>
                        <span className="text-gray-600">DOB:</span>{' '}
                        {editingSections.personal ? (
                          <EditableText
                            value={reportData.personal.dob}
                            isEditing={true}
                            onSave={(value) => handleSaveField('dob', value, 'personal')}
                          />
                        ) : (
                          <TerminalText text={reportData.personal.dob} isAnimating={refreshingSections.personal || false} delay={200} />
                        )}
                      </p>
                      <p>
                        <span className="text-gray-600">Nationality:</span>{' '}
                        {editingSections.personal ? (
                          <EditableText
                            value={reportData.personal.nationality}
                            isEditing={true}
                            onSave={(value) => handleSaveField('nationality', value, 'personal')}
                          />
                        ) : (
                          <TerminalText text={reportData.personal.nationality} isAnimating={refreshingSections.personal || false} delay={400} />
                        )}
                      </p>
                      <p>
                        <span className="text-gray-600">Known Aliases:</span>{' '}
                        {editingSections.personal ? (
                          <EditableText
                            value={reportData.personal.aliases.join(", ")}
                            isEditing={true}
                            onSave={(value) => handleSaveField('aliases', value, 'personal')}
                          />
                        ) : (
                          <TerminalText text={reportData.personal.aliases.join(", ")} isAnimating={refreshingSections.personal || false} delay={600} />
                        )}
                      </p>
                      <p>
                        <span className="text-gray-600">Current Location:</span>{' '}
                        {editingSections.personal ? (
                          <EditableText
                            value={reportData.personal.currentLocation}
                            isEditing={true}
                            onSave={(value) => handleSaveField('currentLocation', value, 'personal')}
                          />
                        ) : (
                          <TerminalText text={reportData.personal.currentLocation} isAnimating={refreshingSections.personal || false} delay={800} />
                        )}
                      </p>
                      <p>
                        <span className="text-gray-600">Education:</span>{' '}
                        {editingSections.personal ? (
                          <EditableText
                            value={reportData.personal.education}
                            isEditing={true}
                            onSave={(value) => handleSaveField('education', value, 'personal')}
                          />
                        ) : (
                          <TerminalText text={reportData.personal.education} isAnimating={refreshingSections.personal || false} delay={1000} />
                        )}
                      </p>
                      <p>
                        <span className="text-gray-600">Languages:</span>{' '}
                        {editingSections.personal ? (
                          <EditableText
                            value={reportData.personal.languages.join(", ")}
                            isEditing={true}
                            onSave={(value) => handleSaveField('languages', value, 'personal')}
                          />
                        ) : (
                          <TerminalText text={reportData.personal.languages.join(", ")} isAnimating={refreshingSections.personal || false} delay={1200} />
                        )}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-600">
                        {reportId ? 'Personal information analysis in progress...' : 'Waiting for target information to begin analysis...'}
                      </p>
                      <p className="text-xs text-gray-500">This section will contain basic demographic information, education, and background details.</p>
                    </>
                  )}
                </div>
              </AccordionSection>

              <AccordionSection
                title="Social Media Intelligence"
                icon={Globe}
                isOpen={openSections.socialMedia}
                onToggle={() => toggleSection('socialMedia')}
                isApproved={approvedSections.socialMedia}
                onApprovalToggle={() => handleApprovalToggle('socialMedia')}
                onRefresh={() => handleRefresh('socialMedia')}
                isRefreshing={refreshingSections.socialMedia}
                creditCost={3.2}
                hasData={reportData?.socialMedia?.hasData}
                bibliography={bibliographies.socialMedia}
                sectionId="socialMedia"
                editingSections={editingSections}
                onEdit={handleEdit}
              >
                <div className="space-y-2 text-sm">
                  {reportData?.socialMedia?.hasData && reportData.socialMedia.platforms ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {reportData.socialMedia.platforms.map((platform: any, index: number) => (
                        <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <Globe size={20} className="text-gray-700" />
                              <span className="font-medium text-gray-900">{platform.name}</span>
                            </div>
                            {platform.verified && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full" title="Verified Account" />
                            )}
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Handle:</span>
                              <a 
                                href={platform.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 flex items-center space-x-1 transition-colors"
                              >
                                <span>{platform.handle}</span>
                                <ExternalLink size={12} />
                              </a>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Followers:</span>
                              <span className="font-medium text-gray-900">{platform.followers}</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Last Active:</span>
                              <span className="text-gray-700">{platform.lastActive}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-600">
                        {reportId ? 'Social media analysis in progress...' : 'Social media analysis will appear here...'}
                      </p>
                      <p className="text-xs text-gray-500">This section will analyze social media profiles, posts, connections, and digital behavior patterns.</p>
                    </>
                  )}
                </div>
              </AccordionSection>

              <AccordionSection
                title="Financial Assets"
                icon={DollarSign}
                isOpen={openSections.financial}
                onToggle={() => toggleSection('financial')}
                isApproved={approvedSections.financial}
                onApprovalToggle={() => handleApprovalToggle('financial')}
                onRefresh={() => handleRefresh('financial')}
                isRefreshing={refreshingSections.financial}
                creditCost={4.1}
                hasData={reportData?.financial?.hasData}
                bibliography={bibliographies.financial}
                sectionId="financial"
                editingSections={editingSections}
                onEdit={handleEdit}
              >
                <div className="space-y-2 text-sm">
                  {reportData?.financial?.hasData ? (
                    <>
                      <p>
                        <span className="text-gray-600">Net Worth:</span>{' '}
                        {editingSections.financial ? (
                          <EditableText
                            value={reportData.financial.netWorth}
                            isEditing={true}
                            onSave={(value) => handleSaveField('netWorth', value, 'financial')}
                          />
                        ) : (
                          <TerminalText text={reportData.financial.netWorth} isAnimating={refreshingSections.financial || false} delay={200} />
                        )}
                      </p>
                      <p>
                        <span className="text-gray-600">Bank Accounts:</span>{' '}
                        {editingSections.financial ? (
                          <EditableText
                            value={reportData.financial.bankAccounts}
                            isEditing={true}
                            onSave={(value) => handleSaveField('bankAccounts', value, 'financial')}
                          />
                        ) : (
                          <TerminalText text={reportData.financial.bankAccounts} isAnimating={refreshingSections.financial || false} delay={400} />
                        )}
                      </p>
                      <p>
                        <span className="text-gray-600">Investments:</span>{' '}
                        {editingSections.financial ? (
                          <EditableText
                            value={reportData.financial.investments}
                            isEditing={true}
                            onSave={(value) => handleSaveField('investments', value, 'financial')}
                          />
                        ) : (
                          <TerminalText text={reportData.financial.investments} isAnimating={refreshingSections.financial || false} delay={600} />
                        )}
                      </p>
                      <p>
                        <span className="text-gray-600">Crypto Holdings:</span>{' '}
                        {editingSections.financial ? (
                          <EditableText
                            value={reportData.financial.cryptoHoldings}
                            isEditing={true}
                            onSave={(value) => handleSaveField('cryptoHoldings', value, 'financial')}
                          />
                        ) : (
                          <TerminalText text={reportData.financial.cryptoHoldings} isAnimating={refreshingSections.financial || false} delay={800} />
                        )}
                      </p>
                      <p>
                        <span className="text-gray-600">Offshore Accounts:</span>{' '}
                        {editingSections.financial ? (
                          <EditableText
                            value={reportData.financial.offshoreAccounts}
                            isEditing={true}
                            onSave={(value) => handleSaveField('offshoreAccounts', value, 'financial')}
                          />
                        ) : (
                          <TerminalText text={reportData.financial.offshoreAccounts} isAnimating={refreshingSections.financial || false} delay={1000} />
                        )}
                      </p>
                      <p>
                        <span className="text-gray-600">Annual Income:</span>{' '}
                        {editingSections.financial ? (
                          <EditableText
                            value={reportData.financial.annualIncome}
                            isEditing={true}
                            onSave={(value) => handleSaveField('annualIncome', value, 'financial')}
                          />
                        ) : (
                          <TerminalText text={reportData.financial.annualIncome} isAnimating={refreshingSections.financial || false} delay={1200} />
                        )}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-600">
                        {reportId ? 'Financial analysis in progress...' : 'Financial analysis pending...'}
                      </p>
                      <p className="text-xs text-gray-500">This section will contain information about assets, investments, income, and financial indicators.</p>
                    </>
                  )}
                </div>
              </AccordionSection>

              <AccordionSection
                title="Business Interests"
                icon={Building2}
                isOpen={openSections.business}
                onToggle={() => toggleSection('business')}
                isApproved={approvedSections.business}
                onApprovalToggle={() => handleApprovalToggle('business')}
                onRefresh={() => handleRefresh('business')}
                isRefreshing={refreshingSections.business}
                creditCost={2.8}
                hasData={reportData?.business?.hasData}
                bibliography={bibliographies.business}
                sectionId="business"
                editingSections={editingSections}
                onEdit={handleEdit}
              >
                <div className="space-y-4 text-sm">
                  {reportData?.business?.hasData && reportData.business.businesses ? (
                    reportData.business.businesses.map((business: any, index: number) => (
                      <div key={index} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                        <p className="font-medium text-gray-900">
                          {editingSections.business ? (
                            <EditableText
                              value={business.name}
                              isEditing={true}
                              onSave={(value) => handleSaveField('name', value, 'businesses', index)}
                            />
                          ) : (
                            <TerminalText text={business.name} isAnimating={refreshingSections.business || false} delay={200 + index * 400} />
                          )}
                        </p>
                        <p className="text-gray-600">
                          Role:{' '}
                          {editingSections.business ? (
                            <EditableText
                              value={business.role}
                              isEditing={true}
                              onSave={(value) => handleSaveField('role', value, 'businesses', index)}
                            />
                          ) : (
                            <TerminalText text={business.role} isAnimating={refreshingSections.business || false} delay={300 + index * 400} />
                          )}
                        </p>
                        <p className="text-gray-600">
                          Location:{' '}
                          {editingSections.business ? (
                            <EditableText
                              value={business.location}
                              isEditing={true}
                              onSave={(value) => handleSaveField('location', value, 'businesses', index)}
                            />
                          ) : (
                            <TerminalText text={business.location} isAnimating={refreshingSections.business || false} delay={400 + index * 400} />
                          )}
                        </p>
                        <p className="text-gray-600">
                          Est. Annual Revenue:{' '}
                          {editingSections.business ? (
                            <EditableText
                              value={business.revenue}
                              isEditing={true}
                              onSave={(value) => handleSaveField('revenue', value, 'businesses', index)}
                            />
                          ) : (
                            <TerminalText text={business.revenue} isAnimating={refreshingSections.business || false} delay={500 + index * 400} />
                          )}
                        </p>
                      </div>
                    ))
                  ) : (
                    <>
                      <p className="text-gray-600">
                        {reportId ? 'Business intelligence gathering...' : 'Business intelligence gathering...'}
                      </p>
                      <p className="text-xs text-gray-500">This section will detail corporate affiliations, business ventures, and professional networks.</p>
                    </>
                  )}
                </div>
              </AccordionSection>

              <AccordionSection
                title="Property Holdings"
                icon={Home}
                isOpen={openSections.property}
                onToggle={() => toggleSection('property')}
                isApproved={approvedSections.property}
                onApprovalToggle={() => handleApprovalToggle('property')}
                onRefresh={() => handleRefresh('property')}
                isRefreshing={refreshingSections.property}
                creditCost={3.5}
                hasData={reportData?.property?.hasData}
                bibliography={bibliographies.property}
                sectionId="property"
                editingSections={editingSections}
                onEdit={handleEdit}
              >
                <div className="space-y-4 text-sm">
                  {reportData?.property?.hasData && reportData.property.properties ? (
                    reportData.property.properties.map((property: any, index: number) => (
                      <div key={index} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                        <p className="font-medium text-gray-900">
                          {editingSections.property ? (
                            <EditableText
                              value={property.address}
                              isEditing={true}
                              onSave={(value) => handleSaveField('address', value, 'properties', index)}
                            />
                          ) : (
                            <TerminalText text={property.address} isAnimating={refreshingSections.property || false} delay={200 + index * 400} />
                          )}
                        </p>
                        <p className="text-gray-600">
                          Type:{' '}
                          {editingSections.property ? (
                            <EditableText
                              value={property.type}
                              isEditing={true}
                              onSave={(value) => handleSaveField('type', value, 'properties', index)}
                            />
                          ) : (
                            <TerminalText text={property.type} isAnimating={refreshingSections.property || false} delay={300 + index * 400} />
                          )}
                        </p>
                        <p className="text-gray-600">
                          Value:{' '}
                          {editingSections.property ? (
                            <EditableText
                              value={property.value}
                              isEditing={true}
                              onSave={(value) => handleSaveField('value', value, 'properties', index)}
                            />
                          ) : (
                            <TerminalText text={property.value} isAnimating={refreshingSections.property || false} delay={400 + index * 400} />
                          )}
                        </p>
                        <p className="text-gray-600">
                          Ownership:{' '}
                          {editingSections.property ? (
                            <EditableText
                              value={property.ownership}
                              isEditing={true}
                              onSave={(value) => handleSaveField('ownership', value, 'properties', index)}
                            />
                          ) : (
                            <TerminalText text={property.ownership} isAnimating={refreshingSections.property || false} delay={500 + index * 400} />
                          )}
                        </p>
                      </div>
                    ))
                  ) : (
                    <>
                      <p className="text-gray-600">
                        {reportId ? 'Property research in progress...' : 'Property research in progress...'}
                      </p>
                      <p className="text-xs text-gray-500">This section will show real estate ownership, property values, and asset holdings.</p>
                    </>
                  )}
                </div>
              </AccordionSection>

              <AccordionSection
                title="Legal & Litigation"
                icon={Scale}
                isOpen={openSections.legal}
                onToggle={() => toggleSection('legal')}
                isApproved={approvedSections.legal}
                onApprovalToggle={() => handleApprovalToggle('legal')}
                onRefresh={() => handleRefresh('legal')}
                isRefreshing={refreshingSections.legal}
                creditCost={2.9}
                hasData={reportData?.legal?.hasData}
                bibliography={bibliographies.legal}
                sectionId="legal"
                editingSections={editingSections}
                onEdit={handleEdit}
              >
                <div className="space-y-2 text-sm">
                  {reportData?.legal?.hasData ? (
                    <>
                      <p>
                        <span className="text-gray-600">Criminal Record:</span>{' '}
                        {editingSections.legal ? (
                          <EditableText
                            value={reportData.legal.criminalRecord}
                            isEditing={true}
                            onSave={(value) => handleSaveField('criminalRecord', value, 'legal')}
                          />
                        ) : (
                          <TerminalText text={reportData.legal.criminalRecord} isAnimating={refreshingSections.legal || false} delay={200} />
                        )}
                      </p>
                      <p>
                        <span className="text-gray-600">Active Lawsuits:</span>{' '}
                        {editingSections.legal ? (
                          <EditableText
                            value={reportData.legal.activeLawsuits}
                            isEditing={true}
                            onSave={(value) => handleSaveField('activeLawsuits', value, 'legal')}
                          />
                        ) : (
                          <TerminalText text={reportData.legal.activeLawsuits} isAnimating={refreshingSections.legal || false} delay={400} />
                        )}
                      </p>
                      <p>
                        <span className="text-gray-600">Regulatory Violations:</span>{' '}
                        {editingSections.legal ? (
                          <EditableText
                            value={reportData.legal.regulatoryViolations}
                            isEditing={true}
                            onSave={(value) => handleSaveField('regulatoryViolations', value, 'legal')}
                          />
                        ) : (
                          <TerminalText text={reportData.legal.regulatoryViolations} isAnimating={refreshingSections.legal || false} delay={600} />
                        )}
                      </p>
                      <p>
                        <span className="text-gray-600">Civil Cases:</span>{' '}
                        {editingSections.legal ? (
                          <EditableText
                            value={reportData.legal.civilCases}
                            isEditing={true}
                            onSave={(value) => handleSaveField('civilCases', value, 'legal')}
                          />
                        ) : (
                          <TerminalText text={reportData.legal.civilCases} isAnimating={refreshingSections.legal || false} delay={800} />
                        )}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-600">
                        {reportId ? 'Legal records analysis...' : 'Legal records analysis...'}
                      </p>
                      <p className="text-xs text-gray-500">This section will contain court records, litigation history, and legal proceedings.</p>
                    </>
                  )}
                </div>
              </AccordionSection>

              <AccordionSection
                title="Online Presence"
                icon={Search}
                isOpen={openSections.online}
                onToggle={() => toggleSection('online')}
                isApproved={approvedSections.online}
                onApprovalToggle={() => handleApprovalToggle('online')}
                onRefresh={() => handleRefresh('online')}
                isRefreshing={refreshingSections.online}
                creditCost={1.8}
                hasData={reportData?.online?.hasData}
                bibliography={bibliographies.online}
                sectionId="online"
                editingSections={editingSections}
                onEdit={handleEdit}
              >
                <div className="space-y-2 text-sm">
                  {reportData?.online?.hasData ? (
                    <>
                      <p>
                        <span className="text-gray-600">Social Media:</span>{' '}
                        {editingSections.online ? (
                          <EditableText
                            value={reportData.online.socialMedia}
                            isEditing={true}
                            onSave={(value) => handleSaveField('socialMedia', value, 'online')}
                          />
                        ) : (
                          <TerminalText text={reportData.online.socialMedia} isAnimating={refreshingSections.online || false} delay={200} />
                        )}
                      </p>
                      <p>
                        <span className="text-gray-600">Email Accounts:</span>{' '}
                        {editingSections.online ? (
                          <EditableText
                            value={reportData.online.emailAccounts}
                            isEditing={true}
                            onSave={(value) => handleSaveField('emailAccounts', value, 'online')}
                          />
                        ) : (
                          <TerminalText text={reportData.online.emailAccounts} isAnimating={refreshingSections.online || false} delay={400} />
                        )}
                      </p>
                      <p>
                        <span className="text-gray-600">Digital Footprint:</span>{' '}
                        {editingSections.online ? (
                          <EditableText
                            value={reportData.online.digitalFootprint}
                            isEditing={true}
                            onSave={(value) => handleSaveField('digitalFootprint', value, 'online')}
                          />
                        ) : (
                          <TerminalText text={reportData.online.digitalFootprint} isAnimating={refreshingSections.online || false} delay={600} />
                        )}
                      </p>
                      <p>
                        <span className="text-gray-600">Communication Methods:</span>{' '}
                        {editingSections.online ? (
                          <EditableText
                            value={reportData.online.communicationMethods}
                            isEditing={true}
                            onSave={(value) => handleSaveField('communicationMethods', value, 'online')}
                          />
                        ) : (
                          <TerminalText text={reportData.online.communicationMethods} isAnimating={refreshingSections.online || false} delay={800} />
                        )}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-600">
                        {reportId ? 'Digital footprint mapping...' : 'Digital footprint mapping...'}
                      </p>
                      <p className="text-xs text-gray-500">This section will track online presence, digital activities, and web-based information.</p>
                    </>
                  )}
                </div>
              </AccordionSection>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 mt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">This document contains sensitive information and is intended for authorized personnel only.</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs font-medium text-gray-900">CONFIDENTIAL</p>
              <p className="text-xs text-gray-500">Page 1 of 1</p>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
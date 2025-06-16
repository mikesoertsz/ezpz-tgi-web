'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Shield,
  Share2,
  Lock,
  Download,
  Settings,
  Circle,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Copy,
  Trash2,
  Edit,
  CheckCircle,
  Coins,
  ExternalLink,
  User,
  Globe,
  DollarSign,
  Building2,
  Home,
  Scale,
  Search,
  Calendar,
  MapPin,
  GraduationCap,
  Languages,
  Users,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle
} from "lucide-react"
import { loadReportData, updateReportSection, saveReportData } from "@/lib/report-loader"
import { ReportData, formatDisplayValue, sectionHasData } from "@/lib/report-data"
import { generateReportPDF } from "@/lib/pdf-generator"

interface ReportDocumentProps {
  reportId?: string
}

// Terminal-like text animation component
const TerminalText: React.FC<{ 
  text: string; 
  isAnimating: boolean; 
  delay?: number;
  className?: string;
}> = ({ text, isAnimating, delay = 0, className = "" }) => {
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
    <span className={`${isTyping ? 'bg-blue-50' : ''} transition-colors duration-200 ${className}`}>
      {displayText}
      {isTyping && <span className="animate-pulse">|</span>}
    </span>
  )
}

export function ReportDocument({ reportId }: ReportDocumentProps) {
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    personal: true,
    social: false,
    financial: false,
    business: false,
    property: false,
    legal: false,
    online: false,
  })
  const [editingSections, setEditingSections] = useState<Record<string, boolean>>({})
  const [refreshingSections, setRefreshingSections] = useState<Record<string, boolean>>({})
  const [approvedSections, setApprovedSections] = useState<Record<string, boolean>>({})
  const [bibliographyOpen, setBibliographyOpen] = useState<Record<string, boolean>>({})

  // Load report data
  useEffect(() => {
    async function loadData() {
      if (reportId) {
        const data = await loadReportData(reportId)
        setReportData(data)
      }
      setLoading(false)
    }
    loadData()
  }, [reportId])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading report...</p>
        </div>
      </div>
    )
  }

  if (!reportData) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">No Report Data</h2>
          <p className="text-muted-foreground">Start a new investigation to generate a report.</p>
        </div>
      </div>
    )
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
    
    // Simulate AI research duration (3-5 seconds)
    const duration = Math.random() * 2000 + 3000
    
    setTimeout(() => {
      setRefreshingSections(prev => ({ ...prev, [sectionId]: false }))
    }, duration)
  }

  const handleEdit = (sectionId: string) => {
    setEditingSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }))
  }

  const handleSaveField = async (sectionId: string, field: string, value: any) => {
    if (!reportData) return

    const updates = { [field]: value }
    const updatedReport = updateReportSection(reportData, sectionId, updates)
    
    setReportData(updatedReport)
    await saveReportData(updatedReport)
  }

  const handleDownloadPDF = () => {
    if (!reportData) return

    const pdfData = {
      caseNumber: reportData.caseNumber,
      classification: reportData.classification,
      targetName: reportData.targetName,
      targetEmail: reportData.targetEmail,
      targetLinkedIn: reportData.targetLinkedIn,
      dateGenerated: new Date(reportData.dateGenerated).toLocaleDateString(),
      sections: [
        {
          title: 'Personal Information',
          content: generatePersonalInfoContent(reportData),
          hasData: sectionHasData(reportData.personalInformation)
        },
        {
          title: 'Social Media Intelligence',
          content: generateSocialMediaContent(reportData),
          hasData: sectionHasData(reportData.socialMediaProfiles)
        },
        {
          title: 'Financial Assets',
          content: generateFinancialContent(reportData),
          hasData: sectionHasData(reportData.financialAssets)
        },
        {
          title: 'Business Interests',
          content: generateBusinessContent(reportData),
          hasData: sectionHasData(reportData.businessInterests)
        },
        {
          title: 'Property Holdings',
          content: generatePropertyContent(reportData),
          hasData: sectionHasData(reportData.propertyHoldings)
        },
        {
          title: 'Legal & Litigation',
          content: generateLegalContent(reportData),
          hasData: sectionHasData(reportData.legalRecords)
        },
        {
          title: 'Online Presence',
          content: generateOnlinePresenceContent(reportData),
          hasData: sectionHasData(reportData.onlinePresence)
        }
      ]
    }

    generateReportPDF(pdfData)
  }

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter':
      case 'twitter/x':
        return Twitter
      case 'linkedin':
        return Linkedin
      case 'facebook':
        return Facebook
      case 'instagram':
        return Instagram
      case 'youtube':
        return Youtube
      case 'reddit':
        return MessageCircle
      default:
        return Globe
    }
  }

  const EditableText = ({ 
    value, 
    isEditing, 
    onSave, 
    className = "",
    multiline = false 
  }: {
    value: string | null
    isEditing: boolean
    onSave: (newValue: string) => void
    className?: string
    multiline?: boolean
  }) => {
    const [editValue, setEditValue] = useState(value || '')

    useEffect(() => {
      setEditValue(value || '')
    }, [value])

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !multiline) {
        onSave(editValue)
      } else if (e.key === 'Escape') {
        setEditValue(value || '')
      }
    }

    const handleBlur = () => {
      if (editValue !== value) {
        onSave(editValue)
      }
    }

    if (isEditing) {
      return multiline ? (
        <Textarea
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          className={`bg-blue-50 border-blue-300 ${className}`}
          rows={3}
        />
      ) : (
        <Input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyPress}
          onBlur={handleBlur}
          className={`bg-blue-50 border-blue-300 ${className}`}
        />
      )
    }

    return <span className={className}>{formatDisplayValue(value)}</span>
  }

  const AccordionSection = ({ 
    sectionId, 
    title, 
    icon: Icon, 
    children, 
    creditCost = 2.1 
  }: {
    sectionId: string
    title: string
    icon: any
    children: React.ReactNode
    creditCost?: number
  }) => {
    const isOpen = openSections[sectionId]
    const isEditing = editingSections[sectionId]
    const isRefreshing = refreshingSections[sectionId]
    const isApproved = approvedSections[sectionId]
    const section = reportData?.sections[sectionId as keyof typeof reportData.sections]
    const bibliography = section?.bibliography || []
    const isBibliographyOpen = bibliographyOpen[sectionId]

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
              <Badge variant="secondary" className="text-xs">Data Available</Badge>
            )}
          </div>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
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
                  onClick={() => setBibliographyOpen(prev => ({ ...prev, [sectionId]: !prev[sectionId] }))}
                  className="flex items-center space-x-2 text-xs text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <span>Bibliography</span>
                  {isBibliographyOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>
                
                {isBibliographyOpen && (
                  <div className="mt-2 space-y-1">
                    {bibliography.map((item) => (
                      <div
                        key={item.id}
                        className="text-xs p-2 rounded bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => item.url && window.open(item.url, '_blank')}
                      >
                        <span className="text-gray-700">{item.source}</span>
                        {item.url && (
                          <ExternalLink className="inline w-3 h-3 ml-1 text-blue-600" />
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
                    onClick={() => handleRefresh(sectionId)}
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
                <button
                  onClick={() => {/* Copy functionality */}}
                  className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                  title="Copy"
                >
                  <Copy size={14} className="text-gray-600" />
                </button>
                <button
                  onClick={() => {/* Clear functionality */}}
                  className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                  title="Clear"
                >
                  <Trash2 size={14} className="text-gray-600" />
                </button>
                <button
                  onClick={() => handleEdit(sectionId)}
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
                onClick={() => handleApprovalToggle(sectionId)}
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
                  <h1 className="text-sm font-medium text-gray-900">INTELLIGENCE BRIEFING</h1>
                  <p className="text-xs text-gray-500">Case: {reportData.caseNumber}</p>
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
                  <Button variant="ghost" size="sm" onClick={handleDownloadPDF}>
                    <Download size={16} className="text-gray-600" />
                  </Button>
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
                <h2 className="mb-2 text-lg font-medium text-gray-900">{reportData.targetName}</h2>
                <div className="flex gap-3 mb-2">
                  <Twitter size={16} className="text-gray-700" />
                  <Linkedin size={16} className="text-gray-700" />
                  <Facebook size={16} className="text-gray-300" />
                  <Instagram size={16} className="text-gray-700" />
                  <Globe size={16} className="text-gray-700" />
                </div>
                <p className="text-sm text-gray-600">
                  Investigation in progress - {reportData.overallProgress}% complete
                </p>
              </div>
              <div className="w-28 h-36 bg-gray-200 rounded-lg border border-gray-200 flex items-center justify-center">
                <User className="h-12 w-12 text-gray-400" />
              </div>
            </div>

            {/* Report Sections */}
            <div className="space-y-3">
              {/* Personal Information */}
              <AccordionSection sectionId="personal" title="Personal Information" icon={User} creditCost={2.1}>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      DOB:
                    </span>
                    <span className="font-medium">
                      {editingSections.personal ? (
                        <EditableText
                          value={reportData.personalInformation.dob}
                          isEditing={true}
                          onSave={(value) => handleSaveField('personal', 'dob', value)}
                        />
                      ) : (
                        <TerminalText 
                          text={formatDisplayValue(reportData.personalInformation.dob)} 
                          isAnimating={refreshingSections.personal || false} 
                          delay={200} 
                        />
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      Nationality:
                    </span>
                    <span className="font-medium">
                      {editingSections.personal ? (
                        <EditableText
                          value={reportData.personalInformation.nationality}
                          isEditing={true}
                          onSave={(value) => handleSaveField('personal', 'nationality', value)}
                        />
                      ) : (
                        <TerminalText 
                          text={formatDisplayValue(reportData.personalInformation.nationality)} 
                          isAnimating={refreshingSections.personal || false} 
                          delay={400} 
                        />
                      )}
                    </span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-gray-600 flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Known Aliases:
                    </span>
                    <span className="font-medium text-right max-w-xs">
                      {editingSections.personal ? (
                        <EditableText
                          value={reportData.personalInformation.aliases.join(", ")}
                          isEditing={true}
                          onSave={(value) => handleSaveField('personal', 'aliases', value.split(", ").filter(Boolean))}
                        />
                      ) : (
                        <TerminalText 
                          text={formatDisplayValue(reportData.personalInformation.aliases.join(", "))} 
                          isAnimating={refreshingSections.personal || false} 
                          delay={600} 
                        />
                      )}
                    </span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-gray-600 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      Current Location:
                    </span>
                    <span className="font-medium text-right max-w-xs">
                      {editingSections.personal ? (
                        <EditableText
                          value={reportData.personalInformation.currentLocation}
                          isEditing={true}
                          onSave={(value) => handleSaveField('personal', 'currentLocation', value)}
                        />
                      ) : (
                        <TerminalText 
                          text={formatDisplayValue(reportData.personalInformation.currentLocation)} 
                          isAnimating={refreshingSections.personal || false} 
                          delay={800} 
                        />
                      )}
                    </span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-gray-600 flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" />
                      Education:
                    </span>
                    <span className="font-medium text-right max-w-xs">
                      {editingSections.personal ? (
                        <EditableText
                          value={reportData.personalInformation.education}
                          isEditing={true}
                          onSave={(value) => handleSaveField('personal', 'education', value)}
                          multiline
                        />
                      ) : (
                        <TerminalText 
                          text={formatDisplayValue(reportData.personalInformation.education)} 
                          isAnimating={refreshingSections.personal || false} 
                          delay={1000} 
                        />
                      )}
                    </span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-gray-600 flex items-center gap-1">
                      <Languages className="h-3 w-3" />
                      Languages:
                    </span>
                    <span className="font-medium text-right max-w-xs">
                      {editingSections.personal ? (
                        <EditableText
                          value={reportData.personalInformation.languages.join(", ")}
                          isEditing={true}
                          onSave={(value) => handleSaveField('personal', 'languages', value.split(", ").filter(Boolean))}
                        />
                      ) : (
                        <TerminalText 
                          text={formatDisplayValue(reportData.personalInformation.languages.join(", "))} 
                          isAnimating={refreshingSections.personal || false} 
                          delay={1200} 
                        />
                      )}
                    </span>
                  </div>
                </div>
              </AccordionSection>

              {/* Social Media Intelligence */}
              <AccordionSection sectionId="social" title="Social Media Intelligence" icon={Globe} creditCost={3.2}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reportData.socialMediaProfiles.length > 0 ? (
                    reportData.socialMediaProfiles.map((profile, index) => {
                      const IconComponent = getSocialIcon(profile.platform)
                      return (
                        <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <IconComponent size={20} className="text-gray-700" />
                              <span className="font-medium text-gray-900">{profile.platform}</span>
                            </div>
                            {profile.verified && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full" title="Verified Account" />
                            )}
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Handle:</span>
                              <a 
                                href={profile.url || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 flex items-center space-x-1 transition-colors"
                              >
                                <TerminalText 
                                  text={formatDisplayValue(profile.handle)} 
                                  isAnimating={refreshingSections.social || false} 
                                  delay={200 + index * 100} 
                                />
                                {profile.url && <ExternalLink size={12} />}
                              </a>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Followers:</span>
                              <span className="font-medium text-gray-900">
                                <TerminalText 
                                  text={formatDisplayValue(profile.followers)} 
                                  isAnimating={refreshingSections.social || false} 
                                  delay={300 + index * 100} 
                                />
                              </span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Last Active:</span>
                              <span className="text-gray-700">
                                <TerminalText 
                                  text={formatDisplayValue(profile.lastActive)} 
                                  isAnimating={refreshingSections.social || false} 
                                  delay={400 + index * 100} 
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="col-span-2 text-center py-8 text-gray-500">
                      No social media profiles found
                    </div>
                  )}
                </div>
              </AccordionSection>

              {/* Financial Assets */}
              <AccordionSection sectionId="financial" title="Financial Assets" icon={DollarSign} creditCost={4.1}>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Net Worth:</span>
                    <span className="font-medium">
                      {editingSections.financial ? (
                        <EditableText
                          value={reportData.financialAssets.netWorth}
                          isEditing={true}
                          onSave={(value) => handleSaveField('financial', 'netWorth', value)}
                        />
                      ) : (
                        <TerminalText 
                          text={formatDisplayValue(reportData.financialAssets.netWorth)} 
                          isAnimating={refreshingSections.financial || false} 
                          delay={200} 
                        />
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Annual Income:</span>
                    <span className="font-medium">
                      {editingSections.financial ? (
                        <EditableText
                          value={reportData.financialAssets.annualIncome}
                          isEditing={true}
                          onSave={(value) => handleSaveField('financial', 'annualIncome', value)}
                        />
                      ) : (
                        <TerminalText 
                          text={formatDisplayValue(reportData.financialAssets.annualIncome)} 
                          isAnimating={refreshingSections.financial || false} 
                          delay={400} 
                        />
                      )}
                    </span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-gray-600">Bank Accounts:</span>
                    <span className="font-medium text-right max-w-xs">
                      {editingSections.financial ? (
                        <EditableText
                          value={reportData.financialAssets.bankAccounts}
                          isEditing={true}
                          onSave={(value) => handleSaveField('financial', 'bankAccounts', value)}
                          multiline
                        />
                      ) : (
                        <TerminalText 
                          text={formatDisplayValue(reportData.financialAssets.bankAccounts)} 
                          isAnimating={refreshingSections.financial || false} 
                          delay={600} 
                        />
                      )}
                    </span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-gray-600">Investments:</span>
                    <span className="font-medium text-right max-w-xs">
                      {editingSections.financial ? (
                        <EditableText
                          value={reportData.financialAssets.investments}
                          isEditing={true}
                          onSave={(value) => handleSaveField('financial', 'investments', value)}
                          multiline
                        />
                      ) : (
                        <TerminalText 
                          text={formatDisplayValue(reportData.financialAssets.investments)} 
                          isAnimating={refreshingSections.financial || false} 
                          delay={800} 
                        />
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Crypto Holdings:</span>
                    <span className="font-medium">
                      {editingSections.financial ? (
                        <EditableText
                          value={reportData.financialAssets.cryptoHoldings}
                          isEditing={true}
                          onSave={(value) => handleSaveField('financial', 'cryptoHoldings', value)}
                        />
                      ) : (
                        <TerminalText 
                          text={formatDisplayValue(reportData.financialAssets.cryptoHoldings)} 
                          isAnimating={refreshingSections.financial || false} 
                          delay={1000} 
                        />
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Offshore Accounts:</span>
                    <span className="font-medium">
                      {editingSections.financial ? (
                        <EditableText
                          value={reportData.financialAssets.offshoreAccounts}
                          isEditing={true}
                          onSave={(value) => handleSaveField('financial', 'offshoreAccounts', value)}
                        />
                      ) : (
                        <TerminalText 
                          text={formatDisplayValue(reportData.financialAssets.offshoreAccounts)} 
                          isAnimating={refreshingSections.financial || false} 
                          delay={1200} 
                        />
                      )}
                    </span>
                  </div>
                </div>
              </AccordionSection>

              {/* Business Interests */}
              <AccordionSection sectionId="business" title="Business Interests" icon={Building2} creditCost={3.8}>
                <div className="space-y-4 text-sm">
                  {reportData.businessInterests.length > 0 ? (
                    reportData.businessInterests.map((business, index) => (
                      <div key={index} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="font-medium text-gray-900 mb-2">
                          <TerminalText 
                            text={formatDisplayValue(business.name)} 
                            isAnimating={refreshingSections.business || false} 
                            delay={200 + index * 400} 
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Role:</span>
                            <span className="font-medium">
                              <TerminalText 
                                text={formatDisplayValue(business.role)} 
                                isAnimating={refreshingSections.business || false} 
                                delay={300 + index * 400} 
                              />
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Location:</span>
                            <span className="font-medium">
                              <TerminalText 
                                text={formatDisplayValue(business.location)} 
                                isAnimating={refreshingSections.business || false} 
                                delay={400 + index * 400} 
                              />
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Revenue:</span>
                            <span className="font-medium">
                              <TerminalText 
                                text={formatDisplayValue(business.revenue)} 
                                isAnimating={refreshingSections.business || false} 
                                delay={500 + index * 400} 
                              />
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Ownership:</span>
                            <span className="font-medium">
                              <TerminalText 
                                text={formatDisplayValue(business.ownership)} 
                                isAnimating={refreshingSections.business || false} 
                                delay={600 + index * 400} 
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No business interests found
                    </div>
                  )}
                </div>
              </AccordionSection>

              {/* Property Holdings */}
              <AccordionSection sectionId="property" title="Property Holdings" icon={Home} creditCost={3.5}>
                <div className="space-y-4 text-sm">
                  {reportData.propertyHoldings.length > 0 ? (
                    reportData.propertyHoldings.map((property, index) => (
                      <div key={index} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="font-medium text-gray-900 mb-2">
                          <TerminalText 
                            text={formatDisplayValue(property.address)} 
                            isAnimating={refreshingSections.property || false} 
                            delay={200 + index * 400} 
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Type:</span>
                            <span className="font-medium">
                              <TerminalText 
                                text={formatDisplayValue(property.type)} 
                                isAnimating={refreshingSections.property || false} 
                                delay={300 + index * 400} 
                              />
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Value:</span>
                            <span className="font-medium">
                              <TerminalText 
                                text={formatDisplayValue(property.value)} 
                                isAnimating={refreshingSections.property || false} 
                                delay={400 + index * 400} 
                              />
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Ownership:</span>
                            <span className="font-medium">
                              <TerminalText 
                                text={formatDisplayValue(property.ownership)} 
                                isAnimating={refreshingSections.property || false} 
                                delay={500 + index * 400} 
                              />
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Purchase Date:</span>
                            <span className="font-medium">
                              <TerminalText 
                                text={formatDisplayValue(property.purchaseDate)} 
                                isAnimating={refreshingSections.property || false} 
                                delay={600 + index * 400} 
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No property holdings found
                    </div>
                  )}
                </div>
              </AccordionSection>

              {/* Legal & Litigation */}
              <AccordionSection sectionId="legal" title="Legal & Litigation" icon={Scale} creditCost={2.9}>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Criminal Record:</span>
                    <span className="font-medium">
                      {editingSections.legal ? (
                        <EditableText
                          value={reportData.legalRecords.criminalRecord}
                          isEditing={true}
                          onSave={(value) => handleSaveField('legal', 'criminalRecord', value)}
                        />
                      ) : (
                        <TerminalText 
                          text={formatDisplayValue(reportData.legalRecords.criminalRecord)} 
                          isAnimating={refreshingSections.legal || false} 
                          delay={200} 
                        />
                      )}
                    </span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-gray-600">Active Lawsuits:</span>
                    <span className="font-medium text-right max-w-xs">
                      {editingSections.legal ? (
                        <EditableText
                          value={reportData.legalRecords.activeLawsuits}
                          isEditing={true}
                          onSave={(value) => handleSaveField('legal', 'activeLawsuits', value)}
                          multiline
                        />
                      ) : (
                        <TerminalText 
                          text={formatDisplayValue(reportData.legalRecords.activeLawsuits)} 
                          isAnimating={refreshingSections.legal || false} 
                          delay={400} 
                        />
                      )}
                    </span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-gray-600">Regulatory Violations:</span>
                    <span className="font-medium text-right max-w-xs">
                      {editingSections.legal ? (
                        <EditableText
                          value={reportData.legalRecords.regulatoryViolations}
                          isEditing={true}
                          onSave={(value) => handleSaveField('legal', 'regulatoryViolations', value)}
                          multiline
                        />
                      ) : (
                        <TerminalText 
                          text={formatDisplayValue(reportData.legalRecords.regulatoryViolations)} 
                          isAnimating={refreshingSections.legal || false} 
                          delay={600} 
                        />
                      )}
                    </span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-gray-600">Civil Cases:</span>
                    <span className="font-medium text-right max-w-xs">
                      {editingSections.legal ? (
                        <EditableText
                          value={reportData.legalRecords.civilCases}
                          isEditing={true}
                          onSave={(value) => handleSaveField('legal', 'civilCases', value)}
                          multiline
                        />
                      ) : (
                        <TerminalText 
                          text={formatDisplayValue(reportData.legalRecords.civilCases)} 
                          isAnimating={refreshingSections.legal || false} 
                          delay={800} 
                        />
                      )}
                    </span>
                  </div>
                </div>
              </AccordionSection>

              {/* Online Presence */}
              <AccordionSection sectionId="online" title="Online Presence" icon={Search} creditCost={2.7}>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Social Media:</span>
                    <span className="font-medium">
                      {editingSections.online ? (
                        <EditableText
                          value={reportData.onlinePresence.socialMedia}
                          isEditing={true}
                          onSave={(value) => handleSaveField('online', 'socialMedia', value)}
                        />
                      ) : (
                        <TerminalText 
                          text={formatDisplayValue(reportData.onlinePresence.socialMedia)} 
                          isAnimating={refreshingSections.online || false} 
                          delay={200} 
                        />
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Email Accounts:</span>
                    <span className="font-medium">
                      {editingSections.online ? (
                        <EditableText
                          value={reportData.onlinePresence.emailAccounts}
                          isEditing={true}
                          onSave={(value) => handleSaveField('online', 'emailAccounts', value)}
                        />
                      ) : (
                        <TerminalText 
                          text={formatDisplayValue(reportData.onlinePresence.emailAccounts)} 
                          isAnimating={refreshingSections.online || false} 
                          delay={400} 
                        />
                      )}
                    </span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-gray-600">Digital Footprint:</span>
                    <span className="font-medium text-right max-w-xs">
                      {editingSections.online ? (
                        <EditableText
                          value={reportData.onlinePresence.digitalFootprint}
                          isEditing={true}
                          onSave={(value) => handleSaveField('online', 'digitalFootprint', value)}
                          multiline
                        />
                      ) : (
                        <TerminalText 
                          text={formatDisplayValue(reportData.onlinePresence.digitalFootprint)} 
                          isAnimating={refreshingSections.online || false} 
                          delay={600} 
                        />
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Communication Methods:</span>
                    <span className="font-medium">
                      {editingSections.online ? (
                        <EditableText
                          value={reportData.onlinePresence.communicationMethods}
                          isEditing={true}
                          onSave={(value) => handleSaveField('online', 'communicationMethods', value)}
                        />
                      ) : (
                        <TerminalText 
                          text={formatDisplayValue(reportData.onlinePresence.communicationMethods)} 
                          isAnimating={refreshingSections.online || false} 
                          delay={800} 
                        />
                      )}
                    </span>
                  </div>
                </div>
              </AccordionSection>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 mt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">This document contains sensitive information and is intended for authorized personnel only.</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs font-medium text-gray-900">{reportData.classification}</p>
              <p className="text-xs text-gray-500">Page 1 of 1</p>
            </div>
          </div>
        </div>
        
        {/* Classification marks */}
        <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
      </div>
    </ScrollArea>
  )
}

// Helper functions for PDF generation
function generatePersonalInfoContent(reportData: ReportData): string {
  const info = reportData.personalInformation
  return `DOB: ${formatDisplayValue(info.dob)}
Nationality: ${formatDisplayValue(info.nationality)}
Known Aliases: ${formatDisplayValue(info.aliases.join(", "))}
Current Location: ${formatDisplayValue(info.currentLocation)}
Education: ${formatDisplayValue(info.education)}
Languages: ${formatDisplayValue(info.languages.join(", "))}`
}

function generateSocialMediaContent(reportData: ReportData): string {
  if (reportData.socialMediaProfiles.length === 0) return "No social media profiles found"
  
  return reportData.socialMediaProfiles.map(profile => 
    `${profile.platform}: ${formatDisplayValue(profile.handle)} (${formatDisplayValue(profile.followers)} followers)`
  ).join("\n")
}

function generateFinancialContent(reportData: ReportData): string {
  const assets = reportData.financialAssets
  return `Net Worth: ${formatDisplayValue(assets.netWorth)}
Bank Accounts: ${formatDisplayValue(assets.bankAccounts)}
Investments: ${formatDisplayValue(assets.investments)}
Crypto Holdings: ${formatDisplayValue(assets.cryptoHoldings)}
Offshore Accounts: ${formatDisplayValue(assets.offshoreAccounts)}
Annual Income: ${formatDisplayValue(assets.annualIncome)}`
}

function generateBusinessContent(reportData: ReportData): string {
  if (reportData.businessInterests.length === 0) return "No business interests found"
  
  return reportData.businessInterests.map(business => 
    `${formatDisplayValue(business.name)} - ${formatDisplayValue(business.role)} (${formatDisplayValue(business.revenue)})`
  ).join("\n")
}

function generatePropertyContent(reportData: ReportData): string {
  if (reportData.propertyHoldings.length === 0) return "No property holdings found"
  
  return reportData.propertyHoldings.map(property => 
    `${formatDisplayValue(property.address)} - ${formatDisplayValue(property.type)} (${formatDisplayValue(property.value)})`
  ).join("\n")
}

function generateLegalContent(reportData: ReportData): string {
  const legal = reportData.legalRecords
  return `Criminal Record: ${formatDisplayValue(legal.criminalRecord)}
Active Lawsuits: ${formatDisplayValue(legal.activeLawsuits)}
Regulatory Violations: ${formatDisplayValue(legal.regulatoryViolations)}
Civil Cases: ${formatDisplayValue(legal.civilCases)}`
}

function generateOnlinePresenceContent(reportData: ReportData): string {
  const online = reportData.onlinePresence
  return `Social Media: ${formatDisplayValue(online.socialMedia)}
Email Accounts: ${formatDisplayValue(online.emailAccounts)}
Digital Footprint: ${formatDisplayValue(online.digitalFootprint)}
Communication Methods: ${formatDisplayValue(online.communicationMethods)}`
}
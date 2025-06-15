'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
  Mail
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { generateReportPDF, sampleReportData } from "@/lib/pdf-generator"

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
  creditCost = 2.5
}: AccordionSectionProps) {
  return (
    <div className="mb-3 bg-white border border-gray-200 rounded-lg">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full p-4 transition-colors hover:bg-gray-50"
      >
        <div className="flex items-center space-x-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        </div>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && (
        <div className="px-4 pb-4">
          <div className="mb-3">
            {children}
          </div>
          
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
              <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors" title="Edit">
                <Edit size={14} className="text-gray-600" />
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

export function ReportDocument() {
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

  const handleDownloadPDF = () => {
    // In a real application, you would gather the actual report data
    // For now, we'll use the sample data structure
    const reportData = {
      ...sampleReportData,
      targetName: 'Investigation Target', // This would come from the actual form/data
      targetEmail: 'target@example.com', // This would come from the actual form/data
      targetLinkedIn: 'linkedin.com/in/target', // This would come from the actual form/data
      dateGenerated: new Date().toLocaleDateString(),
    }
    
    generateReportPDF(reportData)
  }

  const socialIcons = [
    { Icon: Twitter, active: true },
    { Icon: Linkedin, active: true },
    { Icon: Github, active: false },
    { Icon: Facebook, active: true },
    { Icon: Instagram, active: true },
    { Icon: Mail, active: true }
  ]

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
                  <p className="text-xs text-gray-500">Case: TGI-2024-001</p>
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
                <h2 className="mb-2 text-lg font-medium text-gray-900">Investigation Target</h2>
                <p className="text-sm text-gray-600 mb-2">Enter target information to begin intelligence gathering</p>
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
                <User className="h-12 w-12 text-gray-400" />
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
              >
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Waiting for target information to begin analysis...</p>
                  <p className="text-xs">This section will contain basic demographic information, education, and background details.</p>
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
              >
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Social media analysis will appear here...</p>
                  <p className="text-xs">This section will analyze social media profiles, posts, connections, and digital behavior patterns.</p>
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
              >
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Financial analysis pending...</p>
                  <p className="text-xs">This section will contain information about assets, investments, income, and financial indicators.</p>
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
              >
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Business intelligence gathering...</p>
                  <p className="text-xs">This section will detail corporate affiliations, business ventures, and professional networks.</p>
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
              >
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Property research in progress...</p>
                  <p className="text-xs">This section will show real estate ownership, property values, and asset holdings.</p>
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
              >
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Legal records analysis...</p>
                  <p className="text-xs">This section will contain court records, litigation history, and legal proceedings.</p>
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
              >
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Digital footprint mapping...</p>
                  <p className="text-xs">This section will track online presence, digital activities, and web-based information.</p>
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
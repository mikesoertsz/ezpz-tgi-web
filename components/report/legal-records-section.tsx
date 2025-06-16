'use client'

import { LegalRecord } from "@/lib/report-data"
import { TerminalText } from "./terminal-text"
import { EditableText } from "./editable-text"

interface LegalRecordsSectionProps {
  data: LegalRecord
  isEditing: boolean
  isRefreshing: boolean
  onSave: (field: string, value: string) => void
}

export function LegalRecordsSection({
  data,
  isEditing,
  isRefreshing,
  onSave
}: LegalRecordsSectionProps) {
  return (
    <div className="space-y-3 text-sm">
      <div className="flex items-start gap-2">
        <span className="text-gray-600 min-w-[120px]">Criminal Record:</span>
        {isEditing ? (
          <EditableText
            value={data.criminalRecord}
            isEditing={true}
            onSave={(value) => onSave('criminalRecord', value)}
            className="flex-1"
          />
        ) : (
          <TerminalText 
            text={data.criminalRecord} 
            isAnimating={isRefreshing} 
            delay={200}
            className="flex-1 font-medium"
          />
        )}
      </div>
      
      <div className="flex items-start gap-2">
        <span className="text-gray-600 min-w-[120px]">Active Lawsuits:</span>
        {isEditing ? (
          <EditableText
            value={data.activeLawsuits}
            isEditing={true}
            onSave={(value) => onSave('activeLawsuits', value)}
            className="flex-1"
            multiline
          />
        ) : (
          <TerminalText 
            text={data.activeLawsuits} 
            isAnimating={isRefreshing} 
            delay={400}
            className="flex-1 font-medium"
          />
        )}
      </div>
      
      <div className="flex items-start gap-2">
        <span className="text-gray-600 min-w-[140px]">Regulatory Violations:</span>
        {isEditing ? (
          <EditableText
            value={data.regulatoryViolations}
            isEditing={true}
            onSave={(value) => onSave('regulatoryViolations', value)}
            className="flex-1"
            multiline
          />
        ) : (
          <TerminalText 
            text={data.regulatoryViolations} 
            isAnimating={isRefreshing} 
            delay={600}
            className="flex-1 font-medium"
          />
        )}
      </div>
      
      <div className="flex items-start gap-2">
        <span className="text-gray-600 min-w-[100px]">Civil Cases:</span>
        {isEditing ? (
          <EditableText
            value={data.civilCases}
            isEditing={true}
            onSave={(value) => onSave('civilCases', value)}
            className="flex-1"
            multiline
          />
        ) : (
          <TerminalText 
            text={data.civilCases} 
            isAnimating={isRefreshing} 
            delay={800}
            className="flex-1 font-medium"
          />
        )}
      </div>
    </div>
  )
}
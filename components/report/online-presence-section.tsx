'use client'

import { OnlinePresence } from "@/lib/report-data"
import { TerminalText } from "./terminal-text"
import { EditableText } from "./editable-text"

interface OnlinePresenceSectionProps {
  data: OnlinePresence
  isEditing: boolean
  isRefreshing: boolean
  onSave: (field: string, value: string) => void
}

export function OnlinePresenceSection({
  data,
  isEditing,
  isRefreshing,
  onSave
}: OnlinePresenceSectionProps) {
  return (
    <div className="space-y-3 text-sm">
      <div className="flex items-start gap-2">
        <span className="text-gray-600 min-w-[100px]">Social Media:</span>
        {isEditing ? (
          <EditableText
            value={data.socialMedia}
            isEditing={true}
            onSave={(value) => onSave('socialMedia', value)}
            className="flex-1"
          />
        ) : (
          <TerminalText 
            text={data.socialMedia} 
            isAnimating={isRefreshing} 
            delay={200}
            className="flex-1 font-medium"
          />
        )}
      </div>
      
      <div className="flex items-start gap-2">
        <span className="text-gray-600 min-w-[120px]">Email Accounts:</span>
        {isEditing ? (
          <EditableText
            value={data.emailAccounts}
            isEditing={true}
            onSave={(value) => onSave('emailAccounts', value)}
            className="flex-1"
          />
        ) : (
          <TerminalText 
            text={data.emailAccounts} 
            isAnimating={isRefreshing} 
            delay={400}
            className="flex-1 font-medium"
          />
        )}
      </div>
      
      <div className="flex items-start gap-2">
        <span className="text-gray-600 min-w-[120px]">Digital Footprint:</span>
        {isEditing ? (
          <EditableText
            value={data.digitalFootprint}
            isEditing={true}
            onSave={(value) => onSave('digitalFootprint', value)}
            className="flex-1"
            multiline
          />
        ) : (
          <TerminalText 
            text={data.digitalFootprint} 
            isAnimating={isRefreshing} 
            delay={600}
            className="flex-1 font-medium"
          />
        )}
      </div>
      
      <div className="flex items-start gap-2">
        <span className="text-gray-600 min-w-[160px]">Communication Methods:</span>
        {isEditing ? (
          <EditableText
            value={data.communicationMethods}
            isEditing={true}
            onSave={(value) => onSave('communicationMethods', value)}
            className="flex-1"
          />
        ) : (
          <TerminalText 
            text={data.communicationMethods} 
            isAnimating={isRefreshing} 
            delay={800}
            className="flex-1 font-medium"
          />
        )}
      </div>
    </div>
  )
}
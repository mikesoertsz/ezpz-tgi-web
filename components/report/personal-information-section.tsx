'use client'

import { PersonalInformation } from "@/lib/report-data"
import { TerminalText } from "./terminal-text"
import { EditableText } from "./editable-text"
import { Calendar, MapPin, GraduationCap, Languages, Users } from "lucide-react"

interface PersonalInformationSectionProps {
  data: PersonalInformation
  isEditing: boolean
  isRefreshing: boolean
  onSave: (field: string, value: any) => void
}

export function PersonalInformationSection({
  data,
  isEditing,
  isRefreshing,
  onSave
}: PersonalInformationSectionProps) {
  return (
    <div className="space-y-3 text-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-3 w-3 text-gray-500 flex-shrink-0" />
          <span className="text-gray-600 min-w-[60px]">DOB:</span>
          {isEditing ? (
            <EditableText
              value={data.dob}
              isEditing={true}
              onSave={(value) => onSave('dob', value)}
              className="flex-1"
            />
          ) : (
            <TerminalText 
              text={data.dob} 
              isAnimating={isRefreshing} 
              delay={200}
              className="flex-1 font-medium"
            />
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <MapPin className="h-3 w-3 text-gray-500 flex-shrink-0" />
          <span className="text-gray-600 min-w-[80px]">Nationality:</span>
          {isEditing ? (
            <EditableText
              value={data.nationality}
              isEditing={true}
              onSave={(value) => onSave('nationality', value)}
              className="flex-1"
            />
          ) : (
            <TerminalText 
              text={data.nationality} 
              isAnimating={isRefreshing} 
              delay={400}
              className="flex-1 font-medium"
            />
          )}
        </div>
      </div>
      
      <div className="flex items-start gap-2">
        <Users className="h-3 w-3 text-gray-500 flex-shrink-0 mt-0.5" />
        <span className="text-gray-600 min-w-[100px]">Known Aliases:</span>
        {isEditing ? (
          <EditableText
            value={data.aliases.join(", ")}
            isEditing={true}
            onSave={(value) => onSave('aliases', value.split(", ").filter(Boolean))}
            className="flex-1"
          />
        ) : (
          <TerminalText 
            text={data.aliases.join(", ")} 
            isAnimating={isRefreshing} 
            delay={600}
            className="flex-1 font-medium"
          />
        )}
      </div>
      
      <div className="flex items-start gap-2">
        <MapPin className="h-3 w-3 text-gray-500 flex-shrink-0 mt-0.5" />
        <span className="text-gray-600 min-w-[120px]">Current Location:</span>
        {isEditing ? (
          <EditableText
            value={data.currentLocation}
            isEditing={true}
            onSave={(value) => onSave('currentLocation', value)}
            className="flex-1"
          />
        ) : (
          <TerminalText 
            text={data.currentLocation} 
            isAnimating={isRefreshing} 
            delay={800}
            className="flex-1 font-medium"
          />
        )}
      </div>
      
      <div className="flex items-start gap-2">
        <GraduationCap className="h-3 w-3 text-gray-500 flex-shrink-0 mt-0.5" />
        <span className="text-gray-600 min-w-[80px]">Education:</span>
        {isEditing ? (
          <EditableText
            value={data.education}
            isEditing={true}
            onSave={(value) => onSave('education', value)}
            className="flex-1"
            multiline
          />
        ) : (
          <TerminalText 
            text={data.education} 
            isAnimating={isRefreshing} 
            delay={1000}
            className="flex-1 font-medium"
          />
        )}
      </div>
      
      <div className="flex items-start gap-2">
        <Languages className="h-3 w-3 text-gray-500 flex-shrink-0 mt-0.5" />
        <span className="text-gray-600 min-w-[80px]">Languages:</span>
        {isEditing ? (
          <EditableText
            value={data.languages.join(", ")}
            isEditing={true}
            onSave={(value) => onSave('languages', value.split(", ").filter(Boolean))}
            className="flex-1"
          />
        ) : (
          <TerminalText 
            text={data.languages.join(", ")} 
            isAnimating={isRefreshing} 
            delay={1200}
            className="flex-1 font-medium"
          />
        )}
      </div>
    </div>
  )
}
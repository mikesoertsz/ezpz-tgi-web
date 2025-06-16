'use client'

import { SocialMediaProfile } from "@/lib/report-data"
import { formatDisplayValue } from "@/lib/report-data"
import { ExternalLink, Twitter, Linkedin, Facebook, Instagram, Youtube, MessageCircle, Globe } from "lucide-react"

interface SocialMediaSectionProps {
  profiles: SocialMediaProfile[]
}

export function SocialMediaSection({ profiles }: SocialMediaSectionProps) {
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

  if (profiles.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No social media profiles found
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {profiles.map((profile, index) => {
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
                  <span>{formatDisplayValue(profile.handle)}</span>
                  {profile.url && <ExternalLink size={12} />}
                </a>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Followers:</span>
                <span className="font-medium text-gray-900">{formatDisplayValue(profile.followers)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Last Active:</span>
                <span className="text-gray-700">{formatDisplayValue(profile.lastActive)}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
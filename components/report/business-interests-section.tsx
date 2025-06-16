'use client'

import { BusinessInterest } from "@/lib/report-data"
import { formatDisplayValue } from "@/lib/report-data"

interface BusinessInterestsSectionProps {
  businesses: BusinessInterest[]
}

export function BusinessInterestsSection({ businesses }: BusinessInterestsSectionProps) {
  if (businesses.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No business interests found
      </div>
    )
  }

  return (
    <div className="space-y-4 text-sm">
      {businesses.map((business, index) => (
        <div key={index} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
          <div className="font-medium text-gray-900 mb-2">
            {formatDisplayValue(business.name)}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 min-w-[60px]">Role:</span>
              <span className="flex-1 font-medium">{formatDisplayValue(business.role)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 min-w-[70px]">Location:</span>
              <span className="flex-1 font-medium">{formatDisplayValue(business.location)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 min-w-[70px]">Revenue:</span>
              <span className="flex-1 font-medium">{formatDisplayValue(business.revenue)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 min-w-[80px]">Ownership:</span>
              <span className="flex-1 font-medium">{formatDisplayValue(business.ownership)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
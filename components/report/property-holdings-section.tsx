'use client'

import { PropertyHolding } from "@/lib/report-data"
import { formatDisplayValue } from "@/lib/report-data"

interface PropertyHoldingsSectionProps {
  properties: PropertyHolding[]
}

export function PropertyHoldingsSection({ properties }: PropertyHoldingsSectionProps) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No property holdings found
      </div>
    )
  }

  return (
    <div className="space-y-4 text-sm">
      {properties.map((property, index) => (
        <div key={index} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
          <div className="font-medium text-gray-900 mb-2">
            {formatDisplayValue(property.address)}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 min-w-[60px]">Type:</span>
              <span className="flex-1 font-medium">{formatDisplayValue(property.type)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 min-w-[60px]">Value:</span>
              <span className="flex-1 font-medium">{formatDisplayValue(property.value)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 min-w-[80px]">Ownership:</span>
              <span className="flex-1 font-medium">{formatDisplayValue(property.ownership)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 min-w-[100px]">Purchase Date:</span>
              <span className="flex-1 font-medium">{formatDisplayValue(property.purchaseDate)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
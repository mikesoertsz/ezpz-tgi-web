'use client'

import { FinancialAssets } from "@/lib/report-data"
import { TerminalText } from "./terminal-text"
import { EditableText } from "./editable-text"

interface FinancialAssetsSectionProps {
  data: FinancialAssets
  isEditing: boolean
  isRefreshing: boolean
  onSave: (field: string, value: string) => void
}

export function FinancialAssetsSection({
  data,
  isEditing,
  isRefreshing,
  onSave
}: FinancialAssetsSectionProps) {
  return (
    <div className="space-y-3 text-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 min-w-[80px]">Net Worth:</span>
          {isEditing ? (
            <EditableText
              value={data.netWorth}
              isEditing={true}
              onSave={(value) => onSave('netWorth', value)}
              className="flex-1"
            />
          ) : (
            <TerminalText 
              text={data.netWorth} 
              isAnimating={isRefreshing} 
              delay={200}
              className="flex-1 font-medium"
            />
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-gray-600 min-w-[100px]">Annual Income:</span>
          {isEditing ? (
            <EditableText
              value={data.annualIncome}
              isEditing={true}
              onSave={(value) => onSave('annualIncome', value)}
              className="flex-1"
            />
          ) : (
            <TerminalText 
              text={data.annualIncome} 
              isAnimating={isRefreshing} 
              delay={400}
              className="flex-1 font-medium"
            />
          )}
        </div>
      </div>
      
      <div className="flex items-start gap-2">
        <span className="text-gray-600 min-w-[120px]">Bank Accounts:</span>
        {isEditing ? (
          <EditableText
            value={data.bankAccounts}
            isEditing={true}
            onSave={(value) => onSave('bankAccounts', value)}
            className="flex-1"
            multiline
          />
        ) : (
          <TerminalText 
            text={data.bankAccounts} 
            isAnimating={isRefreshing} 
            delay={600}
            className="flex-1 font-medium"
          />
        )}
      </div>
      
      <div className="flex items-start gap-2">
        <span className="text-gray-600 min-w-[100px]">Investments:</span>
        {isEditing ? (
          <EditableText
            value={data.investments}
            isEditing={true}
            onSave={(value) => onSave('investments', value)}
            className="flex-1"
            multiline
          />
        ) : (
          <TerminalText 
            text={data.investments} 
            isAnimating={isRefreshing} 
            delay={800}
            className="flex-1 font-medium"
          />
        )}
      </div>
      
      <div className="flex items-start gap-2">
        <span className="text-gray-600 min-w-[120px]">Crypto Holdings:</span>
        {isEditing ? (
          <EditableText
            value={data.cryptoHoldings}
            isEditing={true}
            onSave={(value) => onSave('cryptoHoldings', value)}
            className="flex-1"
          />
        ) : (
          <TerminalText 
            text={data.cryptoHoldings} 
            isAnimating={isRefreshing} 
            delay={1000}
            className="flex-1 font-medium"
          />
        )}
      </div>
      
      <div className="flex items-start gap-2">
        <span className="text-gray-600 min-w-[140px]">Offshore Accounts:</span>
        {isEditing ? (
          <EditableText
            value={data.offshoreAccounts}
            isEditing={true}
            onSave={(value) => onSave('offshoreAccounts', value)}
            className="flex-1"
          />
        ) : (
          <TerminalText 
            text={data.offshoreAccounts} 
            isAnimating={isRefreshing} 
            delay={1200}
            className="flex-1 font-medium"
          />
        )}
      </div>
    </div>
  )
}
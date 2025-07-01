import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export function useProfileUpdate() {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updatePersonalInfo = async (reportId: string, personalInfo: any) => {
    setUpdating(true)
    setError(null)

    try {
      const supabase = createClient()
      
      // First, get the current data
      const { data: currentData, error: fetchError } = await supabase
        .from('profiles')
        .select('ai_summary')
        .eq('execution_id', reportId)
        .single()

      if (fetchError) {
        throw fetchError
      }

      // Update the ai_summary with new personal information
      const updatedAiSummary = {
        ...currentData.ai_summary,
        personal_info: personalInfo
      }

      // Save back to database
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ ai_summary: updatedAiSummary })
        .eq('execution_id', reportId)

      if (updateError) {
        throw updateError
      }

      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return false
    } finally {
      setUpdating(false)
    }
  }

  return { updatePersonalInfo, updating, error }
} 
'use client'

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface EditableTextProps {
  value: string | null
  isEditing: boolean
  onSave: (newValue: string) => void
  className?: string
  multiline?: boolean
}

export function EditableText({ 
  value, 
  isEditing, 
  onSave, 
  className = "",
  multiline = false 
}: EditableTextProps) {
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

  return <span className={className}>{value || 'Not available'}</span>
}
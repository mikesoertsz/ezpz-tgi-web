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
  fieldType?: 'text' | 'date'
}

export function EditableText({ 
  value, 
  isEditing, 
  onSave, 
  className = "",
  multiline = false,
  fieldType = 'text'
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
    if (multiline) {
      return (
        <Textarea
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          className={`bg-blue-50 border-blue-300 ${className}`}
          rows={3}
        />
      )
    }
    
    if (fieldType === 'date') {
      // Convert display format back to ISO date for input
      const getDateValue = () => {
        if (!editValue) return '';
        try {
          const date = new Date(editValue);
          if (isNaN(date.getTime())) return '';
          return date.toISOString().split('T')[0];
        } catch {
          return '';
        }
      };

      return (
        <Input
          type="date"
          value={getDateValue()}
          onChange={(e) => {
            const dateValue = e.target.value;
            if (dateValue) {
              // Format date to a readable format for display and storage
              const date = new Date(dateValue);
              const formatted = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'UTC'
              });
              setEditValue(formatted);
            } else {
              setEditValue('');
            }
          }}
          onBlur={handleBlur}
          className={`bg-blue-50 border-blue-300 ${className}`}
        />
      )
    }
    
    return (
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
'use client'

import { useState, useEffect } from "react"

interface TerminalTextProps {
  text: string | null
  isAnimating: boolean
  delay?: number
  className?: string
}

export function TerminalText({ 
  text, 
  isAnimating, 
  delay = 0,
  className = ""
}: TerminalTextProps) {
  const [displayText, setDisplayText] = useState(text || '')
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (isAnimating && text) {
      const timer = setTimeout(() => {
        setIsTyping(true)
        setDisplayText('')
        
        let currentIndex = 0
        const typeInterval = setInterval(() => {
          if (currentIndex < text.length) {
            setDisplayText(text.substring(0, currentIndex + 1))
            currentIndex++
          } else {
            clearInterval(typeInterval)
            setIsTyping(false)
          }
        }, 50)

        return () => clearInterval(typeInterval)
      }, delay)

      return () => clearTimeout(timer)
    } else {
      setDisplayText(text || '')
      setIsTyping(false)
    }
  }, [isAnimating, text, delay])

  return (
    <span className={`${isTyping ? 'bg-blue-50' : ''} transition-colors duration-200 ${className}`}>
      {displayText}
      {isTyping && <span className="animate-pulse">|</span>}
    </span>
  )
}
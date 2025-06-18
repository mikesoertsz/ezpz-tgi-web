import jsPDF from 'jspdf'

interface ReportSection {
  title: string
  content: string | null
  hasData: boolean
}

interface ReportData {
  caseNumber: string
  classification: string
  targetName: string
  targetEmail?: string
  targetLinkedIn?: string
  dateGenerated: string
  sections: ReportSection[]
}

export function generateReportPDF(reportData: ReportData) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  const contentWidth = pageWidth - (margin * 2)
  let yPosition = margin

  // Helper function to add text with word wrapping
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 10) => {
    doc.setFontSize(fontSize)
    const lines = doc.splitTextToSize(text, maxWidth)
    doc.text(lines, x, y)
    return y + (lines.length * (fontSize * 0.4))
  }

  // Helper function to check if we need a new page
  const checkPageBreak = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      doc.addPage()
      yPosition = margin
      return true
    }
    return false
  }

  // Header with classification bar
  doc.setFillColor(220, 53, 69) // Red color for classification
  doc.rect(0, 0, pageWidth, 8, 'F')

  // Title and case information
  yPosition = 25
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('INTELLIGENCE BRIEFING', margin, yPosition)
  
  yPosition += 10
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.text(`Case: ${reportData.caseNumber}`, margin, yPosition)
  
  yPosition += 8
  doc.setFillColor(248, 215, 218) // Light red background
  doc.rect(margin, yPosition - 5, 60, 12, 'F')
  doc.setTextColor(185, 28, 28) // Dark red text
  doc.setFont('helvetica', 'bold')
  doc.text(reportData.classification, margin + 3, yPosition + 2)
  
  // Reset text color
  doc.setTextColor(0, 0, 0)
  doc.setFont('helvetica', 'normal')
  
  yPosition += 15
  doc.text(`Generated: ${reportData.dateGenerated}`, pageWidth - margin - 60, yPosition)

  // Subject Information
  yPosition += 20
  checkPageBreak(30)
  
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('SUBJECT INFORMATION', margin, yPosition)
  
  yPosition += 10
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text(`Target: ${reportData.targetName}`, margin, yPosition)
  
  if (reportData.targetEmail) {
    yPosition += 6
    doc.text(`Email: ${reportData.targetEmail}`, margin, yPosition)
  }
  
  if (reportData.targetLinkedIn) {
    yPosition += 6
    doc.text(`LinkedIn: ${reportData.targetLinkedIn}`, margin, yPosition)
  }

  // Sections
  yPosition += 20
  
  reportData.sections.forEach((section, index) => {
    checkPageBreak(40)
    
    // Section header
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text(`${index + 1}. ${section.title.toUpperCase()}`, margin, yPosition)
    
    yPosition += 8
    
    // Section content
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    
    if (section.hasData && section.content) {
      yPosition = addWrappedText(section.content, margin + 5, yPosition, contentWidth - 5, 10)
    } else {
      doc.setTextColor(128, 128, 128) // Gray color for "Section not filled"
      doc.setFont('helvetica', 'italic')
      doc.text('Section not filled', margin + 5, yPosition)
      doc.setTextColor(0, 0, 0) // Reset to black
      doc.setFont('helvetica', 'normal')
      yPosition += 6
    }
    
    yPosition += 10
  })

  // Footer
  checkPageBreak(30)
  yPosition = pageHeight - 30
  
  // Classification footer bar
  doc.setFillColor(220, 53, 69)
  doc.rect(0, pageHeight - 8, pageWidth, 8, 'F')
  
  doc.setFontSize(8)
  doc.setTextColor(128, 128, 128)
  doc.text('This document contains sensitive information and is intended for authorized personnel only.', margin, yPosition)
  
  yPosition += 8
  doc.text(reportData.classification, margin, yPosition)
  doc.text('Page 1 of 1', pageWidth - margin - 30, yPosition)

  // Generate filename
  const sanitizedTargetName = reportData.targetName.replace(/[^a-zA-Z0-9]/g, '_')
  const filename = `Intelligence_Report_${sanitizedTargetName}_${reportData.caseNumber}.pdf`
  
  // Download the PDF
  doc.save(filename)
}

// Sample data structure for testing
export const sampleReportData: ReportData = {
  caseNumber: '2024-001',
  classification: 'CONFIDENTIAL',
  targetName: 'Investigation Target',
  targetEmail: 'target@example.com',
  targetLinkedIn: 'linkedin.com/in/target',
  dateGenerated: new Date().toLocaleDateString(),
  sections: [
    {
      title: 'Personal Information',
      content: 'Basic demographic information, education background, and personal details would appear here when available.',
      hasData: false
    },
    {
      title: 'Social Media Intelligence',
      content: 'Analysis of social media profiles, posting patterns, connections, and digital behavior across platforms.',
      hasData: false
    },
    {
      title: 'Financial Assets',
      content: 'Information about financial holdings, investments, income sources, and economic indicators.',
      hasData: false
    },
    {
      title: 'Business Interests',
      content: 'Corporate affiliations, business ventures, professional networks, and commercial activities.',
      hasData: false
    },
    {
      title: 'Property Holdings',
      content: 'Real estate ownership, property values, asset holdings, and related financial information.',
      hasData: false
    },
    {
      title: 'Legal & Litigation',
      content: 'Court records, legal proceedings, litigation history, and regulatory compliance information.',
      hasData: false
    },
    {
      title: 'Online Presence',
      content: 'Digital footprint analysis, web presence mapping, and online activity patterns.',
      hasData: false
    }
  ]
}
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Download } from "lucide-react"
import { useState } from "react"

interface GeneratedOutputProps {
  data: {
    projectTitle: string
    organizationName: string
    role: string
    startDate: string
    endDate: string
    totalHours: string
    generatedExperience: string
  }
}

export function GeneratedOutput({ data }: GeneratedOutputProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const fullText = `Project Title: ${data.projectTitle}
Organization: ${data.organizationName}
Role: ${data.role}
Duration: ${data.startDate} to ${data.endDate}
Hours Worked: ${data.totalHours}

${data.generatedExperience}`

    await navigator.clipboard.writeText(fullText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const fullText = `Project Title: ${data.projectTitle}
Organization: ${data.organizationName}
Role: ${data.role}
Duration: ${data.startDate} to ${data.endDate}
Hours Worked: ${data.totalHours}

${data.generatedExperience}`

    const blob = new Blob([fullText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `pmp-experience-${data.projectTitle.toLowerCase().replace(/\s+/g, "-")}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Generated Experience Summary</CardTitle>
            <CardDescription>Your PMI-compliant experience entry is ready</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="h-4 w-4 mr-2" />
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Project:</span>
              <p className="font-medium">{data.projectTitle}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Organization:</span>
              <p className="font-medium">{data.organizationName}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Role:</span>
              <p className="font-medium">{data.role}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Duration:</span>
              <p className="font-medium">
                {data.startDate} to {data.endDate}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Hours:</span>
              <p className="font-medium">{data.totalHours}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-sm leading-relaxed">{data.generatedExperience}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

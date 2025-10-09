"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { GeneratedOutput } from "./generated-output"

interface FormData {
  projectTitle: string
  organizationName: string
  startDate: string
  endDate: string
  totalHours: string
  role: string
  projectDescription: string
  deliverables: string
  challenges: string
  initiating: string
  planning: string
  executing: string
  monitoringControlling: string
  closing: string
}

interface GeneratedData {
  projectTitle: string
  organizationName: string
  role: string
  startDate: string
  endDate: string
  totalHours: string
  generatedExperience: string
}

export function ExperienceForm() {
  const [formData, setFormData] = useState<FormData>({
    projectTitle: "",
    organizationName: "",
    startDate: "",
    endDate: "",
    totalHours: "",
    role: "",
    projectDescription: "",
    deliverables: "",
    challenges: "",
    initiating: "",
    planning: "",
    executing: "",
    monitoringControlling: "",
    closing: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [generatedData, setGeneratedData] = useState<GeneratedData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setGeneratedData(null)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
      const response = await fetch(`${apiUrl}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to generate experience")
      }

      const result = await response.json()
      setGeneratedData(result.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Information */}
        <Card>
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
            <CardDescription>Basic details about your project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectTitle">Project Title</Label>
                <Input
                  id="projectTitle"
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleChange}
                  placeholder="e.g., Enterprise CRM Implementation"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organizationName">Organization Name</Label>
                <Input
                  id="organizationName"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  placeholder="e.g., Acme Corporation"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalHours">Total Hours</Label>
                <Input
                  id="totalHours"
                  name="totalHours"
                  value={formData.totalHours}
                  onChange={handleChange}
                  placeholder="e.g., 2000"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Your Role/Title</Label>
              <Input
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g., Project Manager"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectDescription">Project Description</Label>
              <Textarea
                id="projectDescription"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                placeholder="Describe the project scope, objectives, and context..."
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliverables">Key Deliverables</Label>
              <Textarea
                id="deliverables"
                name="deliverables"
                value={formData.deliverables}
                onChange={handleChange}
                placeholder="List the main deliverables and outcomes..."
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="challenges">Challenges Faced and Solutions</Label>
              <Textarea
                id="challenges"
                name="challenges"
                value={formData.challenges}
                onChange={handleChange}
                placeholder="Describe key challenges and how you addressed them..."
                rows={3}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Process Groups */}
        <Card>
          <CardHeader>
            <CardTitle>PMI Process Group Activities</CardTitle>
            <CardDescription>Describe your responsibilities across all five PMI process groups</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="initiating">Initiating</Label>
              <Textarea
                id="initiating"
                name="initiating"
                value={formData.initiating}
                onChange={handleChange}
                placeholder="e.g., Conducted stakeholder analysis, developed project charter..."
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="planning">Planning</Label>
              <Textarea
                id="planning"
                name="planning"
                value={formData.planning}
                onChange={handleChange}
                placeholder="e.g., Created WBS, developed schedule baseline, planned risk responses..."
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="executing">Executing</Label>
              <Textarea
                id="executing"
                name="executing"
                value={formData.executing}
                onChange={handleChange}
                placeholder="e.g., Led project team, managed stakeholder engagement..."
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="monitoringControlling">Monitoring & Controlling</Label>
              <Textarea
                id="monitoringControlling"
                name="monitoringControlling"
                value={formData.monitoringControlling}
                onChange={handleChange}
                placeholder="e.g., Tracked project performance, managed change requests..."
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="closing">Closing</Label>
              <Textarea
                id="closing"
                name="closing"
                value={formData.closing}
                onChange={handleChange}
                placeholder="e.g., Conducted lessons learned, obtained formal acceptance..."
                rows={3}
                required
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isLoading} className="min-w-[200px]">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Experience"
            )}
          </Button>
        </div>
      </form>

      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive">Error: {error}</p>
          </CardContent>
        </Card>
      )}

      {generatedData && <GeneratedOutput data={generatedData} />}
    </div>
  )
}

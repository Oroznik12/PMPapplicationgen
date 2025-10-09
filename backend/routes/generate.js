import express from "express"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

const router = express.Router()

// Validation schema
const projectSchema = z.object({
  projectTitle: z.string().min(1, "Project title is required"),
  organizationName: z.string().min(1, "Organization name is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  totalHours: z.string().min(1, "Total hours is required"),
  role: z.string().min(1, "Role is required"),
  projectDescription: z.string().min(1, "Project description is required"),
  deliverables: z.string().min(1, "Key deliverables are required"),
  challenges: z.string().min(1, "Challenges are required"),
  initiating: z.string().min(1, "Initiating activities are required"),
  planning: z.string().min(1, "Planning activities are required"),
  executing: z.string().min(1, "Executing activities are required"),
  monitoringControlling: z.string().min(1, "Monitoring & Controlling activities are required"),
  closing: z.string().min(1, "Closing activities are required"),
})

router.post("/", async (req, res) => {
  try {
    // Validate request body
    const validatedData = projectSchema.parse(req.body)

    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: "API key not configured",
        message: "Please set OPENAI_API_KEY in your environment variables",
      })
    }

    // Create the prompt for AI generation
    const prompt = `You are a PMP Application Experience Generator. Generate a professional, PMI-compliant experience summary for a PMP exam application.

Project Details:
- Project Title: ${validatedData.projectTitle}
- Organization: ${validatedData.organizationName}
- Role: ${validatedData.role}
- Duration: ${validatedData.startDate} to ${validatedData.endDate}
- Hours Worked: ${validatedData.totalHours}
- Project Description: ${validatedData.projectDescription}
- Key Deliverables: ${validatedData.deliverables}
- Challenges Faced: ${validatedData.challenges}

Process Group Activities:
- Initiating: ${validatedData.initiating}
- Planning: ${validatedData.planning}
- Executing: ${validatedData.executing}
- Monitoring & Controlling: ${validatedData.monitoringControlling}
- Closing: ${validatedData.closing}

Generate a professional PMP application experience entry that:
1. Focuses on project management responsibilities (not just technical work)
2. Covers all five PMI Process Groups clearly
3. Uses PMI language (stakeholder engagement, risk management, scope baseline, etc.)
4. Emphasizes leadership and decision-making
5. Is written professionally for PMP auditors

Format the output as follows:

**Project Summary**:
[3-5 sentence summary of project purpose, role, scope and value delivered]

**Process Group Responsibilities**:

**Initiating**:
[2-3 sentences describing initiating activities with PMI terminology]

**Planning**:
[2-3 sentences describing planning activities with PMI terminology]

**Executing**:
[2-3 sentences describing executing activities with PMI terminology]

**Monitoring & Controlling**:
[2-3 sentences describing monitoring & controlling activities with PMI terminology]

**Closing**:
[2-3 sentences describing closing activities with PMI terminology]

**Challenges Overcome**:
[2-3 sentences describing how challenges were addressed using project management skills]`

    // Generate the experience summary using AI
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: prompt,
      temperature: 0.7,
      maxTokens: 1500,
    })

    // Return the generated experience
    res.json({
      success: true,
      data: {
        projectTitle: validatedData.projectTitle,
        organizationName: validatedData.organizationName,
        role: validatedData.role,
        startDate: validatedData.startDate,
        endDate: validatedData.endDate,
        totalHours: validatedData.totalHours,
        generatedExperience: text,
      },
    })
  } catch (error) {
    console.error("Error generating experience:", error)

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Validation error",
        details: error.errors,
      })
    }

    // Handle other errors
    res.status(500).json({
      error: "Failed to generate experience",
      message: error.message,
    })
  }
})

export { router as generateExperienceRoute }

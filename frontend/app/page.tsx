import { ExperienceForm } from "@/components/experience-form"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-balance mb-3">PMP Experience Generator</h1>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Generate professional, PMI-compliant experience summaries for your PMP exam application. Fill in your
            project details and let AI craft a polished experience entry that covers all five process groups.
          </p>
        </div>
        <ExperienceForm />
      </main>
    </div>
  )
}

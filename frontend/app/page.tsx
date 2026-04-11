import { WorkOrderForm } from "@/components/work-order-form"
import { Toaster } from "@/components/ui/toaster"
import { Wrench, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <Wrench className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-lg leading-tight">HVAC Pro</h1>
                <p className="text-xs text-muted-foreground">Field Estimate Tool</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4 text-accent" />
              <span className="hidden sm:inline">Quick Estimates</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight">New Work Order</h2>
          <p className="text-muted-foreground">
            Create a detailed estimate for your customer in minutes
          </p>
        </div>
        <WorkOrderForm />
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-6">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground">
            HVAC Pro Field Estimate Tool • {new Date().getFullYear()}
          </p>
        </div>
      </footer>

      <Toaster />
    </div>
  )
}

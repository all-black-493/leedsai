import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
// import { primary } from "@/styles/colors" // Assuming primary color is defined here

export function Cta() {
  return (
    <section className="py-32 relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif font-normal text-white mb-8 tracking-tight text-balance">
            Stop chasing leads. <br /> Let them come to you.
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
            Join high-growth businesses using our AI to automate their customer acquisition and outreach.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button
              size="lg"
              className="rounded-full h-14 px-10 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Start Free Trial
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="rounded-full h-14 px-8 text-base text-muted-foreground hover:text-white hover:bg-white/5"
            >
              Contact Sales <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
    </section>
  )
}

import { Button } from "@/components/ui/button"
import { ArrowRight, PlayCircle } from "lucide-react"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-white/5 bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))]" />

      <div className="container mx-auto relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary mb-8 backdrop-blur-sm hover:bg-primary/20 transition-colors cursor-pointer">
            <span className="text-primary font-medium mr-2">New Feature</span>
            AI Lead Scoring is now live
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif font-normal tracking-tight text-white mb-8 text-balance">
            Turn conversations <br />
            <span className="text-primary">into customers.</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed text-balance font-light">
            Use AI to automate outreach, qualify leads, and drive sales 24/7 on Instagram, WhatsApp, and TikTok.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-20">
            <Button size="lg" className="rounded-full h-14 px-8 text-base w-full sm:w-auto font-medium">
              Start generating leads
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full h-14 px-8 text-base border-white/10 bg-transparent hover:bg-white/5 w-full sm:w-auto text-white"
            >
              <PlayCircle className="mr-2 h-4 w-4" />
              Watch the film
            </Button>
          </div>

          <div className="relative w-full max-w-6xl rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm shadow-2xl">
            <div className="rounded-lg overflow-hidden bg-[#0A0A0A] aspect-[16/9] md:aspect-[2.4/1] relative border border-white/5">
              <div className="h-12 border-b border-white/5 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-primary/20" />
                  <div className="w-3 h-3 rounded-full bg-primary/20" />
                  <div className="w-3 h-3 rounded-full bg-primary/20" />
                </div>
              </div>

              <div className="p-6 grid grid-cols-12 gap-6 h-full">
                <div className="col-span-2 hidden md:flex flex-col gap-4 border-r border-white/5 pr-6 h-4/5">
                  <div className="h-8 w-full bg-primary/10 border border-primary/20 rounded-md" />
                  <div className="space-y-2 mt-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-6 w-full bg-white/5 rounded-md opacity-40" />
                    ))}
                  </div>
                </div>

                <div className="col-span-12 md:col-span-10 flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <div className="h-8 w-48 bg-white/10 rounded-md" />
                    <div className="h-8 w-24 bg-white/5 rounded-md" />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-32 rounded-lg border border-white/5 bg-white/[0.02] p-4">
                        <div className="h-8 w-8 rounded-full bg-primary/20 mb-3" />
                        <div className="h-4 w-24 bg-white/10 rounded mb-2" />
                        <div className="h-10 w-full bg-white/5 rounded-md mt-auto" />
                      </div>
                    ))}
                  </div>

                  <div className="flex-1 rounded-lg border border-white/5 bg-white/[0.02] p-4 flex items-center justify-center">
                    <div className="text-center space-y-2 opacity-50">
                      <div className="h-12 w-12 rounded-full border border-primary/20 mx-auto flex items-center justify-center">
                        <div className="h-6 w-6 bg-primary/40 rounded-full" />
                      </div>
                      <div className="text-sm text-muted-foreground">Engagement metrics loading...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Stats } from "@/components/stats"
import { Cta } from "@/components/cta"
import { Footer } from "@/components/footer"
import { Pricing } from "@/components/pricing"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <SiteHeader />
      <Hero />
      <Stats />
      <Features />
      <Pricing />
      <Cta />
      <Footer />
    </main>
  )
}

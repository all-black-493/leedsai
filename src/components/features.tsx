import { Zap, BarChart3, Globe, ShieldCheck, MessageSquare, Users } from "lucide-react"

const features = [
  {
    title: "Smart Lead Generation",
    description: "Automatically identify and engage potential customers who interact with your content.",
    icon: Zap,
  },
  {
    title: "Automated Outreach",
    description: "Send personalized messages at scale to start conversations that convert.",
    icon: MessageSquare,
  },
  {
    title: "AI Qualification",
    description: "Let AI qualify leads before they reach your sales team, saving you hours every day.",
    icon: BarChart3,
  },
  {
    title: "CRM Integration",
    description: "Sync hot leads directly to your CRM with seamless native integrations.",
    icon: ShieldCheck,
  },
  {
    title: "Multi-Channel Funnels",
    description: "Build complex flows across Instagram, WhatsApp, and TikTok from one visual builder.",
    icon: Globe,
  },
  {
    title: "Conversion Tracking",
    description: "Measure the exact ROI of every conversation and optimize your sales pipeline.",
    icon: Users,
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32 relative bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-serif font-normal text-white mb-6 tracking-tight">
              The ultimate engine for <br />
              <span className="text-primary">market growth.</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Powerful AI tools designed to help you capture more leads and close more deals without adding headcount.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="h-px w-32 bg-primary/30"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
          {features.map((feature, i) => (
            <div key={i} className="group relative p-8 bg-[#0A0A0A] hover:bg-primary/5 transition-colors">
              <div className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

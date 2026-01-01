import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TIERS } from "@/constants/pages"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 relative bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-serif font-normal text-white mb-6 tracking-tight">
            Simple pricing for <span className="text-primary">scale.</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Choose the plan that fits your business needs. No hidden fees. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {TIERS.map((tier, index) => (
            <Card
              key={index}
              className={`bg-[#0A0A0A] border-white/5 relative flex flex-col ${
                tier.popular ? "border-primary/50 shadow-2xl shadow-primary/10" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl font-medium text-white mb-2">{tier.name}</CardTitle>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-serif text-white">{tier.price}</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-4">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${tier.popular ? "" : "variant-outline border-white/10 hover:bg-white/5 hover:text-white"}`}
                  variant={tier.popular ? "default" : "outline"}
                >
                  {tier.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

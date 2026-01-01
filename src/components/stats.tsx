import { cn } from "@/lib/utils"

export function Stats() {
  return (
    <section className="border-b border-white/5 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 border-x border-white/5">
          {[
            { value: "10M+", label: "Leads Generated" },
            { value: "$500M+", label: "Revenue Driven" },
            { value: "45%", label: "Avg. Response Rate" },
            { value: "24/7", label: "Automated Sales" },
          ].map((stat, i) => (
            <div
              key={i}
              className={cn(
                "py-12 md:py-16 px-4 text-center hover:bg-primary/5 transition-colors group border-white/5",
                // Add right border to all except the last item in the row
                // On mobile (2 cols): items 0 and 2 get right border. Item 1 and 3 don't.
                // On desktop (4 cols): items 0, 1, 2 get right border. Item 3 doesn't.
                i % 2 === 0 ? "border-r md:border-r-0" : "", // Mobile right border for left items
                i < 2 ? "border-b md:border-b-0" : "", // Mobile bottom border for top items
                i !== 3 ? "md:border-r" : "", // Desktop right border for all except last
              )}
            >
              <h4 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-white mb-2 group-hover:text-primary transition-colors duration-300">
                {stat.value}
              </h4>
              <p className="text-sm text-muted-foreground font-medium tracking-wide uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

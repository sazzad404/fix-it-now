// components/WhyChooseUs.tsx
import { Shield, Zap, Star, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Technicians",
    desc: "Every pro is background-checked and skill-verified before joining the platform.",
  },
  {
    icon: Zap,
    title: "Fast & Easy Booking",
    desc: "Book a service in under 2 minutes. Same-day slots available across the city.",
  },
  {
    icon: Star,
    title: "Real Customer Reviews",
    desc: "Honest ratings from real customers help you choose the best professional.",
  },
  {
    icon: HeartHandshake,
    title: "Fair & Transparent Pricing",
    desc: "No hidden charges. Clear prices upfront with money-back guarantee.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative border-y border-border/40 bg-muted/20 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Why choose{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              FixItNow
            </span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Everything you need for a better home service experience
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-border/50 bg-card/80 p-6 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                <item.icon className="size-6" />
              </div>
              <h3 className="mt-4 font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
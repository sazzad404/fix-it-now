// app/about/page.tsx  (or pages/about.tsx)

import {
  Shield,
  Zap,
  Users,
  Star,
  CheckCircle2,
  Wrench,
  Clock,
  HeartHandshake,
} from "lucide-react";
import Link from "next/link";

export default function About() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Soft background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-10 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -right-40 bottom-10 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {/* Hero Section */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
            </span>
            About FixItNow
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            We make home services{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              simple & reliable
            </span>
          </h1>

          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            FixItNow is Bangladesh’s trusted home services marketplace. We
            connect homeowners with verified technicians for plumbing,
            electrical, cleaning, painting and more — quickly, safely and at
            fair prices.
          </p>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: "10K+", label: "Happy Customers" },
            { value: "500+", label: "Verified Pros" },
            { value: "25K+", label: "Jobs Completed" },
            { value: "4.9", label: "Average Rating" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border/50 bg-card/80 p-5 text-center shadow-sm backdrop-blur-sm"
            >
              <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Our Story */}
        <div className="mx-auto mt-20 max-w-3xl">
          <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/80 shadow-xl shadow-blue-500/5 backdrop-blur-sm">
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500" />
            <div className="p-6 sm:p-8 lg:p-10">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Our Story
              </h2>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                <p>
                  FixItNow started with a simple frustration — finding a
                  reliable plumber or electrician in Dhaka was hard,
                  time-consuming, and often risky. We believed there had to be a
                  better way.
                </p>
                <p>
                  Today, FixItNow is a growing platform that brings together
                  skilled technicians and homeowners under one trusted roof.
                  Every professional on our platform is verified, rated by real
                  customers, and committed to quality work.
                </p>
                <p>
                  Whether you need an emergency repair or a planned home
                  improvement, we make the process transparent, fast, and
                  stress-free.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
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
            {[
              {
                icon: Shield,
                title: "Verified Technicians",
                desc: "Every pro is background-checked and skill-verified before joining.",
              },
              {
                icon: Zap,
                title: "Fast Booking",
                desc: "Book a service in under 2 minutes. Same-day slots available.",
              },
              {
                icon: Star,
                title: "Real Reviews",
                desc: "Honest ratings from real customers help you choose the best.",
              },
              {
                icon: HeartHandshake,
                title: "Fair Pricing",
                desc: "Transparent prices. No hidden charges. Money-back guarantee.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-border/50 bg-card/80 p-6 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                  <item.icon className="size-6" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* What We Offer */}
        <div className="mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Services we cover
            </h2>
            <p className="mt-3 text-muted-foreground">
              From emergency repairs to regular maintenance
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Wrench,
                name: "Plumbing",
                desc: "Leak fixes, installations & more",
              },
              {
                icon: Zap,
                name: "Electrical",
                desc: "Wiring, repairs & upgrades",
              },
              {
                icon: CheckCircle2,
                name: "Cleaning",
                desc: "Deep clean & regular maintenance",
              },
              {
                icon: Users,
                name: "Painting",
                desc: "Interior & exterior painting",
              },
              {
                icon: Clock,
                name: "AC Servicing",
                desc: "Repair, gas refill & maintenance",
              },
              {
                icon: Shield,
                name: "Pest Control",
                desc: "Safe & effective treatments",
              },
            ].map((service) => (
              <div
                key={service.name}
                className="flex items-center gap-4 rounded-2xl border border-border/50 bg-card/80 p-4 transition-all hover:border-blue-500/30 hover:bg-blue-500/5"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                  <service.icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {service.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mx-auto mt-20 max-w-3xl overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-background p-8 text-center shadow-xl shadow-blue-500/5 sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Ready to fix it right?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Join thousands of happy customers who trust FixItNow for their home
            service needs.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/services"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-8 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:from-blue-600 hover:to-cyan-600 hover:shadow-blue-500/30"
            >
              Browse Services
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-border/50 bg-background px-8 text-sm font-semibold text-foreground transition-all hover:bg-muted"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

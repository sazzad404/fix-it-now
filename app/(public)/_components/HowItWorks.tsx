// components/HowItWorks.tsx
import { Search, CalendarCheck, Wrench } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Choose a Service",
    desc: "Browse verified services and pick what you need — plumbing, electrical, cleaning & more.",
  },
  {
    icon: CalendarCheck,
    step: "02",
    title: "Book Instantly",
    desc: "Select date & time slot. Confirm booking in under 2 minutes with transparent pricing.",
  },
  {
    icon: Wrench,
    step: "03",
    title: "Get It Fixed",
    desc: "A verified technician arrives on time and gets the job done right.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            How it{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Book a trusted technician in 3 simple steps
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((item, i) => (
            <div key={item.step} className="relative text-center">
              {/* connector line */}
              {i < steps.length - 1 && (
                <div className="absolute left-[60%] top-10 hidden h-px w-[80%] bg-gradient-to-r from-blue-500/40 to-transparent md:block" />
              )}

              <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
                <item.icon className="size-7" />
              </div>

              <span className="mt-4 inline-block rounded-full bg-blue-500/10 px-3 py-0.5 text-xs font-bold text-blue-500">
                Step {item.step}
              </span>

              <h3 className="mt-3 text-lg font-semibold text-foreground">
                {item.title}
              </h3>
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
import { Crown, Check, Zap, Shield, Clock } from "lucide-react";
import SubscribeButton from "./SubscribeButton";

const PricingSection = ({
  isSubscribed,
  renewed,
}: {
  isSubscribed: boolean;
  renewed: string;
}) => {
  return (
    <section className="relative overflow-hidden border-t border-border/40 bg-gradient-to-b from-background via-muted/20 to-background px-4 py-16 sm:py-20">
      {/* Soft background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-md">
        <div className="overflow-hidden rounded-3xl border border-border/50 bg-card/80 shadow-xl shadow-blue-500/5 backdrop-blur-sm">
          {/* Top accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500" />

          <div className="p-7 sm:p-8">
            {/* Icon */}
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 text-amber-500 shadow-inner">
              <Crown className="size-7 fill-current" />
            </div>

            {/* Title */}
            <h2 className="mt-5 text-center text-2xl font-bold tracking-tight text-foreground">
              FixItNow{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Premium
              </span>
            </h2>

            <p className="mt-2 text-center text-sm leading-relaxed text-muted-foreground">
              Priority booking, exclusive services & faster support — everything you need for a smoother experience.
            </p>

            {/* Price */}
            <div className="mt-7 flex items-end justify-center gap-1">
              <span className="text-4xl font-bold tracking-tight text-foreground">
                ৳499
              </span>
              <span className="mb-1.5 text-sm font-medium text-muted-foreground">
                / month
              </span>
            </div>

            {/* Features */}
            <ul className="mt-7 space-y-3">
              {[
                { icon: Zap, text: "Priority booking & same-day slots" },
                { icon: Shield, text: "Verified premium technicians only" },
                { icon: Clock, text: "24/7 priority customer support" },
                { icon: Check, text: "Exclusive premium-only services" },
              ].map((item) => (
                <li
                  key={item.text}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                    <item.icon className="size-3.5" />
                  </div>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>

            {/* Subscription Status */}
            {isSubscribed && (
              <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-center">
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Active Premium Member
                </p>
                <p className="mt-0.5 text-xs text-emerald-600/80 dark:text-emerald-400/80">
                  Renews on{" "}
                  {new Date(renewed).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="mt-7">
              <SubscribeButton isPremium={isSubscribed} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
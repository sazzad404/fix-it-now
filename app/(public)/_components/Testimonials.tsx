// components/Testimonials.tsx
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Rahim Ahmed",
    role: "Homeowner, Banani",
    text: "Booked a plumber within minutes. He arrived on time and fixed the leak perfectly. Highly recommend FixItNow!",
    rating: 5,
  },
  {
    name: "Nusrat Jahan",
    role: "Apartment Owner, Dhanmondi",
    text: "The electrician was professional and explained everything clearly. Pricing was transparent. Will use again.",
    rating: 5,
  },
  {
    name: "Karim Hossain",
    role: "Business Owner, Gulshan",
    text: "Used their AC servicing for my office. Quick response, great work, and fair price. Very satisfied.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            What our{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              customers
            </span>{" "}
            say
          </h2>
          <p className="mt-3 text-muted-foreground">
            Real reviews from real people across Dhaka
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-2xl border border-border/50 bg-card/80 p-6 shadow-sm backdrop-blur-sm transition-all hover:border-blue-500/30 hover:shadow-md hover:shadow-blue-500/5"
            >
              <div className="flex gap-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                “{review.text}”
              </p>

              <div className="mt-5 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-bold text-white">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {review.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
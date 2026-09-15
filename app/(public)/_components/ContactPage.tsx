// app/contact/page.tsx  (or pages/contact.tsx)

import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Soft background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Get in{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Have a question or need help? We’d love to hear from you.  
            Our team usually replies within a few hours.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Contact Info Cards */}
          <div className="space-y-5 lg:col-span-2">
            {/* Email */}
            <div className="group rounded-2xl border border-border/50 bg-card/80 p-5 shadow-sm backdrop-blur-sm transition-all hover:border-blue-500/30 hover:shadow-md hover:shadow-blue-500/5">
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                  <Mail className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Our support team is here for you
                  </p>
                  <a
                    href="mailto:support@fixitnow.com"
                    className="mt-2 inline-block text-sm font-medium text-blue-500 hover:text-blue-600"
                  >
                    support@fixitnow.com
                  </a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="group rounded-2xl border border-border/50 bg-card/80 p-5 shadow-sm backdrop-blur-sm transition-all hover:border-blue-500/30 hover:shadow-md hover:shadow-blue-500/5">
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                  <Phone className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Phone</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Mon–Sat from 9am to 8pm
                  </p>
                  <a
                    href="tel:+8801712345678"
                    className="mt-2 inline-block text-sm font-medium text-blue-500 hover:text-blue-600"
                  >
                    +880 1712-345678
                  </a>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="group rounded-2xl border border-border/50 bg-card/80 p-5 shadow-sm backdrop-blur-sm transition-all hover:border-blue-500/30 hover:shadow-md hover:shadow-blue-500/5">
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Office</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Come visit our headquarters
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground">
                    House 12, Road 5, Banani<br />
                    Dhaka 1213, Bangladesh
                  </p>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="group rounded-2xl border border-border/50 bg-card/80 p-5 shadow-sm backdrop-blur-sm transition-all hover:border-blue-500/30 hover:shadow-md hover:shadow-blue-500/5">
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                  <Clock className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Working Hours</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    We are available during
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground">
                    Saturday – Thursday: 9:00 AM – 8:00 PM<br />
                    Friday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/80 shadow-xl shadow-blue-500/5 backdrop-blur-sm">
              {/* Top accent */}
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500" />

              <div className="p-6 sm:p-8">
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  Send us a message
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Fill out the form below and we’ll get back to you shortly.
                </p>

                <form className="mt-6 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="h-11 w-full rounded-xl border border-border/50 bg-background px-4 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        className="h-11 w-full rounded-xl border border-border/50 bg-background px-4 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="How can we help?"
                      className="h-11 w-full rounded-xl border border-border/50 bg-background px-4 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Write your message here..."
                      className="w-full resize-none rounded-xl border border-border/50 bg-background px-4 py-3 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <button
                    type="button"
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:from-blue-600 hover:to-cyan-600 hover:shadow-blue-500/30 sm:w-auto sm:px-8"
                  >
                    Send Message
                    <Send className="size-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            Prefer talking to a real person?{" "}
            <Link
              href="/services"
              className="font-medium text-blue-500 hover:text-blue-600"
            >
              Book a service
            </Link>{" "}
            and our team will assist you directly.
          </p>
        </div>
      </div>
    </div>
  );
}
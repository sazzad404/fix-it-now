// components/Sponsors.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

const sponsors = [
  {
    name: "City Bank",
    logo: "https://logo.clearbit.com/citybankplc.com",
    initials: "CB",
  },
  {
    name: "BRAC",
    logo: "https://logo.clearbit.com/brac.net",
    initials: "BR",
  },
  {
    name: "Grameenphone",
    logo: "https://logo.clearbit.com/grameenphone.com",
    initials: "GP",
  },
  {
    name: "Pathao",
    logo: "https://logo.clearbit.com/pathao.com",
    initials: "PH",
  },
  {
    name: "bKash",
    logo: "https://logo.clearbit.com/bkash.com",
    initials: "bK",
  },
  {
    name: "Daraz",
    logo: "https://logo.clearbit.com/daraz.com",
    initials: "DZ",
  },
];

function SponsorLogo({
  name,
  logo,
  initials,
}: {
  name: string;
  logo: string;
  initials: string;
}) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/15 to-cyan-500/15 text-sm font-bold text-blue-600 dark:text-blue-400">
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={logo}
      alt={name}
      width={120}
      height={48}
      className="h-10 w-auto object-contain opacity-80 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100 grayscale group-hover:grayscale-0"
      onError={() => setError(true)}
    />
  );
}

export default function Sponsors() {
  return (
    <section className="relative border-y border-border/40 bg-muted/20 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Trusted by leading brands
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Sponsors
            </span>{" "}
            & Partners
          </h2>
        </div>

        {/* Logos Grid */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-border/50 bg-card/60 px-4 py-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-md hover:shadow-blue-500/10"
            >
              <div className="relative flex h-12 w-full items-center justify-center">
                <SponsorLogo
                  name={sponsor.name}
                  logo={sponsor.logo}
                  initials={sponsor.initials}
                />
              </div>

              <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                {sponsor.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
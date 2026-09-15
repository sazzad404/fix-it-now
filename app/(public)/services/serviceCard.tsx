"use client";

import { IService } from "@/lib/type";
import { Crown, Star } from "lucide-react";
import Image from "next/image";
import ServiceDetailsModal from "./serviceDetailModal";
import { useState } from "react";

const ServiceCard = ({ service }: { service: IService }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10">
      {/* Image */}
      <div className="relative h-44 w-full overflow-hidden bg-muted">
        {service.thumbnail ? (
          <Image
            src={service.thumbnail}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
            <span className="text-6xl font-bold text-blue-500/20">
              {service.category.name.charAt(0)}
            </span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Premium Badge */}
        {service.isPremium && (
          <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-2.5 py-1 text-xs font-semibold text-white shadow-lg shadow-amber-500/30">
            <Crown className="size-3.5 fill-current" />
            Premium
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
          {service.category.name}
        </p>

        <h2 className="mt-1.5 line-clamp-1 text-lg font-bold tracking-tight text-foreground">
          {service.title}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-4">
          <div>
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="mt-0.5 text-xl font-bold text-foreground">
              ৳{service.price}
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:from-blue-600 hover:to-cyan-600 hover:shadow-blue-500/30"
          >
            View Details
          </button>
        </div>
      </div>

      <ServiceDetailsModal
        service={service}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
};

export default ServiceCard;
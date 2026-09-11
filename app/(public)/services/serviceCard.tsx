import { IService } from "@/lib/type";
import { Crown } from "lucide-react";
import Image from "next/image";

const ServiceCard = ({ service }: { service: IService }) => {
  console.log("service card ", service);

  return (
    <div className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative h-40 w-full overflow-hidden bg-muted">
        {service.thumbnail ? (
          <Image
            src={service.thumbnail}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-5xl font-bold text-muted-foreground/20">
              {service.category.name.charAt(0)}
            </span>
          </div>
        )}

        {/* Premium Icon */}
        {service.isPremium && (
          <div className="absolute right-4 top-4 rounded-full bg-amber-50 p-2 text-amber-500 shadow-sm">
            <Crown className="size-5 fill-current" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-primary">
          {service.category.name}
        </p>

        <h2 className="mt-2 text-xl font-semibold">
          {service.title}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {service.description}
        </p>

        <div className="mt-5 flex items-center justify-between border-t pt-4">
          <div>
            <p className="text-xs text-muted-foreground">
              Starting from
            </p>

            <p className="mt-1 text-lg font-bold text-primary">
              ৳{service.price}
            </p>
          </div>

          <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllService } from "@/app/(public)/services/_action/getAllService"; // ← path ঠিক করে নাও
import ServiceCard from "@/app/(public)/services/serviceCard"; // ← path ঠিক করে নাও
import { IService } from "@/lib/type";

const FeaturedServices = async () => {
  const result = await getAllService();

  // যদি ডাটা না আসে
  if (!result?.success || !result?.data?.length) {
    return null;
  }

  // হোমপেজে শুধু ৬টা দেখাবো
  const services = result.data.slice(0, 6) as IService[];

  return (
    <section className="relative py-16 sm:py-20">
      {/* Soft glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Featured{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Services
              </span>
            </h2>
            <p className="mt-2 text-muted-foreground">
              Hand-picked services from verified technicians
            </p>
          </div>

          <Link
            href="/services"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-blue-500 transition-colors hover:text-blue-600"
          >
            View all services
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
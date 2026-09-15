import React from "react";
import ServiceCard from "../services/serviceCard";
import { IService } from "@/lib/type";
import { getAllService } from "./_action/getAllService";

const ServicesPage = async () => {
  const result = await getAllService();

  if (!result.success || !result.data.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-muted text-3xl">
          🔍
        </div>
        <h2 className="text-lg font-semibold text-foreground">
          No services found
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Check back later for new services.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {result.data.map((service: IService) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default ServicesPage;
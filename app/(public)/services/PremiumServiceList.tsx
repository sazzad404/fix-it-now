import React from "react";
import ServiceCard from "./serviceCard";
import { getPremiumService } from "../_actions/getPremiumService";
import { IService } from "@/lib/type";

const PremiumServiceList = async () => {
  const result = await getPremiumService();

  if (!result.success || !result.data.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-amber-500/10 text-3xl">
          👑
        </div>
        <h2 className="text-lg font-semibold text-foreground">
          No premium services found
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Premium services will appear here soon.
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

export default PremiumServiceList;
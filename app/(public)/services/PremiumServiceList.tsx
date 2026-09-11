import React from "react";
import ServiceCard from "./serviceCard";
import { getPremiumService } from "../_actions/getPremiumService";
import { IService } from "@/lib/type";

const PremiumServiceList = async () => {
  const result = await getPremiumService();

  if (!result.success || !result.data.length) {
    return (
      <h1 className="py-12 text-center text-muted-foreground">
        No premium services found
      </h1>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {result.data.map((service: IService) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default PremiumServiceList;

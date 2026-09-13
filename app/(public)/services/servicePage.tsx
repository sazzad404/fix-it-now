import React from "react";
import ServiceCard from "../services/serviceCard";

import { IService } from "@/lib/type";
import { getAllService } from "./_action/getAllService";

const ServicesPage = async () => {
  const result = await getAllService();

  if (!result.success || !result.data.length) {
    return (
      <h1 className="py-12 text-center text-muted-foreground">
        No services found
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

export default ServicesPage;
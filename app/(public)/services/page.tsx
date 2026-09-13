import React, { Suspense } from "react";
import ServicesSkeleton from "../premium/serviceSkeleton";
import ServicesPage from "./servicePage";


const Services = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">All Services</h1>

          <p className="text-sm text-muted-foreground">
            Explore all available services
          </p>
        </div>
      </div>

      <Suspense fallback={<ServicesSkeleton />}>
        <ServicesPage/>
      </Suspense>
    </div>
  );
};

export default Services;
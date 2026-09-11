import React, { Suspense } from "react";
import ServicesSkeleton from "./serviceSkeleton";
import PremiumServices from "../services/PremiumServiceList";

const PremiumServicesPage = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold"> Premium Services</h1>
          <p className=" text-sm text-muted-foreground">
            Exclusive stories for our subscribers
          </p>
        </div>
      </div>
      <Suspense fallback={ServicesSkeleton()}>
        <PremiumServices/>
      </Suspense>
    </div>
  );
};

export default PremiumServicesPage;

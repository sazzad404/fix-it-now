import React from "react";
import PricingSection from "./PricingSection ";

import { getSubscribeStatus } from "../_actions/getSubscribeStatus";
import { redirect } from "next/navigation";

const PremiumPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) => {
  const { success } = await searchParams;

  // Stripe payment successful হলে premium service page-এ যাবে
  if (success === "true") {
    redirect("/premium");
  }

  const result = await getSubscribeStatus();

  const renewed = result?.data?.currentPeriodEnd
 

  const isSubscribed = result?.data?.isSubscribed ?? false;

  console.log(isSubscribed);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}

      <div className="my-10 text-center">
        <h2 className="text-3xl font-bold">Choose Your Plan</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Select the plan that works best for you.
        </p>
      </div>

      {/* Pricing */}
      <PricingSection isSubscribed={isSubscribed}  renewed={renewed}  />
    </main>
  );
};

export default PremiumPage;

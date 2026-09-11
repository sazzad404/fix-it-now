import { Crown } from "lucide-react";
import SubscribeButton from "./SubscribeButton";

const PricingSection = ({
  isSubscribed,
  renewed,
}: {
  isSubscribed: boolean;
  renewed: string;
}) => {
  return (
    <section className="border-t bg-muted/30 px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="rounded-2xl border bg-card p-6 text-center shadow-sm">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-amber-50 text-amber-500">
            <Crown className="size-6 fill-current" />
          </div>

          <h2 className="mt-4 text-2xl font-bold">FixItNow Premium</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Get priority booking and exclusive premium services.
          </p>

          <div className="mt-6 mb-3">
            <span className="text-3xl font-bold ">৳499</span>
            <span className="text-sm text-muted-foreground"> / month</span>
          </div>
          <h1>
            {isSubscribed && (
              <span className="text-red-400">
                {" "}
                Renewed on: {new Date(renewed).toLocaleDateString("en-GB")}
              </span>
            )}
          </h1>
          <SubscribeButton isPremium={isSubscribed} />
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

"use client";

import { useActionState, useEffect } from "react";
import { Check, Crown, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { subscribePremium } from "../_actions/subscribePremium";

const initialState = {
  success: false,
  message: "",
};

const SubscribeButton = ({ isPremium }: { isPremium: boolean }) => {
  const [state, action, pending] = useActionState(
    subscribePremium,
    initialState,
  );

  useEffect(() => {
    if (!state.message) return;

    if (!state.success) {
      toast.error(state.message);
    }
  }, [state]);

  if (isPremium) {
    return (
      <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-green-50 py-3 font-semibold text-green-600">
        <Check className="size-5" />
        Premium Active
      </div>
    );
  }

  return (
    <form action={action}>
      <button
        type="submit"
        disabled={pending}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Crown className="size-4" />
            Subscribe Now
          </>
        )}
      </button>
    </form>
  );
};

export default SubscribeButton;

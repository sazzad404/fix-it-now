"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useActionState } from "react";
import { toast } from "sonner";
import { createReview, reviewState } from "../_actions/review";

type ReviewModalProps = {
  bookingId: string;
  serviceTitle: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ReviewModal = ({
  bookingId,
  serviceTitle,
  open,
  onOpenChange,
}: ReviewModalProps) => {
 const [state, formAction, pending] = useActionState<reviewState, FormData>(
  createReview,
  {
    success: false,
    message: "",
    data: null,
  },
);

  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      onOpenChange(false);
      
    }

    if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-zinc-800 bg-zinc-900 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Give Your Review</DialogTitle>

          <DialogDescription className="text-zinc-500">
            Share your experience about{" "}
            <span className="font-medium text-zinc-300">{serviceTitle}</span>
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-5">
          <input type="hidden" name="bookingId" value={bookingId} />

          <input type="hidden" name="rating" value={rating} />

          {/* Rating */}
          <div>
            <p className="mb-3 text-sm font-medium text-zinc-300">Rating</p>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`size-7 ${
                      star <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-zinc-600"
                    }`}
                  />
                </button>
              ))}
            </div>

            {rating === 0 && (
              <p className="mt-2 text-xs text-zinc-500">
                Please select a rating
              </p>
            )}
          </div>

          {/* Comment */}
          <div>
            <label
              htmlFor="comment"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Your Review
            </label>

            <textarea
              id="comment"
              name="comment"
              required
              rows={4}
              placeholder="Write your experience..."
              className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950/50 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={pending || rating === 0}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;

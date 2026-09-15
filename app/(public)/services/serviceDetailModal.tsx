"use client";

import React, { useEffect } from "react";
import { IService } from "@/lib/type";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useActionState } from "react";
import {
  bookingService,
  BookingServiceData,
} from "./_action/bookingService";
import { toast } from "sonner";
import { Crown, MapPin, Star, Briefcase, Mail } from "lucide-react";

type Props = {
  service: IService;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ServiceDetailsModal = ({
  service,
  open,
  onOpenChange,
}: Props) => {
  const [state, formAction, pending] = useActionState(
    bookingService,
    {
      success: false,
      message: "",
      data: {} as BookingServiceData,
    },
  );

  const technician = service.technician;

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    }
  }, [state]);

  const hasAvailability = technician.availability?.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border-border/50 bg-background/95 p-0 backdrop-blur-xl sm:max-w-2xl">
        {/* Header */}
        <div className="border-b border-border/50 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 px-6 py-5">
          <DialogHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <DialogTitle className="text-xl font-bold tracking-tight">
                  {service.title}
                </DialogTitle>
                <DialogDescription className="mt-1">
                  Complete service & technician details
                </DialogDescription>
              </div>
              {service.isPremium && (
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-2.5 py-1 text-xs font-semibold text-white">
                  <Crown className="size-3.5 fill-current" />
                  Premium
                </span>
              )}
            </div>
          </DialogHeader>
        </div>

        <div className="space-y-6 px-6 py-5">
          {/* Service Information */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Service Information
            </h3>

            <div className="space-y-4 rounded-xl border border-border/50 bg-muted/30 p-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Description
                </p>
                <p className="mt-1 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-background/80 p-3">
                  <p className="text-xs text-muted-foreground">Price</p>
                  <p className="mt-0.5 text-lg font-bold text-blue-500">
                    ৳{service.price}
                  </p>
                </div>

                <div className="rounded-lg bg-background/80 p-3">
                  <p className="text-xs text-muted-foreground">Category</p>
                  <p className="mt-0.5 font-medium">{service.category.name}</p>
                </div>
              </div>

              <div className="rounded-lg bg-background/80 p-3">
                <p className="text-xs text-muted-foreground">Service Type</p>
                <p className="mt-0.5 font-medium">
                  {service.isPremium ? "Premium Service" : "Regular Service"}
                </p>
              </div>
            </div>
          </div>

          {/* Technician Information */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Technician Information
            </h3>

            <div className="space-y-4 rounded-xl border border-border/50 bg-muted/30 p-4">
              {/* Name + Rating */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Name</p>
                  <p className="mt-0.5 text-base font-semibold">
                    {technician.user.name}
                  </p>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-sm font-medium text-amber-600 dark:text-amber-400">
                  <Star className="size-3.5 fill-current" />
                  {technician.rating}
                </div>
              </div>

              {/* Email + Location */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2.5 rounded-lg bg-background/80 p-3">
                  <Mail className="size-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="truncate text-sm">{technician.user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 rounded-lg bg-background/80 p-3">
                  <MapPin className="size-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="truncate text-sm">{technician.location}</p>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="flex items-center gap-2.5 rounded-lg bg-background/80 p-3">
                <Briefcase className="size-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Experience</p>
                  <p className="text-sm font-medium">
                    {technician.experience} years
                  </p>
                </div>
              </div>

              {/* Bio */}
              <div>
                <p className="text-xs font-medium text-muted-foreground">Bio</p>
                <p className="mt-1 text-sm leading-relaxed">{technician.bio}</p>
              </div>

              {/* Skills */}
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {technician.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Availability + Booking Form */}
              <div className="border-t border-border/50 pt-4">
                <p className="mb-3 text-xs font-medium text-muted-foreground">
                  Availability & Booking
                </p>

                <form action={formAction} className="space-y-4">
                  <input type="hidden" name="serviceId" value={service.id} />

                  {/* Date */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Select Date
                    </label>
                    <input
                      type="date"
                      name="bookingDate"
                      required
                      disabled={!hasAvailability}
                      className="w-full rounded-xl border border-border/50 bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  {/* Time Slots */}
                  <div>
                    <p className="mb-2 text-sm font-medium">Select Time Slot</p>

                    {hasAvailability ? (
                      <div className="grid gap-2 sm:grid-cols-2">
                        {technician.availability.map((time) => (
                          <label
                            key={time}
                            className="flex cursor-pointer items-center gap-3 rounded-xl border border-border/50 bg-background px-3.5 py-3 transition hover:border-blue-500/40 hover:bg-blue-500/5 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500/10"
                          >
                            <input
                              type="radio"
                              name="slotTime"
                              value={time}
                              required
                              className="accent-blue-500"
                            />
                            <span className="text-sm font-medium">{time}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center text-sm text-red-500">
                        This technician currently has no available time slots.
                      </div>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={pending || !hasAvailability}
                    className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:from-blue-600 hover:to-cyan-600 hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {!hasAvailability
                      ? "No Available Time Slot"
                      : pending
                        ? "Booking..."
                        : "Book Now"}
                  </button>

                  {state.message && (
                    <p
                      className={`text-center text-sm font-medium ${
                        state.success ? "text-emerald-500" : "text-red-500"
                      }`}
                    >
                      {state.message}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailsModal;
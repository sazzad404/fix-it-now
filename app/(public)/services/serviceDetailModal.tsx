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
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {service.title}
          </DialogTitle>

          <DialogDescription>
            Complete service and technician information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Service Information */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">
              Service Information
            </h3>

            <div className="space-y-3 rounded-lg border p-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Description
                </p>

                <p>{service.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Price
                  </p>

                  <p className="font-semibold">
                    ৳{service.price}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Category
                  </p>

                  <p>{service.category.name}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Service Type
                </p>

                <p>
                  {service.isPremium
                    ? "Premium Service"
                    : "Regular Service"}
                </p>
              </div>
            </div>
          </div>

          {/* Technician Information */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">
              Technician Information
            </h3>

            <div className="space-y-4 rounded-lg border p-4">
              {/* Name */}
              <div>
                <p className="text-sm text-muted-foreground">
                  Name
                </p>

                <p className="font-medium">
                  {technician.user.name}
                </p>
              </div>

              {/* Email + Location */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Email
                  </p>

                  <p>{technician.user.email}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Location
                  </p>

                  <p>{technician.location}</p>
                </div>
              </div>

              {/* Experience + Rating */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Experience
                  </p>

                  <p>{technician.experience} years</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Rating
                  </p>

                  <p>⭐ {technician.rating}</p>
                </div>
              </div>

              {/* Bio */}
              <div>
                <p className="text-sm text-muted-foreground">
                  Bio
                </p>

                <p>{technician.bio}</p>
              </div>

              {/* Skills */}
              <div>
                <p className="mb-2 text-sm text-muted-foreground">
                  Skills
                </p>

                <div className="flex flex-wrap gap-2">
                  {technician.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-muted px-3 py-1 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <p className="mb-2 text-sm text-muted-foreground">
                  Availability
                </p>

                <form
                  action={formAction}
                  className="space-y-4"
                >
                  {/* Service ID */}
                  <input
                    type="hidden"
                    name="serviceId"
                    value={service.id}
                  />

                  {/* Booking Date */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Select Date
                    </label>

                    <input
                      type="date"
                      name="bookingDate"
                      required
                      disabled={!hasAvailability}
                      className="w-full rounded-md border bg-background px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  {/* Time Slot */}
                  <div>
                    <p className="mb-2 text-sm font-medium">
                      Select Time Slot
                    </p>

                    {hasAvailability ? (
                      <div className="space-y-2">
                        {technician.availability.map(
                          (time) => (
                            <label
                              key={time}
                              className="flex cursor-pointer items-center gap-2 rounded-md border p-3 transition hover:bg-muted"
                            >
                              <input
                                type="radio"
                                name="slotTime"
                                value={time}
                                required
                              />

                              <span>{time}</span>
                            </label>
                          ),
                        )}
                      </div>
                    ) : (
                      <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
                        This technician currently has
                        no available time slots.
                      </div>
                    )}
                  </div>

                  {/* Book Button */}
                  <button
                    type="submit"
                    disabled={pending || !hasAvailability}
                    className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {!hasAvailability
                      ? "No Available Time Slot"
                      : pending
                        ? "Booking..."
                        : "Book Now"}
                  </button>

                  {/* Message */}
                  {state.message && (
                    <p
                      className={
                        state.success
                          ? "text-green-500"
                          : "text-red-500"
                      }
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
"use client";

import {
  CalendarDays,
  Clock,
  Mail,
  User,
  Wrench,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { updateBookingStatus } from "../_action/updateBookingStatus";

export type TechnicianBooking = {
  id: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  bookingDate: string;
  slotTime: string;
  status: string;
  createdAt: string;
  updatedAt: string;

  service: {
    id: string;
    categoryId: string;
    technicianId: string;
    title: string;
    price: string;
    description: string;
    thumbnail: string | null;
    isPremium: boolean;
    createdAt: string;
    updatedAt: string;
  };

  customer: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
};

const STATUS_OPTIONS = [
  "PENDING",
  "ACCEPTED",
  "ON_THE_WAY",
  "SERVICE_STARTED",
  "COMPLETED",
  "CANCELLED",
];

const statusStyles: Record<string, string> = {
  PENDING: "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
  ACCEPTED: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  ON_THE_WAY: "border-purple-500/20 bg-purple-500/10 text-purple-400",
  SERVICE_STARTED: "border-cyan-500/20 bg-cyan-500/10 text-cyan-400",
  COMPLETED: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  CANCELLED: "border-red-500/20 bg-red-500/10 text-red-400",
};

const TechnicianBookingCard = ({
  booking,
}: {
  booking: TechnicianBooking;
}) => {
  const [status, setStatus] = useState(booking.status);
  const [updating, setUpdating] = useState(false);

  const handleStatusChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newStatus = event.target.value;

    if (newStatus === status) return;

    const previousStatus = status;

    setStatus(newStatus);
    setUpdating(true);

    const result = await updateBookingStatus(booking.id, newStatus);

    if (result.success) {
      toast.success(result.message);
    } else {
      setStatus(previousStatus);
      toast.error(result.message);
    }

    setUpdating(false);
  };

  const formattedDate = new Date(
    booking.bookingDate,
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-lg">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-zinc-800 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-blue-400" />

            <h2 className="text-lg font-bold text-white">
              {booking.service.title}
            </h2>
          </div>

          <p className="mt-1 text-sm text-zinc-500">
            Booking ID: {booking.id.slice(0, 8)}...
          </p>
        </div>

        <span
          className={`w-fit rounded-full border px-3 py-1.5 text-xs font-semibold ${
            statusStyles[status]
          }`}
        >
          {status.replaceAll("_", " ")}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-5 p-5">
        {/* Customer */}
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
          <div className="mb-3 flex items-center gap-2">
            <User className="h-4 w-4 text-blue-400" />

            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Customer
            </p>
          </div>

          <p className="font-semibold text-white">
            {booking.customer.name}
          </p>

          <div className="mt-1 flex items-center gap-2 text-sm text-zinc-500">
            <Mail className="h-4 w-4" />
            <span>{booking.customer.email}</span>
          </div>
        </div>

        {/* Booking Information */}
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div className="flex items-center gap-2 text-zinc-500">
              <CalendarDays className="h-4 w-4 text-blue-400" />

              <span className="text-xs">Booking Date</span>
            </div>

            <p className="mt-2 text-sm font-semibold text-white">
              {formattedDate}
            </p>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div className="flex items-center gap-2 text-zinc-500">
              <Clock className="h-4 w-4 text-emerald-400" />

              <span className="text-xs">Time Slot</span>
            </div>

            <p className="mt-2 text-sm font-semibold text-white">
              {booking.slotTime}
            </p>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <p className="text-xs text-zinc-500">Service Price</p>

            <p className="mt-2 text-lg font-bold text-blue-400">
              ৳{booking.service.price}
            </p>
          </div>
        </div>

        {/* Description */}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Service Description
          </p>

          <p className="text-sm leading-6 text-zinc-400">
            {booking.service.description}
          </p>
        </div>

        {/* Status Update */}
        <div className="border-t border-zinc-800 pt-5">
          <div className="mb-2 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-blue-400" />

            <label className="text-sm font-semibold text-zinc-300">
              Update Booking Status
            </label>
          </div>

          <select
            value={status}
            onChange={handleStatusChange}
            disabled={updating}
            className={`w-full rounded-xl border bg-zinc-950 px-4 py-3 text-sm font-medium outline-none transition focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${
              statusStyles[status]
            }`}
          >
            {STATUS_OPTIONS.map((option) => (
              <option
                key={option}
                value={option}
                className="bg-zinc-950 text-white"
              >
                {option.replaceAll("_", " ")}
              </option>
            ))}
          </select>

          {updating && (
            <p className="mt-2 text-xs text-zinc-500">
              Updating booking status...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechnicianBookingCard;
"use client";

import Image from "next/image";
import {
  CalendarDays,
  Clock,
  MapPin,
  Star,
  BriefcaseBusiness,
} from "lucide-react";

import { BookingData } from "../dashboard/bookings/page";
import { useState } from "react";
import ReviewModal from "./ReviewModal";

const BookingCard = ({ booking }: { booking: BookingData }) => {
  const { service, technician } = booking;

  const [reviewOpen, setReviewOpen] = useState(false);
  const statusStyle =
    booking.status === "COMPLETED"
      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
      : booking.status === "CANCELLED"
        ? "border-red-500/20 bg-red-500/10 text-red-400"
        : booking.status === "CONFIRMED"
          ? "border-blue-500/20 bg-blue-500/10 text-blue-400"
          : "border-yellow-500/20 bg-yellow-500/10 text-yellow-400";

  return (
    <div className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-blue-500/5">
      <div className="flex flex-col md:flex-row">
        {/* =====================================
            Service Image
        ===================================== */}

        <div className="relative h-52 w-full shrink-0 overflow-hidden md:h-auto md:w-64">
          {service.thumbnail ? (
            <Image
              src={service.thumbnail}
              alt={service.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full min-h-52 items-center justify-center bg-zinc-800 text-sm text-zinc-500">
              No Image
            </div>
          )}

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Premium Badge */}
          {service.isPremium && (
            <div className="absolute left-3 top-3 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400 backdrop-blur-md">
              Premium
            </div>
          )}
        </div>

        {/* =====================================
            Content
        ===================================== */}

        <div className="flex flex-1 flex-col justify-between p-5">
          {/* Top Section */}
          <div>
            {/* Title + Status */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h2 className="truncate text-lg font-semibold text-white">
                  {service.title}
                </h2>

                <p className="mt-1 text-xs text-zinc-500">
                  Booking ID:{" "}
                  <span className="text-zinc-400">
                    {booking.id.slice(0, 8)}
                  </span>
                </p>
              </div>

              {/* Status */}
              <span
                className={`w-fit shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${statusStyle}`}
              >
                {booking.status}
              </span>
            </div>

            {/* =====================================
                Booking Info
            ===================================== */}

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {/* Date */}
              <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950/40 p-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <CalendarDays className="size-4" />
                </div>

                <div>
                  <p className="text-[11px] text-zinc-500">Booking Date</p>

                  <p className="mt-0.5 text-sm font-medium text-zinc-200">
                    {new Date(booking.bookingDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950/40 p-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                  <Clock className="size-4" />
                </div>

                <div>
                  <p className="text-[11px] text-zinc-500">Time Slot</p>

                  <p className="mt-0.5 text-sm font-medium text-zinc-200">
                    {booking.slotTime}
                  </p>
                </div>
              </div>
            </div>

            {/* =====================================
                Technician
            ===================================== */}

            <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950/30 p-4">
              <div className="mb-3 flex items-center gap-2">
                <BriefcaseBusiness className="size-4 text-blue-400" />

                <p className="text-sm font-medium text-zinc-200">Technician</p>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {/* Location */}
                <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <MapPin className="size-3.5 text-zinc-500" />
                  {technician.location}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                  {technician.rating}
                </div>

                {/* Experience */}
                <div className="text-xs text-zinc-400">
                  <span className="text-zinc-200">{technician.experience}</span>{" "}
                  years experience
                </div>
              </div>
            </div>
          </div>

          {/* =====================================
              Bottom / Price
          ===================================== */}

          <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-4">
            <div>
              <p className="text-xs text-zinc-500">Service Price</p>

              <p className="mt-1 text-xl font-bold text-white">
                ৳{service.price}
              </p>
            </div>

            {/* Service Category */}
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 px-3 py-2">
              <p className="text-xs text-zinc-400">Service</p>

              <p className="text-xs font-medium text-blue-400">
                {service.isPremium ? "Premium" : "Standard"}
              </p>
            </div>
            {booking.status === "COMPLETED" && (
              <button
                onClick={() => setReviewOpen(true)}
                className="flex items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-400"
              >
                <Star className="size-4 fill-current" />
                Review
              </button>
            )}
          </div>
        </div>
      </div>
      <ReviewModal
        bookingId={booking.id}
        serviceTitle={service.title}
        open={reviewOpen}
        onOpenChange={setReviewOpen}
      />
    </div>
  );
};

export default BookingCard;

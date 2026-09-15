import React from "react";

const TechnicianBookings = async () => {
  const result = await getBookings();

  const bookings = (result?.data || []) as TechnicianBooking[];

  return (
    <div className="min-h-screen px-6 py-8 text-white lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-400">
            Booking Management
          </p>

          <h1 className="mt-1 text-3xl font-bold">My Bookings</h1>

          <p className="mt-2 text-sm text-zinc-500">
            Manage your customer bookings and update their service status.
          </p>
        </div>

        {/* Total */}
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-white">Total Bookings</p>

            <p className="mt-1 text-xs text-zinc-500">
              All bookings assigned to you
            </p>
          </div>

          <div className="rounded-xl bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-400">
            {bookings.length}
          </div>
        </div>

        {/* Booking List */}
        {bookings.length > 0 ? (
          <div className="grid gap-6 xl:grid-cols-2">
            {bookings.map((booking) => (
              <TechnicianBookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-12 text-center">
            <h2 className="text-lg font-semibold text-white">
              No Bookings Found
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              You currently have no customer bookings.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
import { getBookings } from "../_action/getBookings";
import TechnicianBookingCard, {
  TechnicianBooking,
} from "../_components/TechnicianBookingCard";

export default TechnicianBookings;

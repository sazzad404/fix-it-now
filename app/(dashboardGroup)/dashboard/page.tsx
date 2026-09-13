import { CalendarCheck, CheckCircle, Clock, Wallet } from "lucide-react";

import DashboardStatCard from "../_components/DashboardStatCard";
import { getCustomerBookings } from "../_actions/getBookings";
import { BookingData } from "./bookings/page";

const DashboardPage = async () => {
  const result = await getCustomerBookings();

  const bookings = result.data as BookingData[];

  // states
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(
    (booking) => booking.status === "PENDING",
  ).length;
  const completedBookings = bookings.filter(
    (booking) => booking.status === "COMPLETED",
  ).length;

  const totalSpent = bookings.reduce((acc, booking) => {
    return acc + parseFloat(booking.service.price);
  }, 0);

  const recentBookings = bookings.slice(0, 3);
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Welcome */}
      <div>
        <p className="text-sm text-blue-400">Customer Dashboard</p>

        <h1 className="mt-1 text-3xl font-bold">Welcome back 👋</h1>

        <p className="mt-2 text-sm text-zinc-500">
          Manage your bookings and services from here.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStatCard
          title="Total Bookings"
          value={String(totalBookings)}
          description="All your bookings"
          icon={CalendarCheck}
        />

        <DashboardStatCard
          title="Pending"
          value={String(pendingBookings)}
          description="Waiting for service"
          icon={Clock}
        />

        <DashboardStatCard
          title="Completed"
          value={String(completedBookings)}
          description="Successfully completed"
          icon={CheckCircle}
        />

        <DashboardStatCard
          title="Total Spent"
          value={`৳${totalSpent.toLocaleString()}`}
          description="Your total spending"
          icon={Wallet}
        />
      </div>

      {/* Recent Bookings */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="mb-5">
          <h2 className="text-xl font-semibold">Recent Bookings</h2>

          <p className="text-sm text-zinc-500">Your latest service bookings</p>
        </div>

        <div className="space-y-3">
          {recentBookings.length > 0 ? (
            recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between rounded-xl bg-zinc-800/60 p-4"
              >
                <div>
                  <p className="font-medium">{booking.service.title}</p>

                  <p className="text-xs text-zinc-500">
                    {new Date(booking.bookingDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    booking.status === "PENDING"
                      ? "bg-yellow-500/10 text-yellow-400"
                      : booking.status === "COMPLETED"
                        ? "bg-green-500/10 text-green-400"
                        : booking.status === "CANCELLED"
                          ? "bg-red-500/10 text-red-400"
                          : "bg-blue-500/10 text-blue-400"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            ))
          ) : (
            <p className="py-8 text-center text-sm text-zinc-500">
              No bookings found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

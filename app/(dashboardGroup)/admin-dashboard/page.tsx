import {
  CalendarCheck,
  DollarSign,
  Users,
  Wrench,
} from "lucide-react";

import DashboardStatCard from "../_components/DashboardStatCard";

const AdminDashboard = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div>
        <p className="text-sm text-red-400">
          Admin Dashboard
        </p>

        <h1 className="mt-1 text-3xl font-bold">
          System Overview 🛡️
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Monitor and manage the entire FixItNow platform.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStatCard
          title="Total Users"
          value="1,245"
          description="Registered users"
          icon={Users}
        />

        <DashboardStatCard
          title="Services"
          value="156"
          description="Available services"
          icon={Wrench}
        />

        <DashboardStatCard
          title="Bookings"
          value="892"
          description="Total bookings"
          icon={CalendarCheck}
        />

        <DashboardStatCard
          title="Revenue"
          value="৳8.4L"
          description="Platform revenue"
          icon={DollarSign}
        />
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="text-xl font-semibold">
          Platform Activity
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Recent activities across FixItNow.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
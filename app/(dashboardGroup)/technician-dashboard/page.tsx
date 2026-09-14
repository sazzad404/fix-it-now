import { CalendarCheck, CheckCircle, Star, Wrench } from "lucide-react";

import DashboardStatCard from "../_components/DashboardStatCard";
import { getAllService } from "@/app/(public)/services/_action/getAllService";
import { getMyProfile } from "../_actions/getMyProfile";
import { IBooking, IService } from "@/lib/type";
import { getBookings } from "./_action/getBookings";

const TechnicianDashboard = async () => {
  const [serviceResult, myProfile, bookings] = await Promise.all([
    getAllService(),
    getMyProfile(),
    getBookings(),
  ]);

  const services = serviceResult?.data || [];
  const bookingData = bookings?.data || [];

  const myTechnicianId =
    myProfile?.data?.technicianProfile?.id;

  const myServices = services.filter(
    (service: IService) =>
      service.technician.id === myTechnicianId,
  );

  const myTotalService = myServices.length;
  const myTotalBookings = bookingData.length;
  

  const myTotalCompletedService = bookingData.filter(
    (booking: IBooking) => booking.status === "COMPLETED",
  ).length;

  const profile =await getMyProfile()
  const myTotalRating = profile?.data?.technicianProfile?.rating

  const mybookings =await getBookings()
  const recentBookings = (mybookings?.data).slice(0, 2);

 
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div>
        <p className="text-sm text-blue-400">
          Technician Dashboard
        </p>

        <h1 className="mt-1 text-3xl font-bold">
          Manage Your Services 🔧
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Manage services, bookings and your performance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStatCard
          title="My Services"
          value={myTotalService}
          description="Active services"
          icon={Wrench}
        />

        <DashboardStatCard
          title="Bookings"
          value={myTotalBookings}
          description="Total bookings"
          icon={CalendarCheck}
        />

        <DashboardStatCard
          title="Completed"
          value={myTotalCompletedService}
          description="Completed bookings"
          icon={CheckCircle}
        />

        <DashboardStatCard
          title="Rating"
          value={myTotalRating}
          description="Average customer rating"
          icon={Star}
        />
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="text-xl font-semibold">
          Recent Bookings
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Recent customers who booked your services.
        </p>

        <div className="mt-5 space-y-3">
          <div className="rounded-xl bg-zinc-800/60 p-4">
            <p className="font-medium">{recentBookings[0].service.title}</p>

            <p className="mt-1 text-sm text-zinc-500">
              Customer booking • {new Date(recentBookings[0].bookingDate).toLocaleDateString()}
              </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianDashboard;
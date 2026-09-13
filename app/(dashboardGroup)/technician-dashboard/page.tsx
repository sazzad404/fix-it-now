import { CalendarCheck, CheckCircle, Star, Wrench } from "lucide-react";

import DashboardStatCard from "../_components/DashboardStatCard";
import { getAllService } from "@/app/(public)/services/_action/getAllService";
import { getMyProfile } from "../_actions/getMyProfile";
import { IService } from "@/lib/type";

const TechnicianDashboard = async () => {
  const result = await getAllService();
  const services = result.data;

  const myProfile = await getMyProfile();

  const myTechnicianId = myProfile?.data?.technicianProfile?.id;

  const myServices = services.filter(
    (service: IService) => service.technician.id === myTechnicianId,
  );

  console.log(myServices)

  // state
  const myTotalService  = myServices.length 



  // const technicianServices = services.filter(service)

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div>
        <p className="text-sm text-blue-400">Technician Dashboard</p>

        <h1 className="mt-1 text-3xl font-bold">Manage Your Services 🔧</h1>

        <p className="mt-2 text-sm text-zinc-500">
          Manage services, bookings and your performance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStatCard
          title="My Services"
          value="8"
          description="Active services"
          icon={Wrench}
        />

        <DashboardStatCard
          title="Bookings"
          value="34"
          description="Total bookings"
          icon={CalendarCheck}
        />

        <DashboardStatCard
          title="Completed"
          value="28"
          description="Completed bookings"
          icon={CheckCircle}
        />

        <DashboardStatCard
          title="Rating"
          value="4.8"
          description="Average customer rating"
          icon={Star}
        />
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="text-xl font-semibold">Recent Bookings</h2>

        <p className="mt-1 text-sm text-zinc-500">
          Recent customers who booked your services.
        </p>

        <div className="mt-5 space-y-3">
          <div className="rounded-xl bg-zinc-800/60 p-4">
            <p className="font-medium">AC Repair</p>

            <p className="mt-1 text-sm text-zinc-500">
              Customer booking • Sunday 09:00-12:00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianDashboard;

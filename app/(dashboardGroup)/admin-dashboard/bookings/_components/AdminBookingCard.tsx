import {
  CalendarDays,
  Clock3,
  MapPin,
  Star,
  UserRound,
  BriefcaseBusiness,
} from "lucide-react";

type Booking = {
  id: string;
  bookingDate: string;
  slotTime: string;
  status: string;
  service: {
    title: string;
    price: string;
    description: string;
    isPremium: boolean;
  };
  technician: {
    experience: number;
    rating: number;
    location: string | null;
    user: {
      name: string;
      email: string;
    };
  };
};

const AdminBookingCard = ({ booking }: { booking: Booking }) => {
  const statusStyle = {
    PENDING: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    ACCEPTED: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    COMPLETED: "bg-green-500/10 text-green-400 border-green-500/20",
    CANCELLED: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const formattedDate = new Date(booking.bookingDate).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <div className="rounded-2xl border border-white/10 bg-[#171719] p-5 shadow-lg transition-all duration-300 hover:border-white/20 hover:shadow-xl">
      {/* Top */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-gray-400">
          Booking ID:{" "}
          <span className="text-gray-300">
            {booking.id.slice(0, 8)}...
          </span>
        </p>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium ${
            statusStyle[booking.status as keyof typeof statusStyle] ||
            "border-gray-500/20 bg-gray-500/10 text-gray-400"
          }`}
        >
          {booking.status}
        </span>
      </div>

      {/* Service */}
      <div className="mt-5 rounded-xl border border-white/5 bg-[#1d1d20] p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-medium text-gray-100">
              {booking.service.title}
            </h3>

            {booking.service.isPremium && (
              <span className="mt-1 inline-block text-xs text-yellow-400">
                Premium Service
              </span>
            )}
          </div>

          <p className="whitespace-nowrap text-lg font-semibold text-white">
            ৳{booking.service.price}
          </p>
        </div>

        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
          {booking.service.description}
        </p>
      </div>

      {/* Booking Info */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/10 bg-[#1b1b1e] p-3">
          <div className="flex items-center gap-2 text-gray-400">
            <CalendarDays size={16} />
            <span className="text-xs">Booking Date</span>
          </div>

          <p className="mt-2 text-sm font-medium text-gray-200">
            {formattedDate}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#1b1b1e] p-3">
          <div className="flex items-center gap-2 text-gray-400">
            <Clock3 size={16} />
            <span className="text-xs">Time Slot</span>
          </div>

          <p className="mt-2 text-sm font-medium text-gray-200">
            {booking.slotTime}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-5 border-t border-white/10" />

      {/* Technician */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-gray-300">
          <UserRound size={19} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-200">
            {booking.technician.user.name}
          </p>

          <p className="truncate text-xs text-gray-500">
            {booking.technician.user.email}
          </p>
        </div>

        <div className="flex flex-wrap justify-end gap-2">
          {/* Rating */}
          <span className="flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-xs text-gray-400">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            {booking.technician.rating}
          </span>

          {/* Experience */}
          <span className="flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-xs text-gray-400">
            <BriefcaseBusiness size={12} />
            {booking.technician.experience} Years
          </span>
        </div>
      </div>

      {/* Location */}
      {booking.technician.location && (
        <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
          <MapPin size={14} />
          <span>{booking.technician.location}</span>
        </div>
      )}
    </div>
  );
};

export default AdminBookingCard;
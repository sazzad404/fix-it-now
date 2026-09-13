import React from "react";
import { getCustomerBookings } from "../../_actions/getBookings";
import BookingCard from "../../_components/bookingCard";

export type BookingData = {
  id: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  bookingDate: string;
  slotTime: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  technician: {
    id: string;
    userId: string;
    skills: string[];
    experience: number;
    bio: string;
    rating: number;
    location: string;
    availability: string[];
    createdAt: string;
    updatedAt: string;
  };
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
};

const MyBookings = async () => {
  const bookings = await getCustomerBookings();
  const data = (bookings?.data || []) as BookingData[];

  return (
    <div>
      {/* Header */}
      <div className="text-center pb-5">
        <h1 className="text-2xl font-bold">My Bookings</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          View and manage your service bookings.
        </p>
      </div>
      {data.length > 0?(
        <div className="grid gap-4">
          {data.map((booking)=>{
            return <BookingCard key={booking.id} booking={booking}/>
          })}
        </div>
      ):"No Bookings"}
    </div>
  );
};

export default MyBookings;

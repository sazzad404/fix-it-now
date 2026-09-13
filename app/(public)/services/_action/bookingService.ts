"use server";

import { cookies } from "next/headers";

export type BookingServiceData = {
  id: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  bookingDate: string;
  slotTime: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type BookingServiceState = {
  success: boolean;
  message: string;
  data: BookingServiceData;
};

export const bookingService = async (
  prevState: BookingServiceState,
  formData: FormData,
): Promise<BookingServiceState> => {
  const serviceId = formData.get("serviceId");
  const bookingDate = formData.get("bookingDate");
  const slotTime = formData.get("slotTime");

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const payload = {
    bookingDate,
    slotTime,
    serviceId,
  };

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/bookings/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(payload),
    },
  );


  const result = await res.json();
  console.log("BOOKING RESULT:", result);
  if (result.success) {
    return {
      success: true,
      message: "Booking created successfully",
      data: result.data,
    };
  }

  return {
    success: false,
    message: result.message || "Booking failed",
    data: result.data || ({} as BookingServiceData),
  };
};

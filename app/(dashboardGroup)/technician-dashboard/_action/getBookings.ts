"use server";

import { cookies } from "next/headers";

export const getBookings = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/technician/bookings`,
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
    },
  );
  const result = await res.json();
  if (result.success) {
    return {
      success: true,
      message: "Booking retrived successfully",
      data: result.data,
    };
  }

  return {
    success: false,
    message: result.message || "Booking retrived failed",
    data: result.data,
  };
};

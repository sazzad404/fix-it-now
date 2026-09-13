"use server";

import { cookies } from "next/headers";

export const getCustomerBookings = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/bookings`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
  });

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
    data: result.data,
  };
};

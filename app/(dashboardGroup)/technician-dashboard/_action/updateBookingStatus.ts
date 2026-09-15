"use server";

import { cookies } from "next/headers";

export const updateBookingStatus = async (
  bookingId: string,
  status: string,
) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "Please login first",
      data: null,
    };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/technician/bookings/${bookingId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({ status }),
      },
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message:
          result.message ||
          result.error ||
          "Failed to update booking status",
        data: null,
      };
    }

    return {
      success: true,
      message: result.message || "Booking status updated successfully",
      data: result.data,
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
      data: null,
    };
  }
};
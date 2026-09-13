"use server";

import { cookies } from "next/headers";

export const updateTechnicianAvailability = async (
  availability: string[]
) => {
  try {
    const cookieStore = await cookies();

    const accessToken =
      cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/technician/availability`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({
          availability,
        }),
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message:
          result?.message ||
          "Failed to update availability",
      };
    }

    return {
      success: true,
      message:
        result?.message ||
        "Availability updated successfully",
      data: result?.data,
    };
  } catch (error) {
    console.error(
      "Update availability error:",
      error
    );

    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};
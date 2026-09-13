"use server";

import { cookies } from "next/headers";

export const updateTechnicianProfile = async (data: {
  skills: string[];
  experience: number;
  bio: string;
  location: string;
}) => {
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
      `${process.env.BACKEND_API_URL}/api/technician/profile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify(data),
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message:
          result?.message ||
          "Failed to update technician profile",
      };
    }

    return {
      success: true,
      message:
        result?.message ||
        "Technician profile updated successfully",
      data: result?.data,
    };
  } catch (error) {
    console.error(
      "Update technician profile error:",
      error
    );

    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};
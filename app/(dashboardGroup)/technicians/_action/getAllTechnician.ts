"use server"
import { cookies } from "next/headers";

export const getAllTechnician = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/technician/`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
  });

  const result = await res.json();
  console.log("TECHNICIAN RESULT:", result);
  if (result.success) {
    return {
      success: true,
      message: "Technician created successfully",
      data: result.data,
    };
  }

  return {
    success: false,
    message: result.message || "Technician not found",
    data: result.data,
  };
};

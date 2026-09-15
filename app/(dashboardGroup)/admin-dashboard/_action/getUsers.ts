"use server";

import { cookies } from "next/headers";



export const getUsers = async () => {
  const cookieStore = await cookies();
const accessToken = cookieStore.get("accessToken")?.value;
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/users`,
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
    }
  );

  const result = await res.json();

  if (result.success) {
    return {
      success: true,
      message: "User retrived successfully",
      data: result.data,
    };
  }

  return {
    success: false,
    message: result.message || "User retrived failed",
    data: result.data,
  };
};
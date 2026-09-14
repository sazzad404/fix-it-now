"use server";

import { cookies } from "next/headers";

export const updateUserStatus = async (data: {
  userId: string;
  status: string;
}) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const url = `${process.env.BACKEND_API_URL}/api/admin/users/${data.userId}`;

    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({
        status: data.status,
      }),
    });

    const text = await res.text();

    let result;

    try {
      result = JSON.parse(text);
    } catch {
      return {
        success: false,
        message: `Server Error (${res.status})`,
      };
    }

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "User status update failed",
      };
    }

    return {
      success: true,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    console.error("🔥 UPDATE USER STATUS ERROR:", error);

    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong!",
    };
  }
};

"use server";

import { cookies } from "next/headers";

export const createCategory = async (name: string) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/create-categories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({
          name,
        }),
      },
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to create category",
      };
    }

    return {
      success: true,
      message: result.message || "Category created successfully",
      data: result.data,
    };
  } catch (error) {
    console.error("Create category error:", error);

    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};
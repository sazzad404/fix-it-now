"use server";

import { cookies } from "next/headers";

export const getCategories = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/categories`,
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
      message: "Category retrived successfully",
      data: result.data,
    };
  }

  return {
    success: false,
    message: result.message || "Category retrived failed",
    data: result.data,
  };
};

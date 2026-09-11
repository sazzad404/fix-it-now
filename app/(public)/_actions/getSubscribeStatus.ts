"use server";

import { cookies } from "next/headers";

export const getSubscribeStatus = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    // throw new Error("User not logged In");
    return {
      success: false,
      message: "user not logged in",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/subscription/status`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    },
  );

  const result = await res.json();


  return result;
};

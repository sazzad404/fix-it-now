"use server";

import { cookies } from "next/headers";

type LogoutResponse = {
  success: boolean;
  message: string;
};

export const logout = async (): Promise<LogoutResponse> => {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  return {
    success: true,
    message: "Logout successful",
  };
};
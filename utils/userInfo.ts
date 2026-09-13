"use server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

export const userInfo = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "Please login first",
    };
  }

  const decoded = jwt.decode(accessToken) as JwtPayload
  return decoded;
};

import { cookies } from "next/headers";

export const getMyProfile = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "Please login first",
    };
  }
  const response = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
  });

  const data = await response.json();

  return data;
};

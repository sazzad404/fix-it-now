import { cookies } from "next/headers";

export const getNewAccessToken = async () => {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get("accessToken")?.value;

  //   console.log(accessToken);

  if (!refreshToken) {
    // throw new Error("User not logged In");
    return {
      success: false,
      message: "refreshToken not found",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/refreshToken`,
    {
      method: "POST",
      headers: {
        // Authorization: accessToken as unknown as string,
        //   Authorization: `${accessToken}`,
        Cookie: `refreshToken=${refreshToken}`,
      },

      cache: "no-cache",
    },
  );

  const result = await res.json();
  //   console.log(result);

  return result;
};

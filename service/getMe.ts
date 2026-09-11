import { cookies } from "next/headers";

export const getMe = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  //   console.log(accessToken);

  if (!accessToken) {
    // throw new Error("User not logged In");
    return {
      success: false,
      message: "user not logged in",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
    headers: {
      // Authorization: accessToken as unknown as string,
      //   Authorization: `${accessToken}`,
      Cookie: `accessToken=${accessToken}`,
    },

    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24,
      tags: ["my-profile"],
    },
  });

  const result = await res.json();
  //   console.log(result);

  return result;
};

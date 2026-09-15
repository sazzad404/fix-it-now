import { cookies } from "next/headers";
import DashboardHeader from "./_components/DashboardHeader";
import DashboardSidebar from "./_components/DashboardSidebar";
import jwt, { JwtPayload } from "jsonwebtoken";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    // throw new Error("User not logged In");
    // return {
    //   success: false,
    //   message: "user not logged in",
    // };

    return <div>User not logged in</div>;
  }

  const user = jwt.decode(accessToken) as JwtPayload;
  // console.log("decodedToken", user);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <DashboardSidebar user={user} />

        {/* Main Area */}
        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardHeader />

          <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

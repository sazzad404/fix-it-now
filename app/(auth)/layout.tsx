import Navbar from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";
import React from "react";
import Footer from "../(public)/_components/Footer";

const AuthLayout = async({ children }: { children: React.ReactNode }) => {
  const user = await getMe();
//   console.log("Auth User:", user);

  return (
    <div className="  ">
      <Navbar user={user} />
      {children}
      <Footer/>
    </div>
  );
};

export default AuthLayout;

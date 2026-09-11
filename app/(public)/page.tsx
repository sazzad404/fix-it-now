import { getMe } from "@/service/getMe";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {

  const user = await getMe();
  // console.log(user, "dsdsdsdsdsdad")
  return (
   <div>
    Hello Devs,
    Blog page <Link href={"/blogs"}>Blogs</Link>
   </div>
  );
}

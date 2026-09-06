import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
   <div>
    Hello Devs,
    Blog page <Link href={"/blogs"}>Blogs</Link>
   </div>
  );
}

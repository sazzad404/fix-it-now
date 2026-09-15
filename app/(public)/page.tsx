import { getMe } from "@/service/getMe";
import Image from "next/image";
import Link from "next/link";
import Hero from "./_components/Hero";
import FeaturedServices from "./_components/FeaturedServices";
import Sponsors from "./_components/Sponsor";
import Footer from "./_components/Footer";
import HowItWorks from "./_components/HowItWorks";
import WhyChooseUs from "./_components/WhyChooseUs";
import Testimonials from "./_components/Testimonials";


export default async function HomePage() {
  // const user = await getMe();
  // console.log(user, "dsdsdsdsdsdad")
  return (
    <main>
      <Hero />
      <FeaturedServices />
      <HowItWorks />
      <WhyChooseUs/>
      <Testimonials/>
      <Sponsors />
     <Footer/>
    </main>
  );
}

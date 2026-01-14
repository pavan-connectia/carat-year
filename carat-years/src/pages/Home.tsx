import HomeHero from "@/components/home/HomeHero";
import FAQ from "@/components/shared/FAQ";
import AboutUs from "@/components/shared/AboutUs";
import CaratPromise from "@/components/home/CaratPromise";
// import Testimonial from "@/components/shared/Testimonial";
import HomeCategories from "@/components/home/HomeCategories";
import CraftedByLook from "@/components/shared/CraftedByLook";
import Custom from "@/components/home/Custom";
import FloatingWhtasapp from "@/components/shared/FloatingWhtasapp";
import ShopTimeless from "@/components/home/ShopTimeless";
import ExploreColllection from "@/components/home/ExploreCollection";

export default function () {
  return (
    <>
      <HomeHero />
      <FloatingWhtasapp />
      <ShopTimeless />
      <CaratPromise />
      <HomeCategories />
      <AboutUs />
      {/* <Testimonial /> */}
      <Custom />
      <ExploreColllection />
      <CraftedByLook />
      <FAQ />
    </>
  );
}

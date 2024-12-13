// Packages
import dynamic from "next/dynamic";

// Local imports
import AboutFood from "@/components/home/about-food";
import AboutHome from "@/components/home/about-home";
import BestChef from "@/components/home/best-chef";
import BookOnline from "@/components/home/book-online";
import DeliveryPartnerSection from "@/components/home/delivery-partner-section";
import LatestNews from "@/components/home/latest-news";
import OurSpecialMenus from "@/components/home/our-special-menus";
import Speciality from "@/components/home/speciality";
import WhyBest from "@/components/home/why-best";
import Banner from "@/components/ui/banner";
import BannerInfo from "@/components/ui/BannerInfo";
const CustomerReviews = dynamic(
  () => import("@/components/home/customer-reviews")
);

export default async function Home() {
  return (
    <div>
      {/* Rendering the Banner component at the top of the page */}
      <Banner />
      {/* Rendering the BannerInfo component below the Banner */}
      <BannerInfo />
      {/* Special category section */}
      <Speciality />
      {/* Our Special Menus */}
      <OurSpecialMenus />
      {/* Why best section */}
      <WhyBest />
      {/* Book online section */}
      <BookOnline />
      {/* Best chef section */}
      <BestChef />
      {/* Latest news section */}
      <LatestNews />
      {/* Customer reviews section */}
      <CustomerReviews />
      {/* About food */}
      <AboutFood />
      <DeliveryPartnerSection />
      {/* About section */}
      <AboutHome />
    </div>
  );
}

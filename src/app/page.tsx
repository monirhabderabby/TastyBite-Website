import Speciality from "@/components/home/speciality";
import Banner from "@/components/ui/banner";
import BannerInfo from "@/components/ui/BannerInfo";

export default function Home() {
  return (
    <div className="relative">
      {/* Rendering the Banner component at the top of the page */}
      <Banner />
      {/* Rendering the BannerInfo component below the Banner */}
      <BannerInfo />
      {/* Special category section */}
      <Speciality />
    </div>
  );
}

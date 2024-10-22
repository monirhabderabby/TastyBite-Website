import Banner from "@/components/ui/banner";
import BannerInfo from "@/components/ui/BannerInfo";

export default function Home() {
  return (
    <div className="relative pb-[500px]">
      {/* Rendering the Banner component at the top of the page */}
      <Banner />
      {/* Rendering the BannerInfo component below the Banner */}
      <BannerInfo />
    </div>
  );
}

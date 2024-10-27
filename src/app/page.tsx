import AboutHome from "@/components/home/about-home";
import BestChef from "@/components/home/best-chef";
import BookOnline from "@/components/home/book-online";
import CustomerReviews from "@/components/home/customer-reviews";
import LatestNews from "@/components/home/latest-news";
import OurSpecialMenus from "@/components/home/our-special-menus";
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
            {/* Our Special Menus */}
            <OurSpecialMenus />
            {/* Book online section */}
            <BookOnline />
            {/* Best chef section */}
            <BestChef />
            {/* Latest news section */}
            <LatestNews />
            {/* Customer reviews section */}
            <CustomerReviews />
            {/* About section */}
            <AboutHome />
        </div>
    );
}

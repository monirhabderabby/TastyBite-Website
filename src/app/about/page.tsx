import AboutExperience from "@/components/about/AboutExperience";
import AboutTastybite from "@/components/about/AboutTastybite";
import OurStory from "@/components/about/OurStory";
import Pageheader from "@/components/common/PageHeaderBanner/Pageheader";



const Page = () => {
  return <div>
    {/* about banner section add */}
    <div>
      <Pageheader
        img={'https://utfs.io/f/oI7Ou0bdQ6rjiGyuYM7CO0fsq7HAWnKhc6pERGMxZXFQizYo'}
        title="ABOUT US"
        activelink="About us"
      />
    </div>
    {/* Tastybite about section add */}
    <div className="py-10 bg-[#F4F1EA]">
      <AboutTastybite/>
      <OurStory/>
      <AboutExperience/>
    </div>
  </div>;
};

export default Page;

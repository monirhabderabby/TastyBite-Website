import ChefCard from "@/components/common/cards/chef-card/chef-card";
import ChefsPageHeader from "./_components/ChefPageHeader";
import { TStaff } from "@/types";
import BookOnline from "@/components/home/book-online";

import CustomerReviews from "@/components/home/customer-reviews";
import MarqueeSec from "@/components/common/Marquee/MarqueeSec";
import WhyBest from "@/components/home/why-best";

const Page = async () => {
  const chefsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/staff?designation=Chef`,
    {
      cache: "no-cache",
    }
  );
  const chefsData = await chefsRes.json();
  const chefs = chefsData.data;
  return (
    <div className=" ">
      <ChefsPageHeader />
      <div>
        <div className="text-center pt-16 pb-10 space-y-5 text-black">
          <p className="text-xl font-bold uppercase text-red-700">
            about our food
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[3vw] font-black">
            MEET OUR EXPERT CHEFS
          </h2>
        </div>

        <div className="grid  mx-auto container grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {chefs?.map((chef: TStaff) => {
            return <ChefCard chef={chef} key={chef._id} />;
          })}
        </div>
        <WhyBest/>
        <MarqueeSec />
        <CustomerReviews />
        <BookOnline />
      </div>
    </div>
  );
};

export default Page;

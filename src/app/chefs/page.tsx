import ChefCard from "@/components/common/cards/chef-card/chef-card";
import BookOnline from "@/components/home/book-online";
import { TStaff } from "@/types";
import ChefsPageHeader from "./_components/ChefPageHeader";

import MarqueeSec from "@/components/common/Marquee/MarqueeSec";
import SectionHeader from "@/components/common/sectionHeader/sectionHeader";
import CustomerReviews from "@/components/home/customer-reviews";
import WhyBest from "@/components/home/why-best";

const Page = async () => {
  const chefsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/staff?designation=Chef`,
    {
      next: {
        revalidate: 120,
      },
    }
  );
  const chefsData = await chefsRes.json();
  const chefs = chefsData.data;
  return (
    <div className=" ">
      <ChefsPageHeader />
      <div>
        <div className=" my-10 md:my-12 w-fit mx-auto">
          <SectionHeader
            heading="Book Online"
            title="Fresh From TastyBite"
            textPosition="center"
          />
        </div>

        <div className="grid  mx-auto container grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10">
          {chefs?.map((chef: TStaff) => {
            return <ChefCard chef={chef} key={chef._id} />;
          })}
        </div>
        <WhyBest />
        <MarqueeSec />
        <CustomerReviews />
        <BookOnline />
      </div>
    </div>
  );
};

export default Page;

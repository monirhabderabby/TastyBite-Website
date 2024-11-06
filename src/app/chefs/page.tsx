import ChefCard from "@/components/common/cards/chef-card/chef-card";
import ChefsPageHeader from "./_components/ChefPageHeader";
import { TStaff } from "@/types";
import BookOnline from "@/components/home/book-online";
import CustomerReviewCard from "@/components/common/cards/customer-review-card";
import CustomerReviews from "@/components/home/customer-reviews";

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
      <div className="mx-auto container">
        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {chefs?.map((chef: TStaff) => {
            return <ChefCard chef={chef} key={chef._id} />;
          })}
        </div>

        <BookOnline />
        <CustomerReviews />
      </div>
    </div>
  );
};

export default Page;

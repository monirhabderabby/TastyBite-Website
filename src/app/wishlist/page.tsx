/* eslint-disable @typescript-eslint/no-explicit-any */
// Local imports

import BreadcrumbComponent from "@/components/Breadcrumb/Breadcrum";
import FoodCart from "@/components/common/cards/food-card/food-card";

const Wishlist = () => {
  const breadcrumbLinks = {
    mode: "dark" as any,
    preLinks: [{ link: "/", name: "Home" }],
    pageName: "Blog Page",
  };
  
  

  return (
    <div className="container my-28 mx-auto ">
     <BreadcrumbComponent  links={breadcrumbLinks} />
      <h4 className="text-3xl dark:text-white text-black font-bold pt-7">
        WISHLIST
      </h4>
      <div className="grid grid-cols-2 gap-y-5  md:grid-cols-3 lg:grid-cols-4 mt-5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((item, index) => {
          return <FoodCart key={index} theme="light" />;
        })}
      </div>
    </div>
  );
};

export default Wishlist;

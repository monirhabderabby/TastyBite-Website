/* eslint-disable @typescript-eslint/no-explicit-any */

// Local imports

import BreadcrumbComponent from "@/components/Breadcrumb/Breadcrum";

import Wishlist_component from "./_components/wishlist_component";

const Wishlist = () => {
  const breadcrumbLinks = {
    mode: "light" as any,
    preLinks: [{ link: "/", name: "Home" }],
    pageName: "Blog Page",
  };

  return (
    <div className="container my-28 mx-auto ">
      <BreadcrumbComponent links={breadcrumbLinks} />
      <h4 className="text-3xl dark:text-white text-black font-bold pt-7">
        WISHLIST
      </h4>
      <Wishlist_component />
    </div>
  );
};

export default Wishlist;

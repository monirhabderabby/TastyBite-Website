/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import SidebarTitle from "@/components/blog/SidebarTitle";
import { useGetAllMenusQuery } from "@/redux/features/menu/menuApi";
import { FaBowlFood } from "react-icons/fa6";

const Blog_category = () => {
  const { data, isLoading } = useGetAllMenusQuery(undefined);

  if (isLoading) return <p>Loading...</p>;
  const menus = data?.data;
  return (
    <div className="mt-24 ">
      {/* title */}
      <SidebarTitle title="CATEGORIES" />
      {/* category filter */}
      <div className="mt-5 flex flex-col gap-y-5">
        {menus?.map((item: any) => (
          <div key={item}>
            <div className="w-full flex items-center">
              <h2 className="bg-[#f3f2f2] cursor-pointer flex items-center gap-x-2 text-black font-semibold text-xl flex-1 px-5 py-4">
                <FaBowlFood className="text-xl text-black" />
                {item.name}
              </h2>
              <div>
                <p className="bg-primary-gray text-xl font-bold px-6  py-4">
                  {item?.foods?.length}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog_category;

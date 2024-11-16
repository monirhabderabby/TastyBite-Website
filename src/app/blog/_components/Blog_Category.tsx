/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import SidebarTitle from "@/components/blog/SidebarTitle";
import { setMenu } from "@/redux/features/filter/filterSlice";
import { useGetAllMenusQuery } from "@/redux/features/menu/menuApi";
import { useAppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";

import { FaBowlFood } from "react-icons/fa6";

const Blog_category = () => {
  const { data, isLoading } = useGetAllMenusQuery(undefined);
  const dispatch = useAppDispatch();
  const router = useRouter();
  if (isLoading)
    return (
      <div className="mt-24">
        <SidebarTitle title="CATEGORIES" />
        {[1, 2, 3].map((item) => (
          <div key={item}>
            <div className="w-full flex items-center"></div>
            <div className="bg-[#f3f2f2] flex items-center gap-x-2 text-black font-semibold text-xl flex-1 px-5 py-4 animate-pulse">
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              <div className="w-32 h-6 bg-gray-300 rounded"></div>
            </div>
            <div>
              <div className="bg-primary-gray text-xl font-bold px-6 py-4 animate-pulse">
                <div className="w-8 h-6 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );

  const menus = data?.data;
  return (
    <div className=" mt-24 ">
      {/* title */}
      <SidebarTitle title="CATEGORIES" />
      {/* category filter */}
      <div className="mt-5 flex flex-col gap-y-5">
        {menus?.map((item: any) => (
          <div key={item}>
            <div className="w-full flex items-center">
              <h2
                onClick={() => {
                  dispatch(setMenu(item._id));
                  router.push(`/foods`);
                }}
                className="bg-[#f3f2f2] cursor-pointer flex items-center gap-x-2 text-black font-semibold text-xl flex-1 px-5 py-4"
              >
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

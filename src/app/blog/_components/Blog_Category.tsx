import SidebarTitle from "@/components/blog/SidebarTitle";
import { FaBowlFood } from "react-icons/fa6";

const Blog_category = () => {
  const arr = [1, 2, 3, 4, 5];
  return (
    <div className="mt-24 ">
      {/* title */}
      <SidebarTitle title="CATEGORIES" />
      {/* category filter */}
      <div className="mt-5 flex flex-col gap-y-5">
        {arr.map((item) => (
          <div key={item}>
            <div className="w-full flex items-center">
              <h2 className="bg-[#f3f2f2] cursor-pointer flex items-center gap-x-2 text-black font-semibold text-xl flex-1 px-5 py-4">
                <FaBowlFood className="text-xl text-black" />
                FOOD MENU
              </h2>
              <div>
                <p className="bg-primary-gray text-xl font-bold px-6  py-4">
                  24
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

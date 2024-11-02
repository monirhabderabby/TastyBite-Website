import FoodsFilterContainer from "./_components/filter/foods-filter-container";
import MobileFilterContainer from "./_components/filter/mobile-filter-container";
import FoodsContainer from "./_components/foods-container";

const Page = () => {
  return (
    <div className="flex flex-col md:flex-row items-start gap-x-10 min-h-screen container space-y-10 mt-10">
      <div className=" md:hidden w-full">
        <MobileFilterContainer />
      </div>
      <div className="hidden md:block md:w-[314px] flex-initial">
        <FoodsFilterContainer />
      </div>
      <div className="flex-auto">
        <FoodsContainer />
      </div>
    </div>
  );
};

export default Page;

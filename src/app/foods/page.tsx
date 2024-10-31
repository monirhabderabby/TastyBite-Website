import FoodsFilterContainer from "./_components/filter/foods-filter-container";
import FoodsContainer from "./_components/foods-container";

const Page = () => {
  return (
    <div className="flex items-start gap-x-10 min-h-screen container mt-10">
      <div className="w-[314px] flex-initial">
        <FoodsFilterContainer />
      </div>
      <div className="flex-auto">
        <FoodsContainer />
      </div>
    </div>
  );
};

export default Page;

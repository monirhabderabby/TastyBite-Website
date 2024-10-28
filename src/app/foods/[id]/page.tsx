import FoodInfos from "./_components/food-infos";
import FoodOverview from "./_components/food-overview";

const Page = () => {
  return (
    <section className="container mt-[100px] space-y-[100px]">
      <div>
        <FoodOverview />
      </div>
      <FoodInfos />
    </section>
  );
};

export default Page;

import FoodInfos from "./_components/food-infos";
import FoodOverview from "./_components/food-overview";
import RecentlyViewedProducts from "./_components/recently-viewed-products";
import RelatedProducts from "./_components/related-products";

const Page = () => {
  return (
    <section className="container mt-[100px] space-y-[100px] pb-[150px]">
      <div>
        <FoodOverview />
      </div>
      <FoodInfos />

      <RelatedProducts />
      <RecentlyViewedProducts />
    </section>
  );
};

export default Page;

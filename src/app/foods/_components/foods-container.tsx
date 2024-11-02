import FoodCart from "@/components/common/cards/food-card/food-card";
import Sorting from "./filter/sorting";

const FoodsContainer = () => {
  return (
    <div>
      <div className="lg:flex justify-end hidden">
        <Sorting />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-[50px]">
        <FoodCart theme="light" />
        <FoodCart theme="light" />
        <FoodCart theme="light" />
        <FoodCart theme="light" />
        <FoodCart theme="light" />
        <FoodCart theme="light" />
        <FoodCart theme="light" />
        <FoodCart theme="light" />
      </div>
    </div>
  );
};

export default FoodsContainer;

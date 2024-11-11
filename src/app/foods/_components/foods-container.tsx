"use client";
import FoodCart from "@/components/common/cards/food-card/food-card";
import SkeletonWrapper from "@/components/ui/skeleton-wrapper";
import { useGetAllFoodsQuery } from "@/redux/features/food/foodApi";
import Sorting from "./filter/sorting";

const FoodsContainer = () => {
  const { isLoading, data: foods,  } = useGetAllFoodsQuery(undefined);

  let content;

  if (isLoading) {
    content = (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-[50px]">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n}>Loading...</div>
        ))}
      </div>
    );
  } 
  // else if (isError) {
  //   content = (
  //     <div className="min-h-[300px] w-full flex justify-center items-center">
  //       {error?.message}
  //     </div>
  //   );
  // } 
  else if (foods.data?.length === 0) {
    content = <div>NO DATA FOUND!</div>;
  } else if (foods?.data?.length > 0) {
    content = (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-[50px]">
        <FoodCart theme="light" />
        <FoodCart theme="light" />
        <FoodCart theme="light" />
        <FoodCart theme="light" />
        <FoodCart theme="light" />
        <FoodCart theme="light" />
        <FoodCart theme="light" />
      </div>
    );
  }
  return (
    <div>
      <div className="lg:flex justify-end hidden">
        <SkeletonWrapper isLoading={isLoading} fullWidth={false}>
          <Sorting />
        </SkeletonWrapper>
      </div>

      {content}
    </div>
  );
};

export default FoodsContainer;

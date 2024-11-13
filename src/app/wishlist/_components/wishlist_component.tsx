"use client";

import FoodCart from "@/components/common/cards/food-card/food-card";
import { Card, CardContent } from "@/components/ui/card";
import { useGetAllFoodsQuery } from "@/redux/features/food/foodApi";
import { TFood } from "@/types";

const Wishlist_component = () => {
  const { data, isLoading } = useGetAllFoodsQuery("?limit=10");
  const foods = data?.data || [];

if(isLoading) return (
    <div className="grid grid-cols-2 gap-y-5 gap-3 md:grid-cols-3 lg:grid-cols-4 mt-5">
    {
    [1,2,3,4].map((item)=> <Card key={item} className="w-full max-w-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="aspect-square w-full bg-gray-200 animate-pulse" />
          <div className="p-4 space-y-2">
            <div className="h-6 bg-gray-200 rounded-full w-3/4 mx-auto animate-pulse" />
            <div className="h-8 bg-gray-200 rounded-full w-1/3 mx-auto animate-pulse" />
          </div>
        </CardContent>
      </Card>)
   }     
    </div>
  
);

  return (
    <div className="grid grid-cols-2 gap-y-5  md:grid-cols-3 lg:grid-cols-4 mt-5">
      {foods?.map((item: TFood) => {
        return <FoodCart food={item} key={item._id} theme="light" />;
      })}
    </div>
  );
};

export default Wishlist_component;

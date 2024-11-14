"use client";

import {
    useGetAllFoodsQuery,
    useGetSingleFoodQuery,
} from "@/redux/features/food/foodApi";
import FoodInfos from "./food-infos";
import FoodOverview from "./food-overview";
import RelatedProducts from "./related-products";

const SingleFoodContainer = ({ foodId }: { foodId: string }) => {
    const { data, isLoading } = useGetSingleFoodQuery(foodId);
    const { data: foodsData, isLoading: foodsLoading } = useGetAllFoodsQuery(
        {}
    );

    if (isLoading || foodsLoading) {
        return (
            <div className="h-[60vh] text-2xl text-black flex justify-center items-center w-full animate-pulse">
                Loading...
            </div>
        );
    }

    return (
        <div>
            <div>
                <FoodOverview food={data.data} />
            </div>
            <FoodInfos food={data.data} />

            <RelatedProducts foods={foodsData?.data.slice(0, 4)} />
            {/* <RecentlyViewedProducts /> */}
        </div>
    );
};

export default SingleFoodContainer;

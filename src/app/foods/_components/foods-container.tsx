"use client";
import FoodCart from "@/components/common/cards/food-card/food-card";
import FoodCardLoader from "@/components/common/skeleton-loader/food-card-loader";
import SkeletonWrapper from "@/components/ui/skeleton-wrapper";
import { useGetAllFoodsQuery } from "@/redux/features/food/foodApi";
import { RootState } from "@/redux/store";
import { TFood } from "@/types";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { SearchFoodByName } from "./filter/foods-filter-container";
import Sorting from "./filter/sorting";

const FoodsContainer = () => {
    // for dynamic animation
    const stagger = {
        hidden: { opacity: 0, y: 50 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.2, duration: 1 },
        }),
    };

    const { menu, min, max, searchTerm, sortBy } = useSelector(
        (state: RootState) => state.filter
    );

    const { data: foods, isLoading } = useGetAllFoodsQuery({
        searchTerm,
        menu,
        min,
        max,
        sortBy,
    });

    let content;

    if (isLoading) {
        content = (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-5 gap-y-[50px]">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <FoodCardLoader key={n} />
                ))}
            </div>
        );
    } else if (foods.data?.length === 0) {
        content = (
            <div className="text-center py-40 text-primary-gray">
                <p className="text-lg font-semibold">
                    No foods match your criteria.
                </p>
                <p>Try adjusting your filters or search terms.</p>
            </div>
        );
    } else if (foods?.data?.length > 0) {
        content = (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-10 gap-y-[50px]">
                {foods?.data?.map((food: TFood, i: number) => (
                    <motion.div
                        key={food?._id}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        variants={stagger}
                        viewport={{ once: true }}
                    >
                        <FoodCart theme="light" food={food} />
                    </motion.div>
                ))}
            </div>
        );
    }

    return (
        <div>
            <div className="hidden lg:flex justify-between mb-10">
                <SearchFoodByName />
                <SkeletonWrapper isLoading={isLoading} fullWidth={false}>
                    <Sorting />
                </SkeletonWrapper>
            </div>

            <div className="mb-20">{content}</div>
        </div>
    );
};

export default FoodsContainer;

"use client";
// Packages
import { useState } from "react";

// Local imports
import Tabs from "@/components/ui/tabs";
import {
    useGetAllFoodsQuery,
    useGetFoodByMenuQuery,
} from "@/redux/features/food/foodApi";
import { useGetAllMenusQuery } from "@/redux/features/menu/menuApi";
import { TFood } from "@/types";
import FoodCart from "../common/cards/food-card/food-card";
import FoodCardLoader from "../common/skeleton-loader/food-card-loader";

const MenusContaner = () => {
    const [activeTab, setActiveTab] = useState("all");
    const { data: menuData } = useGetAllMenusQuery({});
    const { data, isLoading, isSuccess } = useGetAllFoodsQuery({});
    const { data: foodByMenu, isLoading: foodByMenuLoading } =
        useGetFoodByMenuQuery(activeTab, {
            skip: activeTab === "all",
        });

    const allMenuTabs = menuData?.data?.map(
        (menu: { _id: string; name: string }) => ({
            id: menu._id,
            label: menu.name,
        })
    );

    const specialMenuTabs = [
        { id: "all", label: "All" },
        ...(allMenuTabs || []),
    ];

    let content;
    if (isLoading || foodByMenuLoading) {
        content = (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 gap-y-12 mt-10">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <FoodCardLoader key={n} />
                ))}
            </div>
        );
    } else if (isSuccess) {
        content = (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 gap-y-12 mt-10">
                {activeTab === "all"
                    ? data?.data
                          ?.slice(0, 8)
                          .map((food: TFood) => (
                              <FoodCart
                                  key={food?._id}
                                  theme="black"
                                  food={food}
                              />
                          ))
                    : foodByMenu?.data
                          ?.slice(0, 8)
                          .map((food: TFood) => (
                              <FoodCart
                                  key={food?._id}
                                  theme="black"
                                  food={food}
                              />
                          ))}
            </div>
        );
    }

    return (
        <div>
            <div className="w-full flex justify-center mt-10">
                <Tabs
                    data={specialMenuTabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            </div>
            {content}
        </div>
    );
};

export default MenusContaner;

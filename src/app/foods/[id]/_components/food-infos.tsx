"use client";

import { tab, TFood } from "@/types";
import { useState } from "react";
import FoodInfosTabs from "./food-infos.tabs";
import ReviewsContainer from "./reviews-container";

const menus = [
    {
        id: "1",
        label: "Description",
    },
    {
        id: "2",
        label: "Additional Information",
    },
    {
        id: "3",
        label: "Shipping & Return",
    },
    {
        id: "4",
        label: "Reviews",
    },
] as tab[];

const FoodInfos = ({ food }: { food: TFood }) => {
    const [activeTab, setActiveTab] = useState(menus[0].id);
    return (
        <div className="space-y-[50px]">
            <div className="bg-gray-300/50 h-[1px] w-full" />
            <div>
                <FoodInfosTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    menus={menus}
                />
                <div className="mt-10">
                    {activeTab === "1" && (
                        <Description desc={food.description} />
                    )}
                    {activeTab === "4" && (
                        <ReviewsContainer foodId={food._id} />
                    )}
                </div>
            </div>
            <div className="bg-gray-300/50 h-[1px] w-full" />
        </div>
    );
};

export default FoodInfos;

const Description = ({ desc }: { desc: string }) => {
    return <p className="text-gray-500">{desc}</p>;
};

"use client";

import { tab } from "@/types";
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

const FoodInfos = () => {
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
            <Description
              desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam tenetur
      laborum nemo velit eveniet cumque corporis iste laboriosam assumenda?
      Ullam veritatis suscipit blanditiis sunt, placeat perspiciatis. Laboriosam
      quae ratione dolor repudiandae facilis excepturi animi nesciunt aliquam
      quod deleniti, nulla quas?"
            />
          )}
          {activeTab === "4" && <ReviewsContainer />}
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

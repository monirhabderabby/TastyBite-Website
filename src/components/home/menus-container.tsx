"use client";
// Packages
import { useState } from "react";

// Local imports
import Tabs from "@/components/ui/tabs";
import { specialMenusTabs } from "@/data/menus";
import FoodCart from "../common/cards/food-card/food-card";

const MenusContaner = () => {
  const [activeTab, setActiveTab] = useState(specialMenusTabs[0].id);
  return (
    <div>
      <div className="w-full flex justify-center mt-10">
        <Tabs
          data={specialMenusTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 gap-y-12 mt-10">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <FoodCart key={n} theme="black" />
        ))}
      </div>
    </div>
  );
};

export default MenusContaner;

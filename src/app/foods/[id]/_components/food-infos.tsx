"use client";
import { tab } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";

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
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="bg-gray-300/50 h-[1px] w-full" />
    </div>
  );
};

export default FoodInfos;

// --------------------------------------------------------------------

interface TabsProps {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

const Tabs = ({ activeTab, setActiveTab }: TabsProps) => {
  return (
    <div className="flex items-center justify-center gap-x-10">
      <AnimatePresence mode="wait">
        {menus.map(({ id, label }) => {
          return (
            <button
              key={id}
              className="text-gray-700 text-[24px] relative"
              onClick={() => setActiveTab(id)}
            >
              {label}
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeTab === id ? 1 : 0,
                  transition: {
                    duration: 0.5,
                  },
                }}
                className="bg-gray-400 h-[2px] w-full mt-1"
              />
            </button>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

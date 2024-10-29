import { tab } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

interface TabsProps {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  menus: tab[];
}
const FoodInfosTabs = ({ activeTab, setActiveTab, menus }: TabsProps) => {
  return (
    <div className="flex items-center justify-center gap-x-10">
      <AnimatePresence mode="sync">
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
                    duration: 0.3,
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

export default FoodInfosTabs;

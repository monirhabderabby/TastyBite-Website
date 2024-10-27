"use client";
// Packages
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

// Local imports
import { tab } from "@/types";

interface Props {
  data: tab[];
  activeTab: string;
  setActiveTab: () => Dispatch<SetStateAction<string>>;
}

export default function Tabs({ data, activeTab, setActiveTab }: Props) {
  return (
    <div className="flex flex-wrap space-x-1">
      {data.map((tab: tab) => (
        <Tab
          key={tab.id}
          tab={tab}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      ))}
    </div>
  );
}

//  -----------------------------------------------------------------
interface TabProps {
  tab: tab;
  activeTab: string;
  setActiveTab: () => Dispatch<SetStateAction<string>>;
}

const Tab = ({ tab, activeTab, setActiveTab }: TabProps) => {
  return (
    <button
      onClick={() => setActiveTab(tab.id)}
      className={`${
        activeTab === tab.id ? "text-white" : "hover:text-white/60"
      } relative rounded-full px-3 py-1.5 text-sm md:text-xl font-medium text-white outline-sky-400 transition focus-visible:outline-2 my-2`}
      style={{
        WebkitTapHighlightColor: "",
      }}
    >
      {activeTab === tab.id && (
        <motion.span
          layoutId="bubble"
          className="absolute inset-0 z-10 bg-primary-orange mix-blend-lighten "
          style={{ borderRadius: 9999 }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      {tab.label}
    </button>
  );
};

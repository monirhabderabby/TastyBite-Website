"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

const FoodsFilterContainer = () => {
  return (
    <div className="hidden lg:block">
      <Categories />
    </div>
  );
};

export default FoodsFilterContainer;

const Categories = () => {
  const [selectedId, setSelectedId] = useState("1");
  const data = [
    {
      _id: "1",
      name: "Pizzas",
    },
    {
      _id: "2",
      name: "Burgers",
    },
    {
      _id: "3",
      name: "Pasta",
    },
    {
      _id: "4",
      name: "Salads",
    },
    {
      _id: "5",
      name: "Sandwiches",
    },
    {
      _id: "6",
      name: "Desserts",
    },
    {
      _id: "7",
      name: "Sushi",
    },
    {
      _id: "8",
      name: "Steak",
    },
    {
      _id: "9",
      name: "Tacos",
    },
    {
      _id: "10",
      name: "Drinks",
    },
  ];

  return (
    <div>
      <h1 className="text-[24px] uppercase text-primary-black font-semibold tracking-[2px]">
        categories
      </h1>

      <ScrollArea className="h-[250px] w-full rounded-md  p-4">
        <div className="flex flex-col w-full items-start  gap-y-2 mt-3 text-[#999999]">
          {data.map(({ _id, name }) => (
            <button
              key={_id}
              className="flex items-center gap-x-1"
              onClick={() => setSelectedId(_id)}
            >
              {selectedId === _id && <ChevronRight className="h- w-4" />}
              <span
                className={cn(
                  selectedId === _id ? "text-primary-orange font-medium" : ""
                )}
              >
                {name}
              </span>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

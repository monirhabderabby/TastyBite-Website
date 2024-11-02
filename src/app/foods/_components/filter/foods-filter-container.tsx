"use client";
// Packages
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import RangeSlider from "react-range-slider-input";

// Local Imports
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// CSS
import "react-range-slider-input/dist/style.css";

const FoodsFilterContainer = () => {
  return (
    <div className="hidden lg:block space-y-10">
      <CategoriesFilter />
      <PriceFilter />
    </div>
  );
};

export default FoodsFilterContainer;

export const CategoriesFilter = () => {
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

export const PriceFilter = () => {
  const [value, setValue] = useState([0, 120]);
  return (
    <div>
      <h1 className="text-[24px] uppercase text-primary-black font-semibold tracking-[2px]">
        price
      </h1>

      <div className="mt-3">
        <RangeSlider
          id="range-slider-green"
          className="bg-primary-orange"
          value={value} // Pass current min and max as slider values
          max={120} // Maximum value of the slider
          min={0} // Minimum value of the slider
          onInput={(value) => {
            setValue(value);
          }}
        />

        <div className="mt-4 flex items-center gap-x-4">
          <div className="border-input border rounded-md text-gray-700 w-[70px] py-1 flex justify-center items-center">
            ${value[0]}
          </div>
          <span className="text-gray-700">to</span>
          <div className="border-input border rounded-md text-gray-700 w-[70px] py-1 flex justify-center items-center">
            ${value[1]}
          </div>
        </div>
      </div>
    </div>
  );
};

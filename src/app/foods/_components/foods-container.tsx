import FoodCart from "@/components/common/cards/food-card/food-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FoodsContainer = () => {
  return (
    <div>
      <div className="lg:flex justify-end hidden">
        <Select>
          <SelectTrigger className="w-[180px] text-[#999999]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light" className="text-[#999999]">
              Best Selling
            </SelectItem>
            <SelectItem value="light" className="text-[#999999]">
              Price (low to high)
            </SelectItem>
            <SelectItem value="light" className="text-[#999999]">
              Price (high to low)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-[50px]">
        <FoodCart theme="light" />
        <FoodCart theme="light" />
        <FoodCart theme="light" />
        <FoodCart theme="light" />
        <FoodCart theme="light" />
        <FoodCart theme="light" />
        <FoodCart theme="light" />
        <FoodCart theme="light" />
      </div>
    </div>
  );
};

export default FoodsContainer;

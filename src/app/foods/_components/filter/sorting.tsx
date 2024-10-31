import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Sorting = () => {
  return (
    <div>
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
  );
};

export default Sorting;

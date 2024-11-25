import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import {
    CategoriesFilter,
    PriceFilter,
    SearchFoodByName,
} from "./foods-filter-container";
import Sorting from "./sorting";

const MobileFilterContainer = () => {
    return (
        <div className="flex justify-between w-full ">
            <Sheet>
                <SheetTrigger>
                    <button className="text-gray-600 flex items-center gap-x-2 hover:bg-gray-100 px-3 py-1 rounded-md md:ml-20">
                        <Filter className="h-4 w-4" />
                        Filter
                    </button>
                </SheetTrigger>
                <div className="hidden md:block">
                    <SearchFoodByName />
                </div>
                <SheetContent side="left">
                    <CategoriesFilter />
                    <PriceFilter />
                </SheetContent>
            </Sheet>
            <Sorting />
        </div>
    );
};

export default MobileFilterContainer;

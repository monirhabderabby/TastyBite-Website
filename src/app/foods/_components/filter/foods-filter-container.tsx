"use client";

// Packages
import { ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import RangeSlider from "react-range-slider-input";

// Local Imports
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// CSS
import { Input } from "@/components/ui/input";
import {
    setMax,
    setMenu,
    setMin,
    setSearchTerm,
} from "@/redux/features/filter/filterSlice";
import { useGetAllMenusQuery } from "@/redux/features/menu/menuApi";
import { RootState } from "@/redux/store";
import { debounce } from "lodash";
import "react-range-slider-input/dist/style.css";
import { useDispatch, useSelector } from "react-redux";

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
    const { menu } = useSelector((state: RootState) => state.filter);
    // const [selectedId, setSelectedId] = useState(menu || "");

    const dispatch = useDispatch();

    const { data: menuData } = useGetAllMenusQuery({});

    const menus = menuData?.data?.map(
        (menu: { _id: string; name: string }) => ({
            _id: menu._id,
            name: menu.name,
        })
    );

    const allMenu = [{ _id: "all", name: "All" }, ...(menus || [])];

    const handleMenuChange = (_id: string) => {
        if (_id !== "all") {
            if (_id === menu) {
                dispatch(setMenu(""));
            } else {
                dispatch(setMenu(_id));
            }
        } else {
            dispatch(setMenu(""));
        }
    };

    return (
        <div>
            <h1 className="text-[24px] uppercase text-primary-black font-semibold tracking-[2px]">
                categories
            </h1>

            <ScrollArea className="h-[300px] w-full rounded-md  p-4">
                <div className="flex flex-col w-full items-start  gap-y-2 mt-3 text-[#999999]">
                    {allMenu.map(({ _id, name }) => (
                        <button
                            key={_id}
                            className="flex items-center gap-x-1"
                            onClick={() => handleMenuChange(_id)}
                        >
                            {menu === _id && (
                                <ChevronRight className="h-4 w-4" />
                            )}
                            <span
                                className={cn(
                                    menu === _id
                                        ? "text-primary-orange font-medium"
                                        : ""
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
    const [value, setValue] = useState([0, 200]);

    const dispatch = useDispatch();

    const debouncedPriceRangeChange = useMemo(
        () =>
            debounce((value: [number, number]) => {
                dispatch(setMin(value[0]));
                dispatch(setMax(value[1]));
            }, 500),
        [dispatch]
    );

    const handlePriceRangeChange = (value: [number, number]) => {
        setValue(value);
        debouncedPriceRangeChange(value);
    };
    return (
        <div>
            <h1 className="text-[24px] uppercase text-primary-black font-semibold tracking-[2px]">
                Price
            </h1>

            <div className="mt-3">
                <RangeSlider
                    id="range-slider-green"
                    className="bg-primary-orange"
                    value={value} // Pass current min and max as slider values
                    max={200} // Maximum value of the slider
                    min={0} // Minimum value of the slider
                    onInput={(value: [number, number]) =>
                        handlePriceRangeChange(value)
                    }
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

export const SearchFoodByName = () => {
    const dispatch = useDispatch();

    // handling search term state update with debouncing
    const debouncedSearchTermChange = useMemo(
        () =>
            debounce((value: string) => {
                dispatch(setSearchTerm(value));
            }, 500),
        [dispatch]
    );

    const handleSearchTermChange = (value: string) => {
        debouncedSearchTermChange(value);
    };

    useEffect(() => {
        return () => {
            debouncedSearchTermChange.cancel();
        };
    }, [debouncedSearchTermChange]);

    return (
        <div>
            <Input
                placeholder="Search Foods"
                onChange={(e) => handleSearchTermChange(e.target.value)}
                className="text-primary-black md:w-72 lg:w-96"
            />
        </div>
    );
};

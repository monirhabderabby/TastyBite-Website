"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { setSorting } from "@/redux/features/filter/filterSlice";
import { debounce } from "lodash";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

const Sorting = () => {
    const dispatch = useDispatch();

    // handling search term state update with debouncing
    const debouncedSortingChange = useMemo(
        () =>
            debounce((value: string) => {
                dispatch(setSorting(value));
            }, 500),
        [dispatch]
    );

    const handleSortingChange = (value: string) => {
        debouncedSortingChange(value);
    };

    useEffect(() => {
        return () => {
            dispatch(setSorting(""));
        };
    }, [dispatch]);

    return (
        <div>
            <Select onValueChange={(value) => handleSortingChange(value)}>
                <SelectTrigger className="w-[180px] text-[#999999]">
                    <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                    {/* <SelectItem value="best" className="text-[#999999]">
                          Best Selling
                        </SelectItem> */}
                    <SelectItem value="price" className="text-[#999999]">
                        Price (low to high)
                    </SelectItem>
                    <SelectItem value="-price" className="text-[#999999]">
                        Price (high to low)
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default Sorting;

"use client";

import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { ScrollArea } from "@/components/ui/scroll-area";

import { setSearchTerm } from "@/redux/features/filter/filterSlice";
import { useGetAllFoodsQuery } from "@/redux/features/food/foodApi";
import { RootState } from "@/redux/store";
import { TFood } from "@/types";
import { motion } from "framer-motion";
import { debounce } from "lodash";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import FoodCart from "../cards/food-card/food-card";
import FoodCardLoader from "../skeleton-loader/food-card-loader";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const NavbarSearchModal = ({ open, setOpen }: Props) => {
    const { searchTerm } = useSelector((state: RootState) => state.filter);

    const dispatch = useDispatch();

    // for dynamic animation
    const stagger = {
        hidden: { opacity: 0, y: 50 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.2, duration: 1 },
        }),
    };

    // data fetching
    const {
        data: foods,
        isLoading,
        isError,
    } = useGetAllFoodsQuery({
        searchTerm,
    });

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
            dispatch(setSearchTerm(""));
        };
    }, [dispatch]);

    // foods content
    let content;

    if (isLoading) {
        content = (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-[50px]">
                {[1, 2, 3].map((n) => (
                    <FoodCardLoader key={n} />
                ))}
            </div>
        );
    } else if (isError) {
        content = (
            <div className="text-center py-40 text-primary-gray">
                <p className="text-lg font-semibold">Something went wrong.</p>
                <p>Please try again later.</p>
            </div>
        );
    } else if (foods.data?.length === 0) {
        content = (
            <div className="text-center py-40 text-primary-gray">
                <p className="text-lg font-semibold">
                    No foods match your criteria.
                </p>
                <p>Try adjusting your search terms.</p>
            </div>
        );
    } else if (foods?.data?.length > 0) {
        content = (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-[30px]">
                {foods?.data?.map((food: TFood, i: number) => (
                    <motion.div
                        key={food?._id}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        variants={stagger}
                        viewport={{ once: true }}
                    >
                        <FoodCart theme="light" food={food} />
                    </motion.div>
                ))}
            </div>
        );
    }

    return (
        <Modal open={open} setOpen={setOpen}>
            <div className="flex justify-center mt-5 px-5 md:px-0">
                <Input
                    placeholder="Search Foods"
                    onChange={(e) => handleSearchTermChange(e.target.value)}
                    className="text-primary-black w-full md:w-72 lg:w-96"
                />
            </div>

            <ScrollArea className="h-[50vh] mt-5">{content}</ScrollArea>
        </Modal>
    );
};

export default NavbarSearchModal;

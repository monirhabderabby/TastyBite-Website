"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { setMenu } from "@/redux/features/filter/filterSlice";
import { useGetAllFoodsQuery } from "@/redux/features/food/foodApi";
import { useGetAllMenusQuery } from "@/redux/features/menu/menuApi";
import { useAppDispatch } from "@/redux/store";
import { TFood, TMenu } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MenuContent = () => {
    const [hydrated, setHydrated] = useState(false);
    const { data, isLoading } = useGetAllFoodsQuery({ limit: 3 });
    const { data: menuData, isLoading: menuLoading } = useGetAllMenusQuery({});

    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleMenuChange = (_id: string) => {
        dispatch(setMenu(_id));
        router.push(`/foods`);
    };

    useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated || isLoading || menuLoading) {
        return (
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 p-4 sm:p-6">
                {/* Menu List Sidebar */}
                <div className="w-full sm:w-48 mb-6 sm:mb-0">
                    <Skeleton className="h-6 w-24 mb-4" />{" "}
                    {/* Menu List heading */}
                    <div className="flex sm:flex-col gap-3 flex-wrap">
                        {Array.from({ length: 7 }).map((_, i) => (
                            <Skeleton key={i} className="h-4 w-20 sm:w-32" />
                        ))}
                    </div>
                </div>

                {/* Product List */}
                <div className="flex-1 space-y-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <Skeleton className="h-16 w-16 sm:h-20 sm:w-20 rounded-full" />{" "}
                            {/* Product image */}
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-24 sm:w-32" />{" "}
                                {/* Product name */}
                                <Skeleton className="h-3 w-20 sm:w-24" />{" "}
                                {/* Category */}
                            </div>
                            <Skeleton className="h-8 w-20 sm:h-10 sm:w-28 rounded-full" />{" "}
                            {/* Shop now button */}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-between items-start gap-x-10 xl:gap-x-32 px-6 xl:px-10 py-5 xl:py-12">
            <div className="mt-5">
                <h3 className="text-primary-black font-semibold mb-4">
                    Menu List
                </h3>
                <div className="space-y-4 flex flex-col">
                    {menuData?.data.map((menu: TMenu) => (
                        <p
                            key={menu.name}
                            className={`text-primary-gray hover:text-primary-orange cursor-pointer`}
                            onClick={() => handleMenuChange(menu._id)}
                        >
                            {menu.name}
                        </p>
                    ))}
                </div>
                <div className="mt-16">
                    <Link
                        href={"/foods"}
                        className="text-primary-gray hover:text-primary-orange underline duration-300"
                    >
                        Find all foods
                    </Link>
                </div>
            </div>
            {/* Special foods */}
            <div>
                {data?.data?.map((food: TFood) => (
                    <div
                        key={food._id}
                        className="grid grid-cols-[1fr_auto] shadow-sm px-5 py-3 rounded-lg"
                    >
                        <div className="flex items-center gap-x-5">
                            <Image
                                src={food.images[0]}
                                alt=""
                                width={100}
                                height={100}
                                className="rounded-lg"
                            />
                            <div className="self-center">
                                <h4 className="text-primary-black font-bold">
                                    {food.name}
                                </h4>
                                <p className="text-primary-black">
                                    {food.menuId.name}
                                </p>
                            </div>
                        </div>
                        <div className="ml-5 self-center">
                            <Link
                                href={`/foods/${food._id}`}
                                className="uppercase text-white hover:text-primary-orange bg-primary-orange hover:bg-transparent rounded-[50px] text-base px-6 py-[10px] tracking-wide border-[1px] border-primary-orange font-semibold duration-300"
                            >
                                Shop Now
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuContent;

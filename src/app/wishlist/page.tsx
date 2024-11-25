/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import FoodCart from "@/components/common/cards/food-card/food-card";
// Local imports

import Pageheader from "@/components/common/PageHeaderBanner/Pageheader";
import FoodCardLoader from "@/components/common/skeleton-loader/food-card-loader";
import { useGetAllFoodsQuery } from "@/redux/features/food/foodApi";
import { RootState } from "@/redux/store";
import { TFood } from "@/types";
import { useSelector } from "react-redux";

const Wishlist = () => {
    const breadcrumbLinks = {
        mode: "dark" as any,
        preLinks: [{ link: "/", name: "Home" }],
        pageName: "Wishlist",
    };

    const wishlist = useSelector((state: RootState) => state.wishlist.items);

    // Check if the food is already in the wishlist
    // const isWishListed = wishlist.includes(food._id);

    const { data, isLoading, isSuccess } = useGetAllFoodsQuery({});

    // Filtering wishlist data
    const wishlistData: TFood[] = data?.data?.filter((food: TFood) =>
        wishlist.includes(food._id)
    );

    let content;
    if (isLoading) {
        content = (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 gap-y-12 mt-10">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <FoodCardLoader key={n} />
                ))}
            </div>
        );
    } else if (isSuccess && wishlistData.length === 0) {
        content = (
            <div className="text-center py-40 text-primary-gray">
                <p className="text-lg font-semibold">You wishlist is empty.</p>
                <p>Try adding some foods to wishlist.</p>
            </div>
        );
    } else if (isSuccess && wishlistData.length > 0) {
        content = (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 gap-y-12 mt-10">
                {wishlistData.map((food: TFood) => (
                    <FoodCart key={food._id} food={food} theme="light" />
                ))}
            </div>
        );
    }

    return (
        <div>
            <Pageheader
                img="https://utfs.io/f/oI7Ou0bdQ6rjyuWH9qZmawxvB8dF9SHPlQoWAbCuyU4hqriR"
                title="WISHLIST"
                breadLink={breadcrumbLinks}
            />
            <div className="container mx-auto my-24">{content}</div>
        </div>
    );
};

export default Wishlist;

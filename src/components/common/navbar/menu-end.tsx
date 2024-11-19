"use client";

import CartSheet from "@/components/cart/cart-sheet";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { selectCartTotalQuantity } from "@/redux/features/cart/cartSelector";
import { RootState } from "@/redux/store";
import { UserButton, useUser } from "@clerk/nextjs";
import { Bell, Heart, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

const MenuEnd = ({
    scrolling,
    pathname,
}: {
    scrolling: boolean;
    pathname: string;
}) => {
    const { isSignedIn } = useUser();
    const wishlist = useSelector((state: RootState) => state.wishlist.items);
    const cartItemsNumber = useSelector(selectCartTotalQuantity);

    return (
        <div className="hidden lg:flex items-center gap-x-4">
            <Button
                variant="ghost"
                className="px-1 hover:bg-transparent hover:text-white"
            >
                <Search className="w-6" />
            </Button>
            {isSignedIn && (
                <Tooltip>
                    <TooltipTrigger>
                        <Link href="/notification" className="relative">
                            <Bell className="w-5" />
                            <p
                                className={`absolute -top-2 -right-3 ${
                                    scrolling
                                        ? "bg-[#91b842] text-white"
                                        : "bg-white text-primary-black"
                                } w-5 h-5 flex items-center justify-center rounded-full`}
                            >
                                0
                            </p>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent className="bg-primary-orange text-white">
                        Notifications
                    </TooltipContent>
                </Tooltip>
            )}
            <Tooltip>
                <TooltipTrigger>
                    <Link href="/wishlist" className="relative">
                        <Heart className="w-5" />
                        <p
                            className={`absolute -top-2 -right-3 ${
                                scrolling
                                    ? "bg-[#91b842] text-white"
                                    : "bg-white text-primary-black"
                            } w-5 h-5 flex items-center justify-center rounded-full`}
                        >
                            {wishlist.length}
                        </p>
                    </Link>
                </TooltipTrigger>
                <TooltipContent className="bg-primary-orange text-white">
                    Wishlist
                </TooltipContent>
            </Tooltip>
            {isSignedIn && (
                <Tooltip>
                    <TooltipTrigger>
                        {pathname !== "/cart" && isSignedIn ? (
                            <Sheet>
                                <SheetTrigger asChild>
                                    <div className="relative">
                                        <ShoppingCart className="w-5" />
                                        <p
                                            className={`absolute -top-2 -right-3 ${
                                                scrolling
                                                    ? "bg-[#91b842] text-white"
                                                    : "bg-white text-primary-black"
                                            } w-5 h-5 flex items-center justify-center rounded-full`}
                                        >
                                            {cartItemsNumber}
                                        </p>
                                    </div>
                                </SheetTrigger>
                                <SheetContent className="border p-0">
                                    <CartSheet />
                                </SheetContent>
                            </Sheet>
                        ) : (
                            <Link href="/cart" className="relative">
                                <ShoppingCart className="w-5" />
                                <p
                                    className={`absolute -top-2 -right-3 ${
                                        scrolling
                                            ? "bg-[#91b842] text-white"
                                            : "bg-white text-primary-black"
                                    } w-5 h-5 flex items-center justify-center rounded-full`}
                                >
                                    {cartItemsNumber}
                                </p>
                            </Link>
                        )}
                    </TooltipTrigger>
                    <TooltipContent className="bg-primary-orange text-white">
                        Cart
                    </TooltipContent>
                </Tooltip>
            )}

            {isSignedIn ? (
                <UserButton />
            ) : (
                <Tooltip>
                    <TooltipTrigger>
                        <Link href="/sign-in ">
                            <User className="w-5" />
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent className="bg-primary-orange text-white">
                        Sign In
                    </TooltipContent>
                </Tooltip>
            )}
        </div>
    );
};

export default MenuEnd;

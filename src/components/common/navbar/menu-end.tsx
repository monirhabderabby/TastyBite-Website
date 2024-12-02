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
import { SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Bell, Heart, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import NavbarSearchModal from "./navbar-search-modal";

const MenuEnd = ({
    scrolling,
    pathname,
    unreadNotification,
}: {
    scrolling: boolean;
    pathname: string;
    unreadNotification: number;
}) => {
    const [open, setOpen] = useState<boolean>(false);

    const { isSignedIn } = useUser();
    const wishlist = useSelector((state: RootState) => state.wishlist.items);
    const cartItemsNumber = useSelector(selectCartTotalQuantity);

    return (
        <div className="hidden lg:flex items-center gap-x-4">
            <Button
                variant="ghost"
                className="px-1 text-white hover:bg-transparent hover:text-primary-orange"
                onClick={() => setOpen(!open)}
            >
                <Search className="w-6" />
            </Button>
            {isSignedIn && (
                <Tooltip>
                    <TooltipTrigger>
                        <Link href="/notifications" className="relative">
                            <Bell className="w-5" />
                            {unreadNotification > 0 && (
                                <p
                                    className={`absolute -top-2 -right-[10px] ${
                                        scrolling
                                            ? "bg-[#91b842] text-white"
                                            : "bg-white text-primary-black"
                                    } w-[18px] h-[18px] text-[14px] flex items-center justify-center rounded-full`}
                                >
                                    {unreadNotification}
                                </p>
                            )}
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
                        {wishlist.length > 0 && (
                            <p
                                className={`absolute -top-2 -right-[10px] ${
                                    scrolling
                                        ? "bg-[#91b842] text-white"
                                        : "bg-white text-primary-black"
                                } w-[18px] h-[18px] text-[14px] flex items-center justify-center rounded-full`}
                            >
                                {wishlist.length}
                            </p>
                        )}
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
                                        {cartItemsNumber > 0 && (
                                            <p
                                                className={`absolute -top-2 -right-[10px] ${
                                                    scrolling
                                                        ? "bg-[#91b842] text-white"
                                                        : "bg-white text-primary-black"
                                                } w-[18px] h-[18px] text-[14px] flex items-center justify-center rounded-full`}
                                            >
                                                {cartItemsNumber}
                                            </p>
                                        )}
                                    </div>
                                </SheetTrigger>
                                <SheetContent className="border p-0">
                                    <CartSheet />
                                </SheetContent>
                            </Sheet>
                        ) : (
                            <Link href="/cart" className="relative">
                                <ShoppingCart className="w-5" />
                                {cartItemsNumber > 0 && (
                                    <p
                                        className={`absolute -top-2 -right-3 ${
                                            scrolling
                                                ? "bg-[#91b842] text-white"
                                                : "bg-white text-primary-black"
                                        } w-[18px] h-[18px] text-[14px] flex items-center justify-center rounded-full`}
                                    >
                                        {cartItemsNumber}
                                    </p>
                                )}
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
                <SignedOut>
                    <SignInButton
                        fallbackRedirectUrl="/"
                        signUpFallbackRedirectUrl="/wizard"
                    >
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
                    </SignInButton>
                </SignedOut>
            )}

            <NavbarSearchModal open={open} setOpen={setOpen} />
        </div>
    );
};

export default MenuEnd;

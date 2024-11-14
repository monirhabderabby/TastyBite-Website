"use client";

// Packages
import { UserButton, useUser } from "@clerk/nextjs";
import { Bell, Heart, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Components
import { Button } from "@/components/ui/button";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import { useGetAllFoodsQuery } from "@/redux/features/food/foodApi";
import { useGetAllMenusQuery } from "@/redux/features/menu/menuApi";
import { TFood, TMenu } from "@/types";
import ButtonPrimary from "../button/buttonPrimary";
import FoodCart from "../cards/food-card/food-card";
import Logo from "../logo/Logo";
import MobileNavbar from "./mobile-navbar";

const Navbar = () => {
    const [scrolling, setScrolling] = useState<boolean>(false);
    const [active, setActive] = useState<string | null>(null);

    const { data, isLoading } = useGetAllFoodsQuery({});
    const { data: menuData, isLoading: menuLoading } = useGetAllMenusQuery({});

    const { isSignedIn } = useUser();

    const pathname = usePathname(); // Get current route to highlight active menu

    // Track window scroll to update navbar style
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolling(true); // Set navbar background when scrolling
            } else {
                setScrolling(false); // Reset when not scrolling
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    if (isLoading || menuLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div
            className={`py-3 fixed top-0 z-50 text-white w-full h-[70px] ${
                scrolling && "bg-primary-black" // Add background when scrolling
            }  ${
                pathname !== "/" && "bg-primary-black" // Default background for other pages
            } transition duration-300`}
        >
            <div className="container h-full">
                <div className="flex justify-between items-center h-full">
                    <div className="hidden lg:flex">
                        <Logo />
                    </div>
                    <div className="hidden lg:flex">
                        {/* Desktop Menu Links */}
                        <Menu setActive={setActive}>
                            <Link href="/">
                                <span
                                    className={`hover:text-primary-orange ${
                                        pathname === "/"
                                            ? "text-primary-orange"
                                            : "text-white"
                                    }`}
                                >
                                    HOME
                                </span>
                            </Link>
                            <MenuItem
                                setActive={setActive}
                                active={active}
                                item="MENU"
                            >
                                <div className="flex justify-between items-start gap-x-10 xl:gap-x-32 px-6 xl:px-10 py-5 xl:py-12">
                                    <div className="mt-5">
                                        <h3 className="text-primary-black font-semibold mb-4">
                                            Menu List
                                        </h3>
                                        <div className="space-y-4 flex flex-col">
                                            {menuData?.data.map(
                                                (menu: TMenu) => (
                                                    <p
                                                        key={menu.name}
                                                        className={`text-primary-gray hover:text-primary-orange cursor-pointer`}
                                                    >
                                                        {menu.name}
                                                    </p>
                                                )
                                            )}
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
                                    <div className="grid grid-cols-3 xl:gap-10 gap-y-12">
                                        {data?.data
                                            ?.slice(0, 3)
                                            .map((food: TFood) => (
                                                <div key={food._id}>
                                                    <FoodCart
                                                        key={food?._id}
                                                        theme="light"
                                                        food={food}
                                                    />
                                                    <div className="flex justify-center mt-5">
                                                        <Link
                                                            href={`/foods/${food._id}`}
                                                        >
                                                            <ButtonPrimary text="Shop Now" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </MenuItem>
                            <Link href="/blog">
                                <span
                                    className={`hover:text-primary-orange ${
                                        pathname.includes("/blog")
                                            ? "text-primary-orange"
                                            : "text-white"
                                    }`}
                                >
                                    BLOG
                                </span>
                            </Link>
                            <Link href="/contact">
                                <span
                                    className={`hover:text-primary-orange ${
                                        pathname === "/contact"
                                            ? "text-primary-orange"
                                            : "text-white"
                                    }`}
                                >
                                    CONTACT
                                </span>
                            </Link>
                            <MenuItem
                                setActive={setActive}
                                active={active}
                                item="PAGES"
                            >
                                <div className="flex flex-col space-y-4 text-sm">
                                    <HoveredLink
                                        href="/chefs"
                                        className="hover:text-primary-orange"
                                    >
                                        Expert Chefs
                                    </HoveredLink>
                                    <HoveredLink href="/reservation">
                                        Reservation
                                    </HoveredLink>
                                    <HoveredLink href="/faqs">
                                        Faq&apos;s
                                    </HoveredLink>
                                    <HoveredLink href="/testimonial">
                                        Testimonial
                                    </HoveredLink>
                                    <HoveredLink href="/gallery">
                                        Gallery
                                    </HoveredLink>
                                    <HoveredLink href="/about">
                                        About Us
                                    </HoveredLink>
                                    <HoveredLink href="/team">
                                        Our Team
                                    </HoveredLink>
                                </div>
                            </MenuItem>
                            <Link href="/profile">
                                <span
                                    className={`hover:text-primary-orange ${
                                        pathname === "/contact"
                                            ? "text-primary-orange"
                                            : "text-white"
                                    }`}
                                >
                                    PROFILE
                                </span>
                            </Link>
                        </Menu>
                    </div>
                    {/* Menu end part */}
                    <div className="hidden lg:flex items-center gap-x-4">
                        <Button
                            variant="ghost"
                            className="px-1 hover:bg-transparent hover:text-white"
                        >
                            <Search className="w-6" />
                        </Button>
                        <Link href="/notification" className="relative">
                            <Bell className="w-5" />
                            <p
                                className={`absolute -top-2 -right-3 ${
                                    scrolling
                                        ? "bg-[#91b842] text-white"
                                        : "bg-white text-primary-black"
                                } w-5 h-5 flex items-center justify-center rounded-full`}
                            >
                                13
                            </p>
                        </Link>
                        {isSignedIn ? (
                            <UserButton />
                        ) : (
                            <Link href="/sign-in ">
                                <User className="w-5" />
                            </Link>
                        )}
                        <Link href="/wishlist">
                            <Heart className="w-5" />
                        </Link>
                        <Link href="/cart" className="relative">
                            <ShoppingCart className="w-5" />
                            <p
                                className={`absolute -top-2 -right-3 ${
                                    scrolling
                                        ? "bg-[#91b842] text-white"
                                        : "bg-white text-primary-black"
                                } w-5 h-5 flex items-center justify-center rounded-full`}
                            >
                                5
                            </p>
                        </Link>
                    </div>

                    {/* Mobile Responsive */}
                    <MobileNavbar
                        scrolling={scrolling}
                        isSignedIn={isSignedIn}
                    />
                </div>
            </div>
        </div>
    );
};

export default Navbar;

"use client";

// Packages
import { useUser } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Components
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import { setMenu } from "@/redux/features/filter/filterSlice";
import { useGetAllFoodsQuery } from "@/redux/features/food/foodApi";
import { useGetAllMenusQuery } from "@/redux/features/menu/menuApi";
import { TFood, TMenu } from "@/types";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Logo from "../logo/Logo";
import MobileNavbar from "./mobile-navbar";

const MenuEnd = dynamic(() => import("./menu-end"));

const Navbar = () => {
    const [scrolling, setScrolling] = useState<boolean>(false);
    const [active, setActive] = useState<string | null>(null);

    const dispatch = useDispatch();
    const router = useRouter();

    const { data, isLoading } = useGetAllFoodsQuery({});
    const { data: menuData, isLoading: menuLoading } = useGetAllMenusQuery({});

    const { isSignedIn } = useUser();

    const pathname = usePathname(); // Get current route to highlight active menu

    const handleMenuChange = (_id: string) => {
        dispatch(setMenu(_id));
        router.push(`/foods`);
    };

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
                                                        onClick={() =>
                                                            handleMenuChange(
                                                                menu._id
                                                            )
                                                        }
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
                                    <div className="">
                                        {data?.data
                                            ?.slice(0, 3)
                                            .map((food: TFood) => (
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
                                                                {
                                                                    food.menuId
                                                                        .name
                                                                }
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
                            {isSignedIn && (
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
                            )}
                        </Menu>
                    </div>
                    {/* Menu end part */}
                    <MenuEnd scrolling={scrolling} pathname={pathname} />

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

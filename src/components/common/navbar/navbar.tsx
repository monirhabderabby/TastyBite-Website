"use client";

// Packages
import { useUser } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Components
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import Logo from "../logo/Logo";
import MobileNavbar from "./mobile-navbar";

const MenuContent = dynamic(() => import("./menu-content"));
const MenuEnd = dynamic(() => import("./menu-end"));

const Navbar = () => {
    const [scrolling, setScrolling] = useState<boolean>(false);
    const [active, setActive] = useState<string | null>(null);

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
                                <MenuContent />
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

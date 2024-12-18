"use client";

// Packages
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Components
import { increamenttNotificationCount } from "@/cache/notification/notification.cache";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import { pusherClient } from "@/lib/pusher";
import { useUnreadNotificationQuery } from "@/redux/features/notification/notificationApi";
import { useAppDispatch } from "@/redux/store";
import Logo from "../logo/Logo";
import MobileNavbar from "./mobile-navbar";

const MenuContent = dynamic(() => import("./menu-content"));
const MenuEnd = dynamic(() => import("./menu-end"));

interface Props {
    userId: string | undefined;
}

const Navbar = ({ userId }: Props) => {
    const [scrolling, setScrolling] = useState<boolean>(false);
    const [active, setActive] = useState<string | null>(null);

    // const { isSignedIn, isLoaded, user } = useUser();
    const dispatch = useAppDispatch();

    // Use a flag to conditionally skip the query
    const skipQuery = !userId;

    const { data: notification } = useUnreadNotificationQuery(
        { userId },
        {
            skip: skipQuery,
        }
    );

    const pathname = usePathname(); // Get current route to highlight active menu

    // read real time notification count from server

    useEffect(() => {
        const notificationHandler = () => {
            if (userId) {
                increamenttNotificationCount(dispatch, userId);
            }
        };
        if (userId) {
            pusherClient.subscribe(userId!);
        }

        pusherClient.bind("notification:new", notificationHandler);

        return () => {
            if (userId) {
                pusherClient.unsubscribe(userId);
            }
            pusherClient.unbind("notification:new", notificationHandler);
        };
    }, [userId, dispatch]);

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
                                </div>
                            </MenuItem>
                            {userId && (
                                <Link href="/profile">
                                    <span
                                        className={`hover:text-primary-orange ${
                                            pathname === "/profile"
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
                    <MenuEnd
                        scrolling={scrolling}
                        pathname={pathname}
                        unreadNotification={notification?.data}
                    />

                    {/* Mobile Responsive */}
                    <MobileNavbar
                        scrolling={scrolling}
                        isSignedIn={Boolean(userId)}
                        unreadNotification={notification?.data}
                    />
                </div>
            </div>
        </div>
    );
};

export default Navbar;

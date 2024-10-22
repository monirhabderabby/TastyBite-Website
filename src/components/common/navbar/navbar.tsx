"use client";

// Packages
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Components
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify, Heart, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import Logo from "../logo/Logo";

const Navbar = () => {
    const [scrolling, setScrolling] = useState<boolean>(false);
    const [active, setActive] = useState<string | null>(null);

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
                    <div className="hidden md:flex">
                        <Logo />
                    </div>
                    <div className="hidden md:flex">
                        {/* Desktop Menu Links */}
                        <Menu setActive={setActive}>
                            <Link href="/">
                                <span className="text-white">HOME</span>
                            </Link>
                            <MenuItem
                                setActive={setActive}
                                active={active}
                                item="MENU"
                            >
                                <div className="flex flex-col space-y-4 text-sm">
                                    <HoveredLink href="/web-dev">
                                        Web Development
                                    </HoveredLink>
                                    <HoveredLink href="/interface-design">
                                        Interface Design
                                    </HoveredLink>
                                    <HoveredLink href="/seo">
                                        Search Engine Optimization
                                    </HoveredLink>
                                    <HoveredLink href="/branding">
                                        Branding
                                    </HoveredLink>
                                </div>
                            </MenuItem>
                            <MenuItem
                                setActive={setActive}
                                active={active}
                                item="BLOG"
                            >
                                <div className="  text-sm grid grid-cols-2 gap-10 p-4">
                                    <HoveredLink href="/product1">
                                        Product 1
                                    </HoveredLink>
                                </div>
                            </MenuItem>
                            <MenuItem
                                setActive={setActive}
                                active={active}
                                item="FEATURED"
                            >
                                <div className="  text-sm grid grid-cols-2 gap-10 p-4">
                                    <HoveredLink href="/product1">
                                        Product 1
                                    </HoveredLink>
                                </div>
                            </MenuItem>
                            <MenuItem
                                setActive={setActive}
                                active={active}
                                item="PAGES"
                            >
                                <div className="flex flex-col space-y-4 text-sm">
                                    <HoveredLink href="/about">
                                        About Us
                                    </HoveredLink>
                                    <HoveredLink href="/contact">
                                        Contact Us
                                    </HoveredLink>
                                    <HoveredLink href="/team">
                                        Our Team
                                    </HoveredLink>
                                </div>
                            </MenuItem>
                        </Menu>
                    </div>
                    {/* Menu end part */}
                    <div className="hidden md:flex items-center gap-x-4">
                        <Button
                            variant={"ghost"}
                            className="px-1 hover:bg-transparent hover:text-white"
                        >
                            <Search className="w-6" />
                        </Button>
                        <Link href={"/login"}>
                            <User className="w-5" />
                        </Link>
                        <Link href={"/wishlist"}>
                            <Heart className="w-5" />
                        </Link>
                        <Link href={"/cart"} className="relative">
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
                    <div className="md:hidden flex justify-between items-center gap-x-4 w-full">
                        <div className="flex items-center gap-x-1">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <AlignJustify />
                                </SheetTrigger>
                                <SheetContent
                                    side="left"
                                    className="bg-primary-gray text-white pt-12"
                                >
                                    <div className="text-sm font-medium border-b py-4">
                                        <SheetClose asChild>
                                            <Link href={"/"}>Home</Link>
                                        </SheetClose>
                                    </div>
                                    <Accordion
                                        type="single"
                                        collapsible
                                        className="w-full"
                                    >
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger className="hover:no-underline">
                                                Menu
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                Menu Items
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-2">
                                            <AccordionTrigger className="hover:no-underline">
                                                Blog
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                Blog items
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-3">
                                            <AccordionTrigger className="hover:no-underline">
                                                Featured
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                Featured items
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-4">
                                            <AccordionTrigger className="hover:no-underline">
                                                Pages
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="flex flex-col pl-4 space-y-4 text-sm">
                                                    <SheetClose asChild>
                                                        <Link href="/about">
                                                            About Us
                                                        </Link>
                                                    </SheetClose>
                                                    <SheetClose asChild>
                                                        <Link href="/contact">
                                                            Contact Us
                                                        </Link>
                                                    </SheetClose>
                                                    <SheetClose asChild>
                                                        <Link href="/team">
                                                            Our Team
                                                        </Link>
                                                    </SheetClose>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </SheetContent>
                            </Sheet>
                            <Button
                                variant={"outline"}
                                size={"icon"}
                                className="px-1 border-none bg-transparent hover:bg-transparent hover:text-white"
                            >
                                <Search className="w-8" />
                            </Button>
                        </div>
                        <div>
                            <Logo />
                        </div>
                        <div className="flex items-center gap-x-1">
                            <Link href={"/login"}>
                                <User className="w-5" />
                            </Link>
                            <Link href={"/cart"} className="relative">
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

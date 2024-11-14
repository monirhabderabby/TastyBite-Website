import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { UserButton } from "@clerk/nextjs";
import { AlignJustify, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import Logo from "../logo/Logo";

const MobileNavbar = ({
    scrolling,
    isSignedIn,
}: {
    scrolling: boolean;
    isSignedIn: boolean | undefined;
}) => {
    return (
        <div className="lg:hidden flex justify-between items-center gap-x-4 w-full">
            <div className="flex items-center gap-x-1">
                <Sheet>
                    <SheetTrigger asChild>
                        <AlignJustify />
                    </SheetTrigger>
                    <SheetContent
                        side="left"
                        className="bg-primary-black/90 text-white pt-12"
                    >
                        <div className="text-sm font-medium border-b py-4">
                            <SheetClose asChild>
                                <Link href={"/"}>Home</Link>
                            </SheetClose>
                        </div>
                        <div className="text-sm font-medium border-b py-4">
                            <SheetClose asChild>
                                <Link href={"/foods"}>Find foods</Link>
                            </SheetClose>
                        </div>
                        <div className="text-sm font-medium border-b py-4">
                            <SheetClose asChild>
                                <Link href={"/blog"}>Blog</Link>
                            </SheetClose>
                        </div>
                        <div className="text-sm font-medium border-b py-4">
                            <SheetClose asChild>
                                <Link href={"/about"}>About</Link>
                            </SheetClose>
                        </div>
                        <div className="text-sm font-medium border-b py-4">
                            <SheetClose asChild>
                                <Link href={"/contact"}>Contact</Link>
                            </SheetClose>
                        </div>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-4">
                                <AccordionTrigger className="hover:no-underline">
                                    Pages
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-col pl-4 space-y-4 text-sm">
                                        <SheetClose asChild>
                                            <Link href="/chefs">
                                                Expert Chefs
                                            </Link>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <Link href="/reservation">
                                                Reservation
                                            </Link>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <Link href="/faqs">Faq&apos;s</Link>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <Link href="/testimonial">
                                                Testimonial
                                            </Link>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <Link href="/gallery">Gallery</Link>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <Link href="/team">Our Team</Link>
                                        </SheetClose>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <div className="text-sm font-medium border-b py-4">
                            <SheetClose asChild>
                                <Link
                                    href={"/notification"}
                                    className="relative"
                                >
                                    <span>Notification</span>
                                    <span
                                        className={`absolute -top-2 -right-5 bg-[#91b842] text-white 
                                         w-5 h-5 flex items-center justify-center rounded-full`}
                                    >
                                        13
                                    </span>
                                </Link>
                            </SheetClose>
                        </div>
                        <div className="text-sm font-medium border-b py-4">
                            <SheetClose asChild>
                                <Link href={"/profile"}>Profile</Link>
                            </SheetClose>
                        </div>
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
                {isSignedIn ? (
                    <UserButton />
                ) : (
                    <Link href="/sign-in">
                        <User className="w-5" />
                    </Link>
                )}
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
        </div>
    );
};

export default MobileNavbar;

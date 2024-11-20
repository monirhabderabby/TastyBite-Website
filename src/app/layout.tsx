// Packages
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

// Fonts
import { PT_Sans_Narrow, Pacifico } from "next/font/google";

// Local imports
import Footer from "@/components/common/footer/footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
const Navbar = dynamic(() => import("../components/common/navbar/navbar"));

// CSS
import AppProvider from "@/provider/app-provider";
import NProgress from "@/provider/NProgress";
import dynamic from "next/dynamic";
import { Toaster } from "sonner";
import "./globals.css";

//eslint-disable-next-line @typescript-eslint/no-unused-vars
const narrow = PT_Sans_Narrow({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-narrow",
});
//eslint-disable-next-line @typescript-eslint/no-unused-vars
const pacifico = Pacifico({
    weight: ["400"],
    subsets: ["latin"],
    variable: "--font-pacifico",
});

export const metadata: Metadata = {
    title: "TastyBite - Your Ultimate Food Ordering Destination",
    description:
        "TastyBite is a comprehensive food delivery platform offering a wide variety of cuisines, from pizzas to gourmet meals. Explore diverse menus, customize your orders, and enjoy fast, reliable delivery. Experience top-notch service, exclusive deals, and a seamless user interface powered by modern web technologies.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AppProvider>
            <ClerkProvider>
                <html className="scrollbar-thin">
                    <body
                        className={cn(
                            narrow.className,
                            "antialiased text-white "
                        )}
                    >
                        <TooltipProvider>
                            <Navbar />
                            <div
                                className="min-h-screen"
                                vaul-drawer-wrapper=""
                            >
                                {children}
                            </div>

                            <Footer />
                            <Toaster richColors />
                            <NProgress />
                        </TooltipProvider>
                    </body>
                </html>
            </ClerkProvider>
        </AppProvider>
    );
}

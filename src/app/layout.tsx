// Packages
import { ClerkProvider } from "@clerk/nextjs";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";

// Fonts
import { PT_Sans_Narrow, Pacifico } from "next/font/google";

// Local imports
import { cn } from "@/lib/utils";

// CSS
import { Toaster } from "@/components/ui/sonner";
import AppProvider from "@/provider/app-provider";
import { CrispProvider } from "@/provider/crisp-provider";
import LoaderProvider from "@/provider/loader-provider";
import NProgress from "@/provider/NProgress";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <ClerkProvider>
        <html className="scrollbar-thin">
          <CrispProvider />
          <GoogleAnalytics gaId="G-1CQPVHENQ9" />
          <body className={cn(narrow.className, "antialiased text-white ")}>
            <LoaderProvider>
              {children}
              <Toaster richColors />
              <NProgress />
            </LoaderProvider>
          </body>
        </html>
      </ClerkProvider>
    </AppProvider>
  );
}

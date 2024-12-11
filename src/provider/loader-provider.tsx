"use client";

import Footer from "@/components/common/footer/footer";
import Navbar from "@/components/common/navbar/navbar";
import BrandLoader from "@/components/ui/brand-loader";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useUser } from "@clerk/nextjs";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const LoaderProvider = ({ children }: Props) => {
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return <BrandLoader message="Verifying your access, please wait..." />;
  }
  return (
    <div>
      <TooltipProvider>
        <Navbar userId={user?.id} />
        <div className="min-h-screen" vaul-drawer-wrapper="">
          {children}
        </div>

        <Footer />
      </TooltipProvider>
    </div>
  );
};

export default LoaderProvider;

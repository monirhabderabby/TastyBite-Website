"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface Props {
  message: string;
}

const BrandLoader = ({ message }: Props) => {
  const pathName = usePathname();
  const home = pathName === "/";

  return (
    <div
      className={cn(
        "min-h-screen w-full flex flex-col justify-start pt-[180px] md:pt-[200px] lg:pt-[230px] items-center  gap-y-3 z-50",
        home ? "bg-primary-black" : ""
      )}
      style={{ backgroundImage: `url(/images/banner-bg.webp)` }}
    >
      <div
        className={cn(
          "font-courgette  font-semibold text-[40px]",
          home ? "text-white" : "text-primary-black"
        )}
      >
        <span className="text-primary-orange">Tasty</span>Bite
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="loader" />
        <div className={cn("mt-2", home ? "text-white" : "text-primary-black")}>
          {message}
        </div>
      </div>
    </div>
  );
};

export default BrandLoader;

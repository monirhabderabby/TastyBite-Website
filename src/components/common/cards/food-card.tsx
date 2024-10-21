"use client";

// Packages
import { motion } from "framer-motion";
import { Heart, Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// Local Imports
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const item = {
  id: 1,
  name: "Italian pizza",
  price: 120,
  images: [
    "https://utfs.io/f/a8K5FEXfuFBqbRHH1w4ids8XaR91cMlOnwYqjgmoTSGQzADK",
    "https://utfs.io/f/a8K5FEXfuFBqJgDn8E5DlPWyYnUmi9L4t5NskqCQKzMfpovF",
  ],
};

interface FoodCartProps {
  theme?: "black" | "light";
}

const FoodCart = ({ theme }: FoodCartProps) => {
  const handleWishlist = () => {
    // do your stuff when clicking on the wishlist button
  };

  const handleQuickView = () => {
    // Do your stuff when clicking on the quick view button
  };

  const handleCart = () => {
    // Do your stuff when clicking on the cart button
  };
  return (
    <div className="flex flex-col justify-center items-center gap-y-3 cursor-pointer group overflow-hidden w-[240px] h-auto mx-auto">
      <div className="relative ">
        <ImageOverlap img1={item.images[0]} img2={item.images[1]} />
        <QuickActions
          onWishlist={handleWishlist}
          onQuickView={handleQuickView}
          onCartClick={handleCart}
        />
      </div>

      <div>
        <h3
          className={cn(
            " hover:text-primary-orange cursor-pointer transition-colors duration-300 text-[22px] font-medium font-narrow",
            theme === "black" ? "text-white" : "text-gray-500"
          )}
        >
          {item.name}
        </h3>
        <p className="text-primary-orange text-[18px] text-center pt-1">
          ${item.price}
        </p>
      </div>
    </div>
  );
};

export default FoodCart;

interface QuickActionsProps {
  onWishlist: () => void;
  onQuickView: () => void;
  onCartClick: () => void;
}

// Quick Actions Components
const QuickActions = ({
  onWishlist,
  onQuickView,
  onCartClick,
}: QuickActionsProps) => {
  const style = {
    icon: "h-5 w-5",
    button:
      "w-[40px] h-[40px] bg-white hover:bg-primary-orange text-gray-500 hover:text-white flex justify-center items-center mt-[10px]",
  };
  return (
    <div className="absolute right-0 top-0 group-hover:translate-x-0 translate-x-10 transition-all duration-300">
      <Tooltip>
        <TooltipTrigger className={style.button} onClick={onWishlist}>
          <Heart className={style.icon} />
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-white text-gray-500">
          Wishlist
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger className={style.button} onClick={onQuickView}>
          <Search className={style.icon} />
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-white text-gray-500">
          Quick View
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger className={style.button} onClick={onCartClick}>
          <ShoppingCart className={style.icon} />
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-white text-gray-500">
          Add To Cart
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

interface ImageOverlapProps {
  img1: string;
  img2: string;
  className?: string;
}

// Image Overlay Components
const ImageOverlap = ({ img1, img2, className }: ImageOverlapProps) => {
  const [hovered, setHovered] = useState<boolean>(false);
  return (
    <div
      className={cn("w-[240px] h-[240px] relative overflow-hidden ", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Outgoing Image (Initial Image) */}
      <motion.div
        className="absolute inset-0 h-full w-full"
        initial={{ opacity: 1 }}
        animate={{
          opacity: hovered ? 0 : 1,
        }}
        transition={{
          duration: 0.7,
          ease: "easeInOut",
        }}
      >
        <Image src={img1} fill alt="food" />
      </motion.div>

      {/* Incoming Image (Hovered Image) */}
      <motion.div
        className="absolute inset-0 h-full w-full"
        initial={{ opacity: 0 }}
        animate={{
          opacity: hovered ? 1 : 0,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        <Image src={img2} fill alt="food" />
      </motion.div>
    </div>
  );
};

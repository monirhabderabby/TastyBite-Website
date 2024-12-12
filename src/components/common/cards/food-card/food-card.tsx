"use client";

// Packages
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

// Local Imports
import { cn } from "@/lib/utils";
import { isFoodInCart } from "@/redux/features/cart/cartSelector";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { addToWishlist } from "@/redux/features/wishlist/wishlistSlice";
import { RootState } from "@/redux/store";
import { TFood } from "@/types";
import QuickActions from "./quick-action";

interface FoodCartProps {
  theme?: "black" | "light";
  food: TFood;
}

const FoodCart = ({ theme, food }: FoodCartProps) => {
  const { isSignedIn } = useUser();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);

  // Check if the food is already in the wishlist
  const isWishListed = wishlist.includes(food._id);
  const isInCart = useSelector(isFoodInCart(food._id));

  const handleWishlist = () => {
    if (!isWishListed) {
      dispatch(addToWishlist(food._id));
    }
  };

  const handleQuickView = () => {
    // Do your stuff when clicking on the quick view button
  };

  const handleCart = () => {
    if (!isSignedIn) {
      toast.error("Please login first to add food in cart.");
    } else {
      dispatch(
        addToCart({
          ...food,
          quantity: 1, // default quantity to add
        })
      );
      toast.success("Food successfully added in cart.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-3 cursor-pointer group overflow-hidden w-[160px] md:w-[240px] h-auto mx-auto">
      <div className="relative ">
        <ImageOverlap
          img1={food?.images[0]}
          img2={food?.images[1] ? food?.images[1] : food?.images[0]}
        />
        <QuickActions
          onWishlist={handleWishlist}
          onQuickView={handleQuickView}
          onCartClick={handleCart}
          food={food}
          isWishListed={isWishListed}
          isInCart={isInCart}
          pathname={pathname}
        />
      </div>

      <div>
        <Link
          href={`/foods/${food._id}`}
          className={cn(
            " hover:text-primary-orange cursor-pointer transition-colors duration-300 text-[22px] font-medium font-narrow capitalize",
            theme === "light" ? "text-gray-700" : "text-white"
          )}
        >
          {food.name}
        </Link>
        <p className="text-primary-orange text-[18px] text-center pt-1">
          ${food.price}
        </p>
      </div>
    </div>
  );
};

export default FoodCart;

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
      className={cn(
        "w-[150px] md:w-[240px] h-[150px] md:h-[240px] relative overflow-hidden ",
        className
      )}
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
        <Image src={img1} fill alt="food" priority />
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
        <Image src={img2} fill alt="food" priority />
      </motion.div>
    </div>
  );
};

"use client";
// Local imports
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Heart, Search, ShoppingCart } from "lucide-react";
import { useState } from "react";
import QuickViewModal from "./quick-view-modal";

interface QuickActionsProps {
  onWishlist: () => void;
  onQuickView: () => void;
  onCartClick: () => void;
}

const QuickActions = ({
  onWishlist,
  onQuickView,
  onCartClick,
}: QuickActionsProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const style = {
    icon: "h-4 md:h-5 w-4 md:w-5",
    button:
      "w-[30px] md:w-[40px] h-[30px] md:h-[40px] bg-white hover:bg-primary-orange text-gray-500 hover:text-white flex justify-center items-center mt-[10px]",
  };

  const handleSearch = () => {
    setOpen(!open);
    onQuickView();
  };
  return (
    <>
      <div className="absolute right-0 md:right-0 lg:right-0 top-0 group-hover:translate-x-0 translate-x-10 transition-all duration-300">
        <Tooltip>
          <TooltipTrigger className={style.button} onClick={onWishlist}>
            <Heart className={style.icon} />
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-white text-gray-500">
            Wishlist
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger className={style.button} onClick={handleSearch}>
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
      <QuickViewModal open={open} setOpen={setOpen} />
    </>
  );
};

export default QuickActions;

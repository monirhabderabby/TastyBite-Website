"use client";
// Local imports
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { removeFromWishlist } from "@/redux/features/wishlist/wishlistSlice";
import { TFood } from "@/types";
import { Heart, ShoppingCart, X, ZoomIn } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import QuickViewModal from "./quick-view-modal";

interface QuickActionsProps {
    onWishlist: () => void;
    onQuickView: () => void;
    onCartClick: () => void;
    food: TFood;
    isWishListed: boolean;
    isInCart: boolean;
    pathname: string;
}

const QuickActions = ({
    onWishlist,
    onQuickView,
    onCartClick,
    food,
    isWishListed,
    isInCart,
    pathname,
}: QuickActionsProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const style = {
        icon: "h-4 md:h-5 w-4 md:w-5",
        button: "w-[30px] md:w-[40px] h-[30px] md:h-[40px] bg-white hover:bg-primary-orange text-gray-500 hover:text-white flex justify-center items-center mt-[10px]",
        buttonTriggered:
            "w-[30px] md:w-[40px] h-[30px] md:h-[40px] bg-primary-orange text-white flex justify-center items-center mt-[10px]",
    };
    const buttonClass = (wishListed: boolean) =>
        wishListed ? style.buttonTriggered : style.button;

    const dispatch = useDispatch();

    const handleQuickView = (): void => {
        setOpen(!open);
        onQuickView();
    };
    const handleRemoveFromWishlist = (id: string): void => {
        if (isWishListed) {
            dispatch(removeFromWishlist(id));
        }
    };

    const renderWishlistButton = () => {
        if (pathname === "/wishlist") {
            return (
                <Tooltip>
                    <TooltipTrigger
                        className={style.buttonTriggered}
                        onClick={() => handleRemoveFromWishlist(food._id)}
                    >
                        <X className={style.icon} />
                    </TooltipTrigger>
                    <TooltipContent
                        side="left"
                        className="bg-white text-gray-500"
                    >
                        Remove from Wishlist
                    </TooltipContent>
                </Tooltip>
            );
        } else {
            return (
                <Tooltip>
                    <TooltipTrigger
                        className={`${buttonClass(isWishListed)} ${
                            isWishListed && "cursor-not-allowed"
                        }`}
                        onClick={onWishlist}
                        disabled={isWishListed}
                    >
                        <Heart className={style.icon} />
                    </TooltipTrigger>
                    <TooltipContent
                        side="left"
                        className="bg-white text-gray-500"
                    >
                        {isWishListed ? "In Wishlist" : "Wishlist"}
                    </TooltipContent>
                </Tooltip>
            );
        }
    };

    return (
        <>
            <div className="absolute right-0 md:right-0 lg:right-0 top-0 group-hover:translate-x-0 lg:translate-x-10 transition-all duration-300">
                {/* Wishlist button */}
                {renderWishlistButton()}

                {/* Quick view */}
                <Tooltip>
                    <TooltipTrigger
                        className={style.button}
                        onClick={handleQuickView}
                    >
                        <ZoomIn className={style.icon} />
                    </TooltipTrigger>
                    <TooltipContent
                        side="left"
                        className="bg-white text-gray-500"
                    >
                        Quick View
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger
                        className={`${
                            isInCart ? style.buttonTriggered : style.button
                        } ${isInCart && "cursor-not-allowed"}`}
                        onClick={onCartClick}
                        disabled={isInCart}
                    >
                        <ShoppingCart className={style.icon} />
                    </TooltipTrigger>
                    <TooltipContent
                        side="left"
                        className="bg-white text-gray-500"
                    >
                        {isInCart ? "Already In Cart" : "Add To Cart"}
                    </TooltipContent>
                </Tooltip>
            </div>
            <QuickViewModal open={open} setOpen={setOpen} food={food} />
        </>
    );
};

export default QuickActions;

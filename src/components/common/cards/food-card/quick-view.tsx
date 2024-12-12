// Packages
import { Heart } from "lucide-react";

// Local imports
import { Button } from "@/components/ui/button";
import { isFoodInCart } from "@/redux/features/cart/cartSelector";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { addToWishlist } from "@/redux/features/wishlist/wishlistSlice";
import { RootState } from "@/redux/store";
import { TFood } from "@/types";
import { useUser } from "@clerk/nextjs";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const QuickViewAction = ({
    food,
    quantity,
}: {
    food: TFood;
    quantity: number;
}) => {
    const { isSignedIn } = useUser();
    const dispatch = useDispatch();
    const wishlist = useSelector((state: RootState) => state.wishlist.items);

    // Check if the food is already in the wishlist
    const isWishListed = wishlist.includes(food._id);
    const isInCart = useSelector(isFoodInCart(food._id));

    const handleCart = () => {
        if (!isSignedIn) {
            toast.error("Please login first to add food in cart.");
        } else {
            dispatch(
                addToCart({
                    ...food,
                    quantity: quantity | 1, // default quantity to add
                })
            );
            toast.success("Food successfully added in cart.");
        }
    };

    const handleWishlist = () => {
        if (!isWishListed) {
            dispatch(addToWishlist(food._id));
            toast.success("Food successfully added in wishlist.");
        }
    };
    return (
        <div className="flex items-center gap-x-2">
            <Button
                className={`uppercase rounded-[40px] h-[40px] flex-1 ${
                    isInCart && "cursor-not-allowed text-muted"
                }`}
                onClick={handleCart}
                disabled={isInCart}
            >
                {isInCart ? "Already In Cart" : "Add To Cart"}
            </Button>
            <Button
                variant="outline"
                size="icon"
                className={`rounded-full h-[40px] w-[40px] ${
                    isWishListed && "cursor-not-allowed text-muted"
                }`}
                title={isWishListed ? "Already in wishlist" : "Add to wishlist"}
                onClick={handleWishlist}
                disabled={isWishListed}
            >
                {isWishListed ? (
                    <FaHeart className="text-gray-500 h-5 w-5" />
                ) : (
                    <Heart className="text-gray-500 h-5 w-5" />
                )}
            </Button>
        </div>
    );
};

export default QuickViewAction;

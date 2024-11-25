import {
    removeFromCart,
    updateQuantity,
} from "@/redux/features/cart/cartSlice";
import { TFoodWithQuantity } from "@/types";
import { X } from "lucide-react";
import Image from "next/image";
import { useDispatch } from "react-redux";

export default function CartTable({
    cartItems,
}: {
    cartItems: TFoodWithQuantity[];
}) {
    const dispatch = useDispatch();

    const updateCartQuantity = (id: string, quantity: number) => {
        if (quantity > 0) {
            dispatch(updateQuantity({ id, quantity }));
        } else {
            removeItem(id);
        }
    };

    const removeItem = (id: string) => {
        dispatch(removeFromCart(id));
    };

    return (
        <div className="w-full border">
            {/* Header */}
            <div className="grid grid-cols-[2fr_1fr] md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-4 py-2 border-b text-sm font-medium">
                <div>
                    <p>PRODUCT</p>
                </div>
                <div className="hidden md:block text-right">
                    <p>PRICE</p>
                </div>
                <div className="hidden md:block text-center">
                    <p>QUANTITY</p>
                </div>
                <div className="hidden md:block text-right">
                    <p>TOTAL</p>
                </div>
                <div className="w-8"></div>
            </div>

            {/* Cart Items */}
            <div className="divide-y">
                {cartItems.length > 0 &&
                    cartItems.map((item) => (
                        <div
                            key={item._id}
                            className="grid grid-cols-[2fr_1fr] md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 p-4 items-center"
                        >
                            <div className="flex gap-4 items-center">
                                <Image
                                    src={item.images[0]}
                                    alt={item.name}
                                    width={80}
                                    height={80}
                                    className="rounded-md"
                                />
                                <div>
                                    <h3 className="font-medium">{item.name}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {item.menuId.name}
                                    </p>
                                    <div className="md:hidden">
                                        <span className="font-medium mr-2">
                                            Price:{" "}
                                        </span>
                                        ${item.price.toFixed(2)}
                                    </div>
                                    <div className="md:hidden mt-1">
                                        <ItemQuantityInput
                                            item={item}
                                            updateCartQuantity={
                                                updateCartQuantity
                                            }
                                        />
                                    </div>
                                    <div className="md:hidden mt-1">
                                        <span className="font-medium mr-2">
                                            Total:{" "}
                                        </span>
                                        $
                                        {(item.price * item.quantity).toFixed(
                                            2
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="hidden md:block text-right">
                                <span className="md:hidden font-medium mr-2">
                                    Price:{" "}
                                </span>
                                ${item.price.toFixed(2)}
                            </div>
                            <div className="hidden md:block ">
                                <ItemQuantityInput
                                    item={item}
                                    updateCartQuantity={updateCartQuantity}
                                />
                            </div>

                            <div className="hidden md:block text-right">
                                <span className="md:hidden font-medium mr-2">
                                    Total:{" "}
                                </span>
                                ${(item.price * item.quantity).toFixed(2)}
                            </div>

                            <button
                                onClick={() => removeItem(item._id)}
                                className="p-2 hover:text-red-500 transition-colors ml-auto"
                                aria-label="Remove item"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
}

const ItemQuantityInput = ({
    item,
    updateCartQuantity,
}: {
    item: TFoodWithQuantity;
    updateCartQuantity: (id: string, quantity: number) => void;
}) => {
    return (
        <div className="flex items-center justify-center">
            <div className="inline-flex items-center rounded-md border">
                <button
                    onClick={() =>
                        updateCartQuantity(
                            item._id,
                            Math.max(1, item.quantity - 1)
                        )
                    }
                    className="px-3 py-1 border-r hover:bg-gray-50 transition-colors"
                >
                    -
                </button>
                <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                        updateCartQuantity(
                            item._id,
                            parseInt(e.target.value) || 1
                        )
                    }
                    className="w-12 text-center focus:outline-none"
                    min="1"
                />
                <button
                    onClick={() =>
                        updateCartQuantity(item._id, item.quantity + 1)
                    }
                    className="px-3 py-1 border-l hover:bg-gray-50 transition-colors"
                >
                    +
                </button>
            </div>
        </div>
    );
};

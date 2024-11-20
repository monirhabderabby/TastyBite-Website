"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    selectCartItems,
    selectCartTotalQuantity,
} from "@/redux/features/cart/cartSelector";
import {
    removeFromCart,
    updateQuantity,
} from "@/redux/features/cart/cartSlice";
import { useGetFoodByIdsMutation } from "@/redux/features/food/foodApi";
import { TFoodWithQuantity } from "@/types";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollArea } from "../ui/scroll-area";
import { SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";

function QuantityInput({
    value,
    onDecrease,
    onIncrease,
    onChange,
}: {
    value: number;
    onDecrease: () => void;
    onIncrease: () => void;
    onChange: (value: number) => void;
}) {
    return (
        <div className="flex">
            <div className="flex items-center border rounded-md">
                <button
                    onClick={onDecrease}
                    className="px-3 py-1 border-r hover:bg-gray-100"
                >
                    -
                </button>
                <input
                    type="number"
                    value={value}
                    onChange={(e) => onChange(parseInt(e.target.value) || 1)}
                    className="w-12 text-center focus:outline-none"
                    min="1"
                />
                <button
                    onClick={onIncrease}
                    className="px-3 py-1 border-l hover:bg-gray-100"
                >
                    +
                </button>
            </div>
        </div>
    );
}

function CartItem({
    item,
    onUpdateQuantity,
    onRemove,
}: {
    item: TFoodWithQuantity;
    onUpdateQuantity: (id: string, quantity: number) => void;
    onRemove: (id: string) => void;
}) {
    return (
        <div className="flex items-start gap-4 py-4 border-b">
            <Image
                src={item.images[0]}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-md"
            />
            <div className="flex-1">
                <div className="flex justify-between">
                    <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                            {item.menuId.name}
                        </p>
                        <p className="mt-1">${item.price.toFixed(2)}</p>
                    </div>
                    <button
                        onClick={() => onRemove(item._id)}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
                <div className="mt-2">
                    <QuantityInput
                        value={item.quantity}
                        onDecrease={() =>
                            onUpdateQuantity(
                                item._id,
                                Math.max(1, item.quantity - 1)
                            )
                        }
                        onIncrease={() =>
                            onUpdateQuantity(item._id, item.quantity + 1)
                        }
                        onChange={(value) => onUpdateQuantity(item._id, value)}
                    />
                </div>
            </div>
        </div>
    );
}

function CartSummary({
    cartFoodItems,
    onCheckout,
}: {
    cartFoodItems: TFoodWithQuantity[];
    onCheckout: (totalPrice: number) => void;
}) {
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const subtotal = cartFoodItems.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    return (
        <div className="space-y-4 p-5">
            <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span>${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-sm text-muted-foreground">
                Tax included and shipping calculated at checkout
            </p>
            <div className="flex items-center space-x-2">
                <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked: boolean) =>
                        setAgreedToTerms(checked as boolean)
                    }
                />
                <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    I agree with the Terms & conditions
                </label>
            </div>
            <div className="flex flex-col gap-1">
                <Button
                    className="w-full bg-orange-400 hover:bg-orange-500"
                    disabled={!agreedToTerms}
                    onClick={() => onCheckout(subtotal)}
                >
                    CHECKOUT
                </Button>
                <Link href={"/cart"} className="mt-2">
                    <Button variant="outline" className="w-full">
                        VIEW CART
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default function CartSheet() {
    const cartItems = useSelector(selectCartItems);
    const cartItemsNumber = useSelector(selectCartTotalQuantity);
    const dispatch = useDispatch();

    const [getFoodByIds, { data: cartFoodData, isLoading }] =
        useGetFoodByIdsMutation();

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

    const handleCheckout = (totalPrice: number) => {
        // Implement checkout functionality
        console.log("Proceeding to checkout to pay $", totalPrice);
    };

    useEffect(() => {
        if (cartItems.length > 0) {
            getFoodByIds(cartItems);
        }
    }, [cartItems, getFoodByIds]);

    if (isLoading) {
        return (
            <p className="text-primary-black text-center mt-72 text-2xl animate-pulse">
                Cart Loading...
            </p>
        );
    }

    return (
        <div className="text-primary-black">
            <div className="mt-4">
                <div className="">
                    <div className="">
                        <SheetHeader>
                            <div className="flex justify-between items-center p-5">
                                <SheetTitle className="text-primary-black text-2xl font-semibold">
                                    Shopping Cart
                                </SheetTitle>
                                <SheetDescription>
                                    <span className="text-muted-foreground">
                                        {cartItemsNumber}{" "}
                                        {cartItemsNumber === 1
                                            ? "item"
                                            : "items"}
                                    </span>
                                </SheetDescription>
                            </div>
                        </SheetHeader>
                        <div className="">
                            <ScrollArea className="h-[60vh] px-5">
                                <div className="space-y-4">
                                    {cartFoodData?.data?.length > 0 ? (
                                        cartFoodData?.data?.map(
                                            (item: TFoodWithQuantity) => (
                                                <CartItem
                                                    key={item._id}
                                                    item={item}
                                                    onUpdateQuantity={
                                                        updateCartQuantity
                                                    }
                                                    onRemove={removeItem}
                                                />
                                            )
                                        )
                                    ) : (
                                        <p className="text-center text-muted-foreground my-20">
                                            Your cart is empty.
                                        </p>
                                    )}
                                </div>
                            </ScrollArea>
                            {cartFoodData?.data?.length > 0 && (
                                <div className="mt-4 shadow-inner">
                                    <CartSummary
                                        cartFoodItems={cartFoodData?.data}
                                        onCheckout={handleCheckout}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

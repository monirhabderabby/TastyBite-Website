"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    selectCartItems,
    selectCartTotalPrice,
} from "@/redux/features/cart/cartSelector";
import {
    CartItemProps,
    removeFromCart,
    updateQuantity,
} from "@/redux/features/cart/cartSlice";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
    );
}

function CartItem({
    item,
    onUpdateQuantity,
    onRemove,
}: {
    item: CartItemProps;
    onUpdateQuantity: (id: string, quantity: number) => void;
    onRemove: (id: string) => void;
}) {
    return (
        <div className="flex items-start gap-4 py-4 border-b">
            <Image
                src={item.image}
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
                            {item.menu}
                        </p>
                        <p className="mt-1">${item.price.toFixed(2)}</p>
                    </div>
                    <button
                        onClick={() => onRemove(item.id)}
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
                                item.id,
                                Math.max(1, item.quantity - 1)
                            )
                        }
                        onIncrease={() =>
                            onUpdateQuantity(item.id, item.quantity + 1)
                        }
                        onChange={(value) => onUpdateQuantity(item.id, value)}
                    />
                </div>
            </div>
        </div>
    );
}

function CartSummary({
    subtotal,
    onCheckout,
}: {
    subtotal: number;
    onCheckout: (totalPrice: number) => void;
}) {
    const [agreedToTerms, setAgreedToTerms] = useState(false);

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
    const subtotal = useSelector(selectCartTotalPrice);
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

    const handleCheckout = (totalPrice: number) => {
        // Implement checkout functionality
        console.log("Proceeding to checkout to pay $", totalPrice);
    };

    return (
        <div className="text-primary-black">
            <div className="mt-4">
                <div className="">
                    <div className="">
                        <SheetHeader>
                            <div className="flex justify-between items-center p-5">
                                <SheetTitle>
                                    <h1 className="text-primary-black text-2xl font-semibold">
                                        Shopping Cart
                                    </h1>
                                </SheetTitle>
                                <SheetDescription>
                                    <span className="text-muted-foreground">
                                        {cartItems.length}{" "}
                                        {cartItems.length === 1
                                            ? "item"
                                            : "items"}
                                    </span>
                                </SheetDescription>
                            </div>
                        </SheetHeader>
                        <div className="">
                            <ScrollArea className="h-[60vh] px-5">
                                <div className="space-y-4">
                                    {cartItems.length > 0 ? (
                                        cartItems.map((item) => (
                                            <CartItem
                                                key={item.id}
                                                item={item}
                                                onUpdateQuantity={
                                                    updateCartQuantity
                                                }
                                                onRemove={removeItem}
                                            />
                                        ))
                                    ) : (
                                        <p className="text-center text-muted-foreground my-20">
                                            Your cart is empty.
                                        </p>
                                    )}
                                </div>
                            </ScrollArea>
                            {cartItems.length > 0 && (
                                <div className="mt-4 shadow-inner">
                                    <CartSummary
                                        subtotal={subtotal}
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

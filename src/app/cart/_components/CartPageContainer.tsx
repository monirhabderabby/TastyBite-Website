"use client";

import { selectCartItems } from "@/redux/features/cart/cartSelector";
import Link from "next/link";
import { useSelector } from "react-redux";
import CartSummary from "./cart-summary";
import CartTable from "./cart-table";

const CartPageContainer = () => {
    const cartItems = useSelector(selectCartItems);

    let content;
    if (cartItems.length === 0) {
        content = (
            <div className="my-20">
                <p className="text-3xl font-bold text-center text-muted-foreground">
                    Your cart is empty.
                </p>
                <div className="flex justify-center mt-5">
                    <Link
                        href="/foods"
                        className="text-center text-white hover:text-primary-black border border-gray-300 bg-primary-orange hover:bg-gray-50 py-3 px-6 rounded-lg transition-colors"
                    >
                        CONTINUE BUYING
                    </Link>
                </div>
            </div>
        );
    } else if (cartItems.length > 0) {
        content = (
            <div className="container mx-auto my-20 text-primary-black">
                <CartTable cartItems={cartItems} />
                <CartSummary cartItems={cartItems} />
            </div>
        );
    }

    return content;
};

export default CartPageContainer;

"use client";

import { TFoodWithQuantity } from "@/types";
import { Shield } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CartSummary({
    cartItems,
}: {
    cartItems: TFoodWithQuantity[];
}) {
    const [specialInstructions, setSpecialInstructions] = useState("");
    const [couponCode, setCouponCode] = useState("");
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const subtotal = cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!agreedToTerms) {
            alert("Please agree to the Terms & Conditions");
            return;
        }
        // Handle checkout logic here
        console.log("Proceeding to checkout...");
    };

    return (
        <div className="grid gap-8 md:grid-cols-[1fr_350px] mt-10">
            <div className="space-y-6">
                <div>
                    <h2 className="text-base font-medium mb-2">
                        Additional Comments
                    </h2>
                    <textarea
                        placeholder="Special instruction for seller..."
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        className="w-full min-h-[120px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                    />
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                    <Shield className="h-5 w-5" />
                    <span className="text-sm">Secure Shopping Guarantee</span>
                </div>

                <div className="space-y-2">
                    <h2 className="text-base font-medium">Coupon Code</h2>
                    <input
                        type="text"
                        placeholder="Enter Coupon Code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                    />
                    <p className="text-sm text-muted-foreground">
                        Coupon code will work on checkout page
                    </p>
                </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <h2 className="font-semibold text-lg border-b pb-4">
                    ORDER SUMMARY
                </h2>

                <div className="space-y-2">
                    <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-medium pt-2">
                        <span>Total:</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                </div>

                <p className="text-sm text-muted-foreground">
                    Tax included and shipping calculated at checkout
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                            className="rounded border-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                        />
                        <label htmlFor="terms" className="text-sm">
                            I agree with the{" "}
                            <Link
                                href="#"
                                className="text-gray-600 hover:underline"
                            >
                                Terms & Conditions
                            </Link>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={!agreedToTerms}
                        className="w-full bg-orange-400 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-4 rounded-md transition-colors"
                    >
                        PROCEED TO CHECKOUT
                    </button>

                    <Link
                        href="/foods"
                        className="block w-full text-center border border-gray-300 hover:bg-gray-50 py-3 px-4 rounded-md transition-colors"
                    >
                        CONTINUE BUYING
                    </Link>
                </form>
            </div>
        </div>
    );
}

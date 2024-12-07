"use client";

import { useCheckoutMutation } from "@/redux/features/payment/checkoutApi";
import { TFoodWithQuantity } from "@/types";
import { useUser } from "@clerk/nextjs";
import { Shield } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import LocationSelector from "./location-selector";

export default function CartSummary({
    cartItems,
}: {
    cartItems: TFoodWithQuantity[];
}) {
    const [deliveryLocation, setDeliveryLocation] = useState<
        string | undefined
    >("");
    const [couponCode, setCouponCode] = useState("");
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const { user } = useUser();
    const [createCheckoutSession, { isLoading: checkoutLoading }] =
        useCheckoutMutation();
    const subTotal = cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    const showError = (message: string) => toast.error(message);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return showError("You must be logged in to place an order");
        if (!agreedToTerms)
            return showError("Please agree to the Terms & Conditions");
        if (!deliveryLocation)
            return showError("Please, Provide your valid delivery location");
        // Handle checkout logic here

        if (checkoutLoading) {
            return;
        }

        const checkoutRes = await createCheckoutSession({
            clerkId: user?.id,
            cartFoods: cartItems?.map((item: TFoodWithQuantity) => ({
                _id: item._id,
                name: item.name,
                // images: item.images,
                quantity: item.quantity,
                price: item.price,
            })),
            deliveryLocation,
            totalPrice: subTotal,
        });
        window.location.href = checkoutRes.data?.url;
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-8 md:grid-cols-[1fr_350px] mt-10">
                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between">
                                <h2 className="text-base font-medium mb-2">
                                    Select Delivery Location
                                </h2>
                                <Link href={"/profile"} className="underline">
                                    Change Location
                                </Link>
                            </div>
                            <LocationSelector
                                deliveryLocation={deliveryLocation}
                                setDeliveryLocation={setDeliveryLocation}
                            />
                        </div>

                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Shield className="h-5 w-5" />
                            <span className="text-sm">
                                Secure Shopping Guarantee
                            </span>
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-base font-medium">
                                Coupon Code
                            </h2>
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
                        <h2 className="font-semibold text-lg border-b">
                            ORDER SUMMARY
                        </h2>

                        <div className="space-y-2">
                            <div className="flex justify-between py-2">
                                <span className="text-muted-foreground">
                                    Subtotal:
                                </span>
                                <span>${subTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-medium py-2">
                                <span>Total:</span>
                                <span>${subTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <p className="text-sm text-muted-foreground">
                            Tax included and shipping calculated at checkout
                        </p>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={agreedToTerms}
                                onChange={(e) =>
                                    setAgreedToTerms(e.target.checked)
                                }
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
                    </div>
                </div>
            </form>
        </div>
    );
}

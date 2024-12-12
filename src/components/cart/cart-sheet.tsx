"use client";
// Packages
import { useUser } from "@clerk/nextjs";
import { Loader2, Lock, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

// Local imports
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
import { useCheckoutMutation } from "@/redux/features/payment/checkoutApi";
import { useGetLocationByUserQuery } from "@/redux/features/user/userApi";
import { TAddress, TFoodWithQuantity } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
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
            <p className="text-sm text-muted-foreground">{item.menuId.name}</p>
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
              onUpdateQuantity(item._id, Math.max(1, item.quantity - 1))
            }
            onIncrease={() => onUpdateQuantity(item._id, item.quantity + 1)}
            onChange={(value) => onUpdateQuantity(item._id, value)}
          />
        </div>
      </div>
    </div>
  );
}

interface CartSummaryProps {
  subTotal: number;
  onCheckout: (e: React.FormEvent) => void;
  deliveryLocation: string;
  setDeliveryLocation: (location: string) => void;
  agreedToTerms: boolean;
  setAgreedToTerms: (agreed: boolean) => void;
  checkoutLoading?: true | false;
}

function CartSummary({
  subTotal,
  onCheckout,
  setDeliveryLocation,
  agreedToTerms,
  setAgreedToTerms,
  checkoutLoading,
  deliveryLocation,
}: CartSummaryProps) {
  const { user } = useUser();

  const { data, isLoading, isSuccess, isError } = useGetLocationByUserQuery(
    user?.id
  );
  return (
    <form onSubmit={onCheckout}>
      <div className="space-y-4 p-5">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${subTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>Total:</span>
          <span>${subTotal.toFixed(2)}</span>
        </div>
        <div>
          <Select onValueChange={(value) => setDeliveryLocation(value)}>
            <SelectTrigger className="w-full text-primary-black">
              <SelectValue placeholder="Select delivery location" />
            </SelectTrigger>
            <SelectContent>
              {!isLoading &&
                !isError &&
                isSuccess &&
                data?.data.map((address: TAddress) => (
                  <SelectItem key={address._id} value={address._id as string}>
                    {address.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
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
            className="w-full relative bg-orange-400 hover:bg-orange-500"
            disabled={!agreedToTerms || checkoutLoading || !deliveryLocation}
            type="submit"
          >
            CHECKOUT
            <span>
              {checkoutLoading ? (
                <Loader2 className="animate-spin h-4 w-4 absolute right-4 top-[10px]" />
              ) : (
                <Lock className="h-4 w-4 absolute right-4 top-[10px]" />
              )}
            </span>
          </Button>
          <Link href={"/cart"} className="mt-2">
            <Button variant="outline" className="w-full">
              VIEW CART
            </Button>
          </Link>
        </div>
      </div>
    </form>
  );
}

export default function CartSheet() {
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const { user } = useUser();

  const cartItems = useSelector(selectCartItems);
  const cartItemsNumber = useSelector(selectCartTotalQuantity);
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

  const subTotal = cartItems.reduce(
    (total: number, item: TFoodWithQuantity) => {
      return total + item.price * item.quantity;
    },
    0
  );
  const [createCheckoutSession, { isLoading: checkoutLoading }] =
    useCheckoutMutation();

  const showError = (message: string) => toast.error(message);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return showError("You must be logged in to place an order");
    if (!agreedToTerms)
      return showError("Please agree to the Terms & Conditions");
    if (!deliveryLocation)
      return showError("Please, Provide your valid delivery location");
    // Implement checkout functionality

    if (checkoutLoading) {
      return;
    }

    const checkoutRes = await createCheckoutSession({
      clerkId: user?.id,
      cartFoods: cartItems.map((item: TFoodWithQuantity) => ({
        _id: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      deliveryLocation,
      totalPrice: subTotal,
    });
    window.location.href = checkoutRes.data?.url;
  };

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
                    {cartItemsNumber} {cartItemsNumber === 1 ? "item" : "items"}
                  </span>
                </SheetDescription>
              </div>
            </SheetHeader>
            <div className="">
              <ScrollArea className="h-[55vh] px-5">
                <div className="space-y-4">
                  {cartItems.length > 0 ? (
                    cartItems.map((item: TFoodWithQuantity) => (
                      <CartItem
                        key={item._id}
                        item={item}
                        onUpdateQuantity={updateCartQuantity}
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
                    subTotal={subTotal}
                    onCheckout={handleCheckout}
                    deliveryLocation={deliveryLocation}
                    setDeliveryLocation={setDeliveryLocation}
                    agreedToTerms={agreedToTerms}
                    setAgreedToTerms={setAgreedToTerms}
                    checkoutLoading={checkoutLoading}
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

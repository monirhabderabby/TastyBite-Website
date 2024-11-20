import { RootState } from "@/redux/store";
import { CartItemProps } from "./cartSlice";

// Selector to get all cart items
export const selectCartItems = (state: RootState): CartItemProps[] =>
    state.cart.items;

// Selector to get the total number of items in the cart
export const selectCartTotalQuantity = (state: RootState): number => {
    return state.cart.items.reduce((total, item) => total + item.quantity, 0);
};

// Selector to get an item by ID
export const selectCartItemById = (
    state: RootState,
    id: string
): CartItemProps | undefined => {
    return state.cart.items.find((item) => item.id === id);
};

// Selector to check an item is in cart or not
export const isFoodInCart = (id: string) => (state: RootState) => {
    return state.cart.items.some((item) => item.id === id);
};

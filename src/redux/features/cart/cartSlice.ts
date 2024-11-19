import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export interface CartItemProps {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    menu: string;
}

interface CartState {
    items: CartItemProps[];
}

const initialState: CartState = {
    items: JSON.parse(Cookies.get("cart") || "[]"),
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItemProps>) => {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push({
                    id: action.payload.id,
                    name: action.payload.name,
                    price: action.payload.price,
                    image: action.payload.image,
                    quantity: action.payload.quantity,
                    menu: action.payload.menu,
                });
            }
            Cookies.set("cart", JSON.stringify(state.items), { expires: 7 });
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
            Cookies.set("cart", JSON.stringify(state.items), { expires: 7 });
        },
        updateQuantity: (
            state,
            action: PayloadAction<{ id: string; quantity: number }>
        ) => {
            const item = state.items.find(
                (item) => item.id === action.payload.id
            );
            if (item) {
                item.quantity = action.payload.quantity;
                if (item.quantity <= 0) {
                    state.items = state.items.filter(
                        (i) => i.id !== action.payload.id
                    );
                }
                Cookies.set("cart", JSON.stringify(state.items), {
                    expires: 7,
                });
            }
        },
        loadCartFromCookies: (state) => {
            state.items = JSON.parse(Cookies.get("cart") || "[]");
        },
        clearCart: (state) => {
            state.items = [];
            Cookies.remove("cart");
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    loadCartFromCookies,
    clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

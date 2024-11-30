import { TFoodWithQuantity } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
    items: TFoodWithQuantity[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<TFoodWithQuantity>) => {
            const existingItem = state.items.find(
                (item) => item._id === action.payload._id
            );
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item._id !== action.payload
            );
        },
        updateQuantity: (
            state,
            action: PayloadAction<{ id: string; quantity: number }>
        ) => {
            const item = state.items.find(
                (item) => item._id === action.payload.id
            );
            if (item) {
                item.quantity = action.payload.quantity;
                if (item.quantity <= 0) {
                    state.items = state.items.filter(
                        (i) => i._id !== action.payload.id
                    );
                }
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
    cartSlice.actions;
export default cartSlice.reducer;

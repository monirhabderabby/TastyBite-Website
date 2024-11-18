// wishlistSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface WishlistState {
    items: string[];
}

const initialState: WishlistState = {
    items: JSON.parse(Cookies.get("wishlist") || "[]"),
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishlist: (state, action: PayloadAction<string>) => {
            if (!state.items.includes(action.payload)) {
                state.items.push(action.payload);
                Cookies.set("wishlist", JSON.stringify(state.items), {
                    expires: 7,
                });
            }
        },
        removeFromWishlist: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item !== action.payload);
            Cookies.set("wishlist", JSON.stringify(state.items), {
                expires: 7,
            });
        },
    },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

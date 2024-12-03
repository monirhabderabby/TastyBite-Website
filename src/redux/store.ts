import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { baseApi } from "./api/baseApi";
import cartReducer from "./features/cart/cartSlice";
import filterReducer from "./features/filter/filterSlice";
import { checkoutApi } from "./features/payment/checkoutApi";
import wishlistReducer from "./features/wishlist/wishlistSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [checkoutApi.reducerPath]: checkoutApi.reducer,
    filter: filterReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApi.middleware)
      .concat(checkoutApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//Hooks
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

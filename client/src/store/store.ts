import {configureStore} from "@reduxjs/toolkit";
import productsReducer from "./slices/products";
import productDetailsReducer from "./slices/productDetails";

export const store = configureStore({
	reducer: {
		products: productsReducer,
		productDetails: productDetailsReducer,
	},
	devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

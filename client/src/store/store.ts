import {configureStore} from "@reduxjs/toolkit";
import productsReducer from "./slices/products";
import productDetailsReducer from "./slices/productDetails";
import cartReducer from "./slices/cart";
import userReducer from "./slices/user/user";
import usersListReducer from "./slices/usersList";
import orderReducer from "./slices/order";
import orderDetailsReducer from "./slices/orderDetails";
import orderPayReducer from "./slices/orderPay";
import orderListReducer from "./slices/ordersList";

export const store = configureStore({
	reducer: {
		products: productsReducer,
		productDetails: productDetailsReducer,
		cart: cartReducer,
		user: userReducer,
		usersList: usersListReducer,
		order: orderReducer,
		orderDetails: orderDetailsReducer,
		orderPay: orderPayReducer,
		ordersList: orderListReducer,
	},
	devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

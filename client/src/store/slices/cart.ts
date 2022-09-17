import {createSlice, Dispatch} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

interface Item {
	product: string;
	name: string;
	image: string;
	price: number;
	countInStock: number;
	qty: number;
}

interface ShippingAddress {
	address: string;
	city: string;
	postalCode: string;
	country: string;
}

interface CartState {
	cartItems: Item[];
	shippingAddress: ShippingAddress | null;
	paymentMethod: string | null;
}

const localStorageCartItems = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems")!)
	: [];

const localStorageShippingAddress = localStorage.getItem("shippingAddress")
	? JSON.parse(localStorage.getItem("shippingAddress")!)
	: null;

const localStoragePaymentMethod = localStorage.getItem("paymentMethod")
	? JSON.parse(localStorage.getItem("paymentMethod")!)
	: null;

// Define the initial state using that type
const initialState: CartState = {
	cartItems: localStorageCartItems,
	shippingAddress: localStorageShippingAddress,
	paymentMethod: localStoragePaymentMethod,
};

export const cartSlice = createSlice({
	name: "cart",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<Item>) => {
			const item = action.payload;
			const existItem = state.cartItems.find((x) => x.product === item.product);
			if (existItem) {
				state.cartItems = state.cartItems.map((x) => (x.product === existItem.product ? item : x));
			} else {
				state.cartItems = [...state.cartItems, item];
			}
		},
		removeFromCart: (state, action: PayloadAction<string>) => {
			state.cartItems = state.cartItems.filter((x) => x.product !== action.payload);
		},
		saveAddress: (state, action: PayloadAction<ShippingAddress>) => {
			state.shippingAddress = action.payload;
		},
		savePayment: (state, action: PayloadAction<string>) => {
			state.paymentMethod = action.payload;
		},
	},
});

export const addProductToCart =
	(id: string, qty: number) => async (dispatch: Dispatch, getState: () => RootState) => {
		try {
			const res = await fetch("/api/products/" + id);
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.message);
			}
			dispatch(
				addToCart({
					product: data._id,
					name: data.name,
					image: data.image,
					price: data.price,
					countInStock: data.countInStock,
					qty,
				})
			);
			localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
			}
		}
	};

export const removeProductFromCart =
	(id: string) => (dispatch: Dispatch, getState: () => RootState) => {
		dispatch(removeFromCart(id));
		localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
	};

export const saveShippingAddress = (data: ShippingAddress) => (dispatch: Dispatch) => {
	dispatch(saveAddress(data));
	localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data: string) => (dispatch: Dispatch) => {
	dispatch(savePayment(data));
	localStorage.setItem("paymentMethod", JSON.stringify(data));
};

export const {addToCart, removeFromCart, saveAddress, savePayment} = cartSlice.actions;

export default cartSlice.reducer;

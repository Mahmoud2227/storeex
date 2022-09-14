import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import Product from "../../types/product";

interface ProductState {
	loading: boolean;
	error: string | null;
	productDetails: Product | null;
}

// Define the initial state using that type
const initialState: ProductState = {
	loading: false,
	error: null,
	productDetails: null,
};

export const productDetailsSlice = createSlice({
	name: "productDetails",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		productDetailsRequest: (state) => {
			state.loading = true;
		},
		productDetailsSuccess: (state, action: PayloadAction<Product>) => {
			state.loading = false;
			state.productDetails = action.payload;
		},
		productDetailsFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const fetchProductDetails = (id: string) => async (dispatch: any) => {
	try {
		dispatch(productDetailsRequest());
		const res = await fetch("/api/products/" + id);
		const data = await res.json();
		if (res.status > 299) {
			throw new Error(data.message);
		}
		dispatch(productDetailsSuccess(data));
	} catch (error) {
		if (error instanceof Error) {
			dispatch(productDetailsFail(error.message));
		}
	}
};

export const {productDetailsRequest, productDetailsFail, productDetailsSuccess} =
	productDetailsSlice.actions;

export default productDetailsSlice.reducer;

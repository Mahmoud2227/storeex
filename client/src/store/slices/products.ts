import {createSlice, Dispatch} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import Product from "../../types/product";

interface ProductState {
	loading: boolean;
	error: string | null;
	products: Product[];
}

// Define the initial state using that type
const initialState: ProductState = {
	loading: false,
	error: null,
	products: [],
};

export const productsSlice = createSlice({
	name: "productsList",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		productListRequest: (state) => {
			state.loading = true;
		},
		productListSuccess: (state, action: PayloadAction<Product[]>) => {
			state.loading = false;
			state.products = action.payload;
		},
		productListFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const fetchProducts = () => async (dispatch: Dispatch) => {
	try {
		dispatch(productListRequest());
		const res = await fetch("/api/products");
		const data = await res.json();
		if (res.status > 299) {
			throw new Error(data.message);
		}
		dispatch(productListSuccess(data));
	} catch (error) {
		if (error instanceof Error) {
			dispatch(productListFail(error.message));
		}
	}
};

export const {productListRequest, productListFail, productListSuccess} = productsSlice.actions;

export default productsSlice.reducer;

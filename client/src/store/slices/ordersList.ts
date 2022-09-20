import {createSlice, Dispatch} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import Order from "../../types/order";

interface OrderState {
	loading: boolean;
	error: string | null;
	orders: Order[] | null;
}

// Define the initial state using that type
const initialState: OrderState = {
	loading: false,
	error: null,
	orders: null,
};

export const ordersListSlice = createSlice({
	name: "ordersList",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		ordersListRequest: (state) => {
			state.loading = true;
		},
		ordersListSuccess: (state, action: PayloadAction<Order[]>) => {
			state.loading = false;
			state.orders = action.payload;
		},
		ordersListFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const getOrdersList = () => async (dispatch: Dispatch) => {
	try {
		dispatch(ordersListRequest());

		const token = localStorage.getItem("userInfo")
			? JSON.parse(localStorage.getItem("userInfo")!).token
			: "";

		const res = await fetch("/api/orders/myorders", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await res.json();

		if (!res.ok) {
			new Error(data.message);
		}

		dispatch(ordersListSuccess(data));
	} catch (error) {
		if (error instanceof Error) {
			dispatch(ordersListFail(error.message));
		}
	}
};

export const {ordersListRequest, ordersListFail, ordersListSuccess} = ordersListSlice.actions;

export default ordersListSlice.reducer;

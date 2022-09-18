import {createSlice, Dispatch} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import Order from "../../types/order";

interface OrderState {
	loading: boolean;
	error: string | null;
	order: Order | null;
}

// Define the initial state using that type
const initialState: OrderState = {
	loading: false,
	error: null,
	order: null,
};

export const orderDetailsSlice = createSlice({
	name: "orderDetails",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		orderDetailsRequest: (state) => {
			state.loading = true;
		},
		orderDetailsSuccess: (state, action: PayloadAction<Order>) => {
			state.loading = false;
			state.order = action.payload;
		},
		orderDetailsFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const getOrderDetails = (id: string) => async (dispatch: Dispatch) => {
	try {
		dispatch(orderDetailsRequest());

		const token = localStorage.getItem("userInfo")
			? JSON.parse(localStorage.getItem("userInfo")!).token
			: "";

		const res = await fetch(`/api/orders/${id}`, {
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

		dispatch(orderDetailsSuccess(data));
	} catch (error) {
		if (error instanceof Error) {
			dispatch(orderDetailsFail(error.message));
		}
	}
};

export const {orderDetailsRequest, orderDetailsSuccess, orderDetailsFail} =
	orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;

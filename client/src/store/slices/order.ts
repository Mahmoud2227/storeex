import {createSlice, Dispatch} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import Order from "../../types/order";

interface OrderState {
	success: boolean;
	error: string | null;
	order: Order | null;
}

// Define the initial state using that type
const initialState: OrderState = {
	success: false,
	error: null,
	order: null,
};

export const orderSlice = createSlice({
	name: "order",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		orderRequest: (state) => {
			state.success = false;
		},
		orderSuccess: (state, action: PayloadAction<Order>) => {
			state.success = true;
			state.order = action.payload;
		},
		orderFail: (state, action) => {
			state.success = false;
			state.error = action.payload;
		},
	},
});

export const createOrder = (order: Order) => async (dispatch: Dispatch) => {
	try {
		dispatch(orderRequest());

		const token = localStorage.getItem("userInfo")
			? JSON.parse(localStorage.getItem("userInfo")!).token
			: "";

		const res = await fetch("/api/orders", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(order),
		});

		const data = await res.json();

		if (!res.ok) {
			new Error(data.message);
		}

		dispatch(orderSuccess(data));
	} catch (error) {
		if (error instanceof Error) {
			dispatch(orderFail(error.message));
		}
	}
};

export const {orderRequest, orderFail, orderSuccess} = orderSlice.actions;

export default orderSlice.reducer;

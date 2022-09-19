import {createSlice, Dispatch} from "@reduxjs/toolkit";

interface OrderPayState {
	loading: boolean;
	error: string | null;
	success: boolean;
}

// Define the initial state using that type
const initialState: OrderPayState = {
	loading: false,
	error: null,
	success: false,
};

export const orderPaySlice = createSlice({
	name: "orderPay",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		orderPayRequest: (state) => {
			state.loading = true;
		},
		orderPaySuccess: (state) => {
			state.loading = false;
			state.success = true;
		},
		orderPayFail: (state, action) => {
			state.loading = false; 
			state.error = action.payload;
		},
	},
});

export const payOrder = (id: string,PaymentResult:unknown) => async (dispatch: Dispatch) => {
	try {
		dispatch(orderPayRequest());

		const token = localStorage.getItem("userInfo")
			? JSON.parse(localStorage.getItem("userInfo")!).token
			: "";

		const res = await fetch(`/api/orders/${id}/pay`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(PaymentResult),
		});

		const data = await res.json();

		if (!res.ok) {
			new Error(data.message);
		}

		dispatch(orderPaySuccess());
	} catch (error) {
		if (error instanceof Error) {
			dispatch(orderPayFail(error.message));
		}
	}
};

export const {orderPayRequest, orderPaySuccess, orderPayFail} =
	orderPaySlice.actions;

export default orderPaySlice.reducer;

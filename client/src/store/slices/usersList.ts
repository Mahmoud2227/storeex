import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import User from "../../types/user";

interface UsersListState {
	usersList: User[] | null;
	loading: boolean;
	error: string | null;
}

// Define the initial state using that type
const initialState: UsersListState = {
	usersList: null,
	loading: false,
	error: null,
};

export const usersListSlice = createSlice({
	name: "usersList",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		requestStart: (state) => {
			state.loading = true;
		},
		requestSuccess: (state, action: PayloadAction<User[]>) => {
			state.loading = false;
			state.usersList = action.payload;
			state.error = null;
		},
		requestFail: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const getUsersList = () => async (dispatch: any) => {
	try {
		dispatch(requestStart());

		const token = localStorage.getItem("userInfo")
			? JSON.parse(localStorage.getItem("userInfo")!).token
			: "";

		const response = await fetch("/api/users", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message || "Something went wrong");
		}
		dispatch(requestSuccess(data));
	} catch (error) {
		if (error instanceof Error) {
			dispatch(requestFail(error.message));
		}
	}
};

export const {requestStart, requestSuccess, requestFail} = usersListSlice.actions;

export default usersListSlice.reducer;

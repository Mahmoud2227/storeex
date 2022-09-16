import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import User from "../../../types/user";

interface UserState {
	user: User | null;
	loading: boolean;
	error: string | null;
}

const localStorageUserInfo = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo")!)
	: null;

// Define the initial state using that type
const initialState: UserState = {
	user: localStorageUserInfo,
	loading: false,
	error: null,
};

export const userSlice = createSlice({
	name: "user",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		requestStart: (state) => {
			state.loading = true;
		},
		requestSuccess: (state, action: PayloadAction<User>) => {
			state.loading = false;
			state.user = action.payload;
			state.error = null;
		},
		requestFail: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
		userLogout: (state) => {
			state.user = null;
		},
	},
});

export const {requestStart, requestSuccess, requestFail, userLogout} = userSlice.actions;

export default userSlice.reducer;

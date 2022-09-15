import {createSlice, Dispatch} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import User from "../../types/user";

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
		loginRequest: (state) => {
			state.loading = true;
		},
		loginSuccess: (state, action: PayloadAction<User>) => {
			state.loading = false;
			state.user = action.payload;
		},
		loginFail: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
		userLogout: (state) => {
			state.user = null;
		},
	},
});

export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
	try {
		dispatch(loginRequest());

		const res = await fetch("/api/users/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({email, password}),
		});
		const data = await res.json();
		if (!res.ok) {
			throw new Error(data.message);
		}
		dispatch(loginSuccess(data));
		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		if (error instanceof Error) {
			dispatch(loginFail(error.message));
		}
	}
};

export const logout = () => (dispatch: Dispatch) => {
	localStorage.removeItem("userInfo");
	dispatch(userLogout());
};

export const {loginFail, loginRequest, loginSuccess, userLogout} = userSlice.actions;

export default userSlice.reducer;

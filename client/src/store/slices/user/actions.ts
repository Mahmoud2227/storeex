import {Dispatch} from "@reduxjs/toolkit";
import {requestStart, requestFail, requestSuccess, userLogout} from "./user";

export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
	try {
		dispatch(requestStart());

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
		dispatch(requestSuccess(data));
		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		if (error instanceof Error) {
			dispatch(requestFail(error.message));
		}
	}
};

export const register =
	(name: string, email: string, password: string) => async (dispatch: Dispatch) => {
		try {
			dispatch(requestStart());

			const res = await fetch("/api/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({name, email, password}),
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.message);
			}
			dispatch(requestSuccess(data));
			localStorage.setItem("userInfo", JSON.stringify(data));
		} catch (error) {
			if (error instanceof Error) {
				dispatch(requestFail(error.message));
			}
		}
	};

export const getUserDetails = (id: string) => async (dispatch: Dispatch, getState: any) => {
	try {
		dispatch(requestStart());

		const user = getState().user.user;
		const res = await fetch("/api/users/" + id, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		});
		const data = await res.json();
		if (!res.ok) {
			throw new Error(data.message);
		}
		dispatch(requestSuccess({...data, token: user.token}));
	} catch (error) {
		if (error instanceof Error) {
			dispatch(requestFail(error.message));
		}
	}
};

export const updateProfile = (user: any) => async (dispatch: Dispatch, getState: any) => {
	try {
		dispatch(requestStart());

		const token = getState().user.user.token;

		const res = await fetch("/api/users/profile", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(user),
		});
		const data = await res.json();
		if (!res.ok) {
			throw new Error(data.message);
		}
		dispatch(requestSuccess(data));
		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		if (error instanceof Error) {
			dispatch(requestFail(error.message));
		}
	}
};

export const logout = () => (dispatch: Dispatch) => {
	localStorage.removeItem("userInfo");
	dispatch(userLogout());
};

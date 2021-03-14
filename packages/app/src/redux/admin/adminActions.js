import * as adminTypes from "./adminTypes";
import axios from "axios";

export const loginAdminRequest = () => {
	return {
		type: adminTypes.LOGIN_ADMIN_REQUEST,
	};
};

export const loginAdminSuccess = (userData) => {
	localStorage.setItem("me", JSON.stringify(userData));
	return {
		type: adminTypes.LOGIN_ADMIN_SUCCESS,
		payload: userData,
	};
};

export const loginAdminFailure = (err) => {
	return {
		type: adminTypes.LOGIN_ADMIN_FAILURE,
		payload: err,
	};
};

export const logoutAdmin = () => {
	if (localStorage.getItem("me")) localStorage.removeItem("me");
	return {
		type: adminTypes.LOGOUT_ADMIN,
	};
};

export const loginAdmin = (googleToken) => {
	return (dispatch) => {
		dispatch(loginAdminRequest());
		axios
			.post("http://localhost:5000/login", {}, { headers: { "auth-token": googleToken } })
			.then((res) => {
				dispatch(loginAdminSuccess({ token: googleToken, data: res.data }));
			})
			.catch((err) => {
				const errMessage =
					!err.response || !err.response.data || err.response.data.includes("<!DOCTYPE html>")
						? err.message
						: err.response.data;
				dispatch(loginAdminFailure(errMessage));
			});
	};
};

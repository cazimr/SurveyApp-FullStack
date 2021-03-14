import * as adminTypes from "./adminTypes";

const initialState = {
	loading: false,
	loggedIn: localStorage.getItem("me") ? true : false,
	token: localStorage.getItem("me") ? JSON.parse(localStorage.getItem("me")).token : "",
	error: "",
	data: localStorage.getItem("me") ? JSON.parse(localStorage.getItem("me")).data : {},
};

const adminReducer = (state = initialState, action) => {
	switch (action.type) {
		case adminTypes.LOGIN_ADMIN_REQUEST:
			return {
				...state,
				loading: true,
			};
		case adminTypes.LOGIN_ADMIN_SUCCESS:
			return {
				...state,
				loading: false,
				error: "",
				loggedIn: true,
				token: action.payload.token,
				data: action.payload.data,
			};
		case adminTypes.LOGIN_ADMIN_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case adminTypes.LOGOUT_ADMIN:
			return {
				loading: false,
				loggedIn: false,
				token: "",
				error: "",
				data: {},
			};
		default:
			return state;
	}
};

export default adminReducer;

import * as candidateTypes from "./candidateTypes";
import axios from "axios";
import { logoutAdmin } from "../admin/adminActions";

export const getCandidatesRequest = () => {
	return {
		type: candidateTypes.GET_CANDIDATES_REQUEST,
	};
};

export const getCandidatesSuccess = (candidates) => {
	return {
		type: candidateTypes.GET_CANDIDATES_SUCCESS,
		payload: candidates,
	};
};

export const getCandidatesFailure = (err) => {
	return {
		type: candidateTypes.GET_CANDIDATES_FAILURE,
		payload: err,
	};
};

export const addCandidateRequest = () => {
	return {
		type: candidateTypes.ADD_CANDIDATE_REQUEST,
	};
};

export const addCandidateSuccess = () => {
	return {
		type: candidateTypes.ADD_CANDIDATE_SUCCESS,
	};
};

export const addCandidateFailure = (err) => {
	return {
		type: candidateTypes.ADD_CANDIDATE_FAILURE,
		payload: err,
	};
};

export const deleteCandidateRequest = () => {
	return {
		type: candidateTypes.DELETE_CANDIDATE_REQUEST,
	};
};

export const deleteCandidateSuccess = () => {
	return {
		type: candidateTypes.DELETE_CANDIDATE_SUCCESS,
	};
};

export const deleteCandidateFailure = (err) => {
	return {
		type: candidateTypes.DELETE_CANDIDATE_FAILURE,
		payload: err,
	};
};

export const createCandidateSurveyRequest = () => {
	return {
		type: candidateTypes.CREATE_CANDIDATE_SURVEY_REQUEST,
	};
};

export const createCandidateSurveySuccess = () => {
	return {
		type: candidateTypes.CREATE_CANDIDATE_SURVEY_SUCCESS,
	};
};

export const createCandidateSurveyFailure = (err) => {
	return {
		type: candidateTypes.CREATE_CANDIDATE_SURVEY_FAILURE,
		payload: err,
	};
};

export const sendCandidateEmailRequest = () => {
	return {
		type: candidateTypes.SEND_CANDIDATE_EMAIL_REQUEST,
	};
};

export const sendCandidateEmailSuccess = () => {
	return {
		type: candidateTypes.SEND_CANDIDATE_EMAIL_SUCCESS,
	};
};

export const sendCandidateEmailFailure = (err) => {
	return {
		type: candidateTypes.SEND_CANDIDATE_EMAIL_FAILURE,
		payload: err,
	};
};

export const sendCandidateEmail = (userId, googleToken) => {
	return (dispatch) => {
		dispatch(sendCandidateEmailRequest());
		axios
			.get(`http://localhost:5000/candidate/${userId}`, { headers: { "auth-token": googleToken } })
			.then((res) => {
				const user = res.data[0];
				axios
					.post(`http://localhost:4000/sendmail`, {
						mailData: {
							subject: "Survey ready",
							to: user.email,
							data: {
								candFirstName: user.first_name,
								candLastName: user.last_name,
								quUrl: user.url,
								quPin: user.pin,
							},
							template: "candidateEmail.html",
						},
					})
					.then((res) => {
						dispatch(sendCandidateEmailSuccess());
					})
					.catch((err) => {
						const errMessage =
							!err.response || !err.response.data || err.response.data.includes("<!DOCTYPE html>")
								? err.message
								: err.response.data;
						dispatch(sendCandidateEmailFailure(errMessage));
					});
			})
			.catch((err) => {
				const errMessage =
					!err.response || !err.response.data || err.response.data.includes("<!DOCTYPE html>")
						? err.message
						: err.response.data;
				dispatch(sendCandidateEmailFailure(errMessage));

				if (errMessage === "Access denied") {
				
					dispatch(logoutAdmin());
				}
			});
	};
};

export const createCandidateSurvey = (userId, googleToken) => {
	return (dispatch) => {
		dispatch(createCandidateSurveyRequest());
		axios
			.post("http://localhost:5000/candidate/survey", { userId }, { headers: { "auth-token": googleToken } })
			.then((res) => {
				dispatch(createCandidateSurveySuccess());
				dispatch(getCandidates(googleToken));
				dispatch(sendCandidateEmail(userId, googleToken));
			})
			.catch((err) => {
				const errMessage =
					!err.response || !err.response.data || err.response.data.includes("<!DOCTYPE html>")
						? err.message
						: err.response.data;
				dispatch(createCandidateSurveyFailure(errMessage));

				if (errMessage === "Access denied") {
				
					dispatch(logoutAdmin());
				}
			});
	};
};

export const getCandidates = (googleToken) => {
	return (dispatch) => {
		dispatch(getCandidatesRequest());
		axios
			.get("http://localhost:5000/candidate/all", { headers: { "auth-token": googleToken } })
			.then((res) => {
				dispatch(getCandidatesSuccess(res.data));
			})
			.catch((err) => {
				const errMessage =
					!err.response || !err.response.data || err.response.data.includes("<!DOCTYPE html>")
						? err.message
						: err.response.data;
				dispatch(getCandidatesFailure(errMessage));

				if (errMessage === "Access denied") {
				
					dispatch(logoutAdmin());
				}
			});
	};
};

export const addCandidate = (candidate, googleToken) => {
	return (dispatch) => {
		dispatch(addCandidateRequest());
		axios
			.post("http://localhost:5000/candidate", { ...candidate }, { headers: { "auth-token": googleToken } })
			.then(() => {
				dispatch(addCandidateSuccess());
				dispatch(getCandidates(googleToken));
			})
			.catch((err) => {
				const errMessage =
					!err.response || !err.response.data || err.response.data.includes("<!DOCTYPE html>")
						? err.message
						: err.response.data;
				dispatch(addCandidateFailure(errMessage));
				if (errMessage === "Access denied") {
				
					dispatch(logoutAdmin());
				}
			});
	};
};

export const deleteCandidate = (id, googleToken) => {
	return (dispatch) => {
		dispatch(addCandidateRequest());
		axios
			.delete(`http://localhost:5000/candidate/${id}`, { headers: { "auth-token": googleToken } })
			.then(() => {
				dispatch(deleteCandidateSuccess());
				dispatch(getCandidates(googleToken));
			})
			.catch((err) => {
				const errMessage =
					!err.response || !err.response.data || err.response.data.includes("<!DOCTYPE html>")
						? err.message
						: err.response.data;
				dispatch(deleteCandidateFailure(errMessage));
				if (errMessage === "Access denied") {
				
					dispatch(logoutAdmin());
				}
			});
	};
};

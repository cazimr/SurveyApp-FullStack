import * as candidateTypes from "./candidateTypes";

const initialState = {
	loadingGetCandidates: false,
	loadingAddCandidate: false,
	loadingCreateCandSurvey: false,
	loadingDeleteCandidate: false,
	loadingSendCandEmail: false,

	errorGetCandidates: "",
	errorAddCandidate: "",
	errorCreateCandSurvey: "",
	errorDeleteCandidate: "",
	errorSendCandEmail: "",

	data: {},
};

const candidatesReducer = (state = initialState, action) => {
	switch (action.type) {
		/*Get candidates*/

		case candidateTypes.GET_CANDIDATES_REQUEST:
			return {
				...state,
				loadingGetCandidates: true,
			};
		case candidateTypes.GET_CANDIDATES_SUCCESS:
			return {
				...state,
				loadingGetCandidates: false,
				errorGetCandidates: "",
				data: action.payload,
			};
		case candidateTypes.GET_CANDIDATES_FAILURE:
			return {
				...state,
				loadingGetCandidates: false,
				errorGetCandidates: action.payload,
			};

		/*Add candidate*/

		case candidateTypes.ADD_CANDIDATE_REQUEST:
			return {
				...state,
				loadingAddCandidate: true,
			};

		case candidateTypes.ADD_CANDIDATE_SUCCESS:
			return {
				...state,
				loadingAddCandidate: false,
				errorAddCandidate: "",
			};

		case candidateTypes.ADD_CANDIDATE_FAILURE:
			return {
				...state,
				loadingAddCandidate: false,
				errorAddCandidate: action.payload,
			};

		/*Create candidate survey*/

		case candidateTypes.CREATE_CANDIDATE_SURVEY_REQUEST:
			return {
				...state,
				loadingCreateCandSurvey: true,
			};
		case candidateTypes.CREATE_CANDIDATE_SURVEY_SUCCESS:
			return {
				...state,
				loadingCreateCandSurvey: false,
				errorCreateCandSurvey: "",
			};
		case candidateTypes.CREATE_CANDIDATE_SURVEY_FAILURE:
			return {
				...state,
				loadingCreateCandSurvey: false,
				errorCreateCandSurvey: action.payload,
			};

		/*Send candidate email*/

		case candidateTypes.SEND_CANDIDATE_EMAIL_REQUEST:
			return {
				...state,
				loadingSendCandEmail: true,
			};
		case candidateTypes.SEND_CANDIDATE_EMAIL_SUCCESS:
			return {
				...state,
				loadingSendCandEmail: false,
				errorSendCandEmail: "",
			};
		case candidateTypes.SEND_CANDIDATE_EMAIL_FAILURE:
			return {
				...state,
				loadingSendCandEmail: false,
				errorSendCandEmail: action.payload,
			};

		/*Delete candidate*/

		case candidateTypes.DELETE_CANDIDATE_REQUEST:
			return {
				...state,
				loadingDeleteCandidate: true,
			};

		case candidateTypes.DELETE_CANDIDATE_SUCCESS:
			return {
				...state,
				loadingDeleteCandidate: false,
				errorDeleteCandidate: "",
			};
		case candidateTypes.DELETE_CANDIDATE_FAILURE:
			return {
				...state,
				loadingDeleteCandidate: false,
				errorDeleteCandidate: action.payload,
			};

		default:
			return state;
	}
};

export default candidatesReducer;

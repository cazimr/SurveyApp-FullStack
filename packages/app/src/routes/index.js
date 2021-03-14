import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "../views/Login";
import CandidatesPage from "../views/Candidates";
import CandidateForm from "../views/CandidateForm";
import SurveyPage from "../views/Survey";

const Routes = () => {
	const loggedIn = useSelector((state) => state.admin.loggedIn);

	return (
		<Switch>
			<Route exact path="/">
				<Redirect to="/login" />/
			</Route>
			<Route
				exact
				path="/login"
				render={(props) => (loggedIn ? <Redirect to="/candidates" /> : <LoginPage {...props} />)}
			/>
			<Route
				exact
				path="/candidates"
				render={(props) => (loggedIn ? <CandidatesPage {...props} /> : <Redirect to="/login" />)}
			/>
			<Route
				exact
				path="/newCandidate"
				render={(props) => (loggedIn ? <CandidateForm {...props} /> : <Redirect to="/login" />)}
			/>
			<Route path="/survey/:candId" component={SurveyPage}></Route>
		</Switch>
	);
};

export default Routes;

import React, { useEffect, useState } from "react";
import { Form, Select } from "antd";
import { useLocation } from "react-router-dom";

import axios from "axios";
import {
	StyledWrapper,
	StyledInput,
	StyledButton,
	StyledTitle,
	StyledErrorMessage,
} from "../../components/StyledComponents/authStyle";

const SurveyPage = () => {
	const [candidate, setCandidate] = useState();
	const [error, setError] = useState("");
	const [access, setAccess] = useState(false);
	const location = useLocation();
	const path = `http://localhost:3000${location.pathname}`;

	const questions = [
		"I feel that I am a person of worth, at least on an equal plane with others.",
		"I feel that I have a number of good qualities.",
		"All in all, I am inclined to feel that I am a failure.",
		"I am able to do things as well as most other people.",
		"I feel I do not have much to be proud of.",
		"I take a positive attitude toward myself.",
		"On the whole, I am satisfied with myself.",
		"I wish I could have more respect for myself.",
		"I certainly feel useless at times.",
		"At times I think I am no good at all.",
	];

	const selects = [];

	for (let i = 1; i <= questions.length; i++) {
		if (i < 3 || i === 4 || i === 6 || i === 7) {
			selects.push(
				<div key={`Q${i}`}>
					<label>{questions[i - 1]}</label>
					<Form.Item
						name={`Q${i}`}
						rules={[
							{
								required: true,
								message: "Please select value",
							},
						]}
					>
						<Select placeholder="Pick answer">
							<Select.Option value={3}>Strongly Agree</Select.Option>
							<Select.Option value={2}>Agree</Select.Option>
							<Select.Option value={1}>Disagree</Select.Option>
							<Select.Option value={0}>Strongly Disagree</Select.Option>
						</Select>
					</Form.Item>
				</div>
			);
		} else {
			selects.push(
				<div key={`Q${i}`}>
					<label>{questions[i - 1]}</label>
					<Form.Item
						name={`Q${i}`}
						key={`Q${i}`}
						rules={[
							{
								required: true,
								message: "Please select value",
							},
						]}
					>
						<Select placeholder="Pick answer">
							<Select.Option value={0}>Strongly Agree</Select.Option>
							<Select.Option value={1}>Agree</Select.Option>
							<Select.Option value={2}>Disagree</Select.Option>
							<Select.Option value={3}>Strongly Disagree</Select.Option>
						</Select>
					</Form.Item>
				</div>
			);
		}
	}

	useEffect(() => {
		axios
			.post("http://localhost:5000/candidate/surveyUser", { url: path })
			.then((res) => {
				setCandidate(res.data[0]);
                
			})
			.catch((err) => {
				const errMessage =
					!err.response || !err.response.data || err.response.data.includes("<!DOCTYPE html>")
						? err.message
						: err.response.data;
				setError(errMessage);
			});
	}, [path]);

	return (
		<>
			<StyledTitle style={{ marginLeft: "45%", marginTop: "5%" }}>Survey</StyledTitle>
			{error.length > 0 && <StyledErrorMessage style={{ marginLeft: "45%" }}>{error}</StyledErrorMessage>}
			{candidate &&
				!error.length &&
				(!access ? (
					<StyledWrapper style={{ marginTop: "4em" }}>
						<Form
							onFinish={(values) => {
								if (values.pin === candidate.pin) setAccess(true);
								else {
									setError("Invalid pin!");
								}
							}}
						>
							<Form.Item
								name="pin"
								rules={[
									{
										required: true,
										message: "Please input PIN",
									},
								]}
							>
								<StyledInput placeholder="PIN" />
							</Form.Item>
							<Form.Item>
								<StyledButton
									type="primary"
									htmlType="submit"
									style={{ marginLeft: "6em", marginTop: "1em" }}
								>
									Submit
								</StyledButton>
							</Form.Item>
						</Form>
					</StyledWrapper>
				) : candidate.results ? (
					<>
						<h2 style={{ margin: "3em 3em 1em 3em" }}>Results: {candidate.results}</h2>
						{candidate.results < 15 ? (
							<h3 style={{ margin: "0em 3em 3em 3em" }}>Low self-esteem</h3>
						) : candidate.results < 26 ? (
							<h3 style={{ margin: "0em 3em 3em 3em" }}>Normal self-esteem</h3>
						) : (
							<h3 style={{ margin: "0em 3em 3em 3em" }}>High self-esteem</h3>
						)}
					</>
				) : (
					<Form
						onFinish={(values) => {
							let results = 0;
							for (let i = 1; i <= 10; i++) results += values[`Q${i}`];
							axios
								.put(`http://localhost:5000/candidate/survey/${candidate.id}`, { results })
								.then((res) => {
									alert("Congratulations!");
									setCandidate({ ...candidate, results: results });
								})
								.catch((err) => {
									const errMessage =
										!err.response ||
										!err.response.data ||
										err.response.data.includes("<!DOCTYPE html>")
											? err.message
											: err.response.data;
									setError(errMessage);
								});
						}}
						style={{ marginTop: "5em", marginLeft: "3em", marginRight: "3em" }}
					>
						{selects}
						<Form.Item>
							<StyledButton
								type="primary"
								htmlType="submit"
								style={{ marginLeft: "47%", marginTop: "1em" }}
							>
								Submit
							</StyledButton>
						</Form.Item>
					</Form>
				))}
		</>
	);
};

export default SurveyPage;

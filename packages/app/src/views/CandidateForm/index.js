import React, { useState, useEffect } from "react";
import { Form, Select, DatePicker } from "antd";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { useHistory } from "react-router-dom";
import {
	StyledWrapper,
	StyledTitle,
	StyledErrorMessage,
	StyledInput,
	StyledButton,
} from "../../components/StyledComponents/authStyle";
import Layout from "../../components/Layout";
import * as style from "./style";
import { addCandidate } from "../../redux";

const CandidateForm = () => {
	const [clicked, setClicked] = useState(false);
	const history = useHistory();
	const { errorAddCandidate: error, loadingAddCandidate: loading } = useSelector((state) => state.candidates);
	const token = useSelector((state) => state.admin.token);
	const dispatch = useDispatch();
	useEffect(()=>{
		if(clicked && !loading && !error.length) history.push("/candidates");
	},[clicked,loading,error,history])
	return (
		<Layout>
			<style.StyledBackArrow onClick={() => history.push("/candidates")} />
			<StyledWrapper>
				<StyledTitle style={{ marginTop: "-4.2em", marginBottom: "2em" }}>New Candidate</StyledTitle>
				<Form
					onFinish={(values) => {
						const dateStr = moment(values.birthDate).format("YYYY-MM-DD");

						dispatch(addCandidate({ ...values, birthDate: dateStr }, token));
						setClicked(true);
					}}
					onChange={() => {
						setClicked(false);
					}}
				>
					<Form.Item
						name="firstName"
						rules={[
							{
								required: true,
								message: "Please input candidate first name!",
							},
						]}
					>
						<StyledInput placeholder="First name" />
					</Form.Item>

					<Form.Item
						name="lastName"
						rules={[
							{
								required: true,
								message: "Please input candidate last name!",
							},
						]}
					>
						<StyledInput placeholder="Last Name" />
					</Form.Item>

					<Form.Item
						name="code"
						rules={[
							{
								required: true,
								message: "Please input candidate code",
							},
						]}
					>
						<StyledInput placeholder="Code" />
					</Form.Item>

					<Form.Item
						name="email"
						rules={[
							{
								required: true,
								message: "Please input candidate email!",
							},
						]}
					>
						<StyledInput placeholder="Email" />
					</Form.Item>

					<Form.Item
						name="gender"
						rules={[
							{
								required: true,
								message: "Please select candidate gender!",
							},
						]}
					>
						<Select placeholder="Gender">
							<Select.Option value="Male">Male</Select.Option>
							<Select.Option value="Female">Female</Select.Option>
						</Select>
					</Form.Item>

					<Form.Item
						name="birthDate"
						rules={[
							{
								required: true,
								message: "Please select candidate birth date!",
							},
						]}
					>
						<DatePicker style={{ width: "100%" }} />
					</Form.Item>
					<Form.Item>
						<StyledButton type="primary" htmlType="submit" style={{ marginLeft: "6em", marginTop: "1em" }}>
							Add Candidate
						</StyledButton>
					</Form.Item>
				</Form>
				{clicked && !loading && <StyledErrorMessage style={{ marginTop: "-4em" }}>{error}</StyledErrorMessage>}
			</StyledWrapper>
		</Layout>
	);
};

export default CandidateForm;

import React from "react";
import { UserOutlined } from "@ant-design/icons";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin, loginAdminFailure } from "../../redux";
import {
	StyledWrapper,
	TitleWrapper,
	StyledAvatar,
	StyledTitle,
	StyledErrorMessage,
} from "../../components/StyledComponents/authStyle";
import Layout from "../../components/Layout";

const LoginPage = (props) => {
	const dispatch = useDispatch();
	const { loading, error } = useSelector((state) => state.admin);
	const responseGoogle = (googleRes) => {
		dispatch(loginAdmin(googleRes.tokenId));
	};

	return (
		<Layout>
			<StyledWrapper>
				<TitleWrapper>
					<StyledAvatar icon={<UserOutlined />} />
					<StyledTitle>Log In</StyledTitle>
				</TitleWrapper>
				<GoogleLogin
					clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
					buttonText="Login with Google"
					onSuccess={responseGoogle}
					onFailure={() => dispatch(loginAdminFailure("Login failed!"))}
					cookiePolicy={"single_host_origin"}
				></GoogleLogin>
				{error && !loading && error.length && <StyledErrorMessage>{error}</StyledErrorMessage>}
			</StyledWrapper>
		</Layout>
	);
};

export default LoginPage;

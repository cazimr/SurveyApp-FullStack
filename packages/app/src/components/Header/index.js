import React from "react";

import { UserOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { logoutAdmin } from "../../redux";
import * as style from "./style";


function Header() {
	const loggedIn = useSelector((state) => state.admin.loggedIn);
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

	const iconStyle = {
		paddingRight: "10px",
		paddingTop: "5px",
		color: "white",
		fontSize: "20px",
	};


	return (
		<style.StyledHeader>
			<style.FlexRow>
				<style.StyledAvatar icon={<UserOutlined />} />
				<style.StyledTitle>CandidateApp</style.StyledTitle>
			</style.FlexRow>
			{location.pathname !== "/login" && (
				<style.FlexRow>
					{loggedIn ? <LoginOutlined style={iconStyle} /> : <LogoutOutlined style={iconStyle} />}
					<style.StyledLink
						onClick={() => {
							loggedIn ? dispatch(logoutAdmin()) : history.push("/login");
						}}
					>
						{loggedIn ? "Logout" : "Login"}
					</style.StyledLink>
				</style.FlexRow>
			)}
		</style.StyledHeader>
	);
}

export default Header;

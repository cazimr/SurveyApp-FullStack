import styled from "styled-components";
import { Avatar } from "antd";

export const StyledAvatar = styled(Avatar)`
	background-color: white;
	color: ${({ theme }) => theme.colors.titlePrimary};
	margin-right: 10px;
`;

export const StyledHeader = styled.header`
	background: ${({ theme }) => theme.colors.primary};
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 70px;
	padding: 0 40px;
`;
export const FlexRow = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: left;
	align-items: center;
`;

export const StyledTitle = styled.h2`
	color: white;
	margin-top: 8px;
	&:hover{
		cursor: pointer;
	}
`;

export const StyledLink = styled.a`
	display: flex;
	color: white;
	font-size: 20px;
`;

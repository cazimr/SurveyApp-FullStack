import styled from "styled-components";
import { Input, Button } from "antd";
import { Avatar } from "antd";

export const StyledWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin-top: 10%;
	padding-right: 5em;
`;

export const StyledInput = styled(Input)`
	width: 20em;
`;

export const StyledButton = styled(Button)`
	background-color: ${({ theme }) => theme.colors.primary};
	border-color: ${({ theme }) => theme.colors.primary};
	&:focus {
		background-color: ${({ theme }) => theme.colors.primary};
		border-color: ${({ theme }) => theme.colors.primary};
		color: white;
	}
	&:hover {
		background-color: ${({ theme }) => theme.colors.primaryLight};
		border-color: ${({ theme }) => theme.colors.primary};
		color: white;
	}
	color: white;
	width: 8em;
	padding-left: 10px;
	margin-top: 3em;
	margin-bottom: 3em;
`;

export const StyledAvatar = styled(Avatar)`
	background-color: ${({ theme }) => theme.colors.primary};
	color: white;
	width: 2.2em;
	height: 2.2em;
	padding-top: 3px;
`;

export const TitleWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 1.5em;
	justify-content: center;
	align-items: center;
	margin-right: 0.7em;
`;

export const StyledTitle = styled.h2`
	margin-top: 0.2em;
	color: ${({ theme }) => theme.colors.titlePrimary};
`

export const StyledErrorMessage = styled.div`
	display: flex;
	margin-top: 2em;
	margin-bottom: 1em;
	color: red;
`;


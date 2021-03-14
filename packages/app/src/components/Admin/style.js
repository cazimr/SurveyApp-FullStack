import {Avatar} from 'antd';
import styled from 'styled-components';
import { UserOutlined } from "@ant-design/icons";

export const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 2em 1em 2em 1em;
`;

export const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.3em 1em 0 1em;

`;

export const StyledAvatar = styled(Avatar)`
	background-color: ${({ theme }) => theme.colors.primary};
	color: white;
	width: 4em;
	height: 4em;
`;

export const StyledTitle = styled.h2`
    color: ${({ theme }) => theme.colors.titlePrimary};
`

export const StyledSubTitle = styled.h3`
    display:flex;
    margin-top: -0.8em;
    color: ${({ theme }) => theme.colors.titlePrimary};

`

export const LargeIcon = styled(UserOutlined)`

    padding-top: 0.6em;
    padding-left: 0.05em;
    font-size: 1.7em;
`
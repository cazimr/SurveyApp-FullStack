import styled from 'styled-components';

export const AdminContainer = styled.div`
    display:flex;
    width:100%;
    flex-direction:row;
    justify-content: space-between;

`;

export const StyledPageTitle = styled.h1`
    margin-top: 1.5em;
    color: ${({ theme }) => theme.colors.titlePrimary}
`
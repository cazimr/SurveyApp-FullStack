import React from 'react'
import Header from '../Header';
import {CenteredContainer} from './style'

function Layout({children}) {
    return (
        <>
        <Header/>
        <CenteredContainer>
            {children}
        </CenteredContainer>
        </>
    )
}

export default Layout

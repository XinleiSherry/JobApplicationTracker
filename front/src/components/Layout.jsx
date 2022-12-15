import React from 'react'
import { Box } from '@chakra-ui/react';
import Header from './Header';
function Layout({ children }) {
    return <Box backgroundColor={'#ffe9f1'}>
        <Header />
        <Box p='14px'>
            {
                children
            }
        </Box>
    </Box>
}

export default Layout

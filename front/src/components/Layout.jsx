import React from 'react'
import { Box } from '@chakra-ui/react';
import Header from './Header';
function Layout({ children }) {
    return <Box>
        <Header />
        <Box p='14px'>
            {
                children
            }
        </Box>
    </Box>
}

export default Layout

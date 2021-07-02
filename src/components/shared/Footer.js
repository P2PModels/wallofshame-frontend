import React from 'react'
import Link from '@material-ui/core/Link'
import { Box, Typography } from '@material-ui/core'

export default function Footer() {
    return (
        <Box pt={4}>
            <Copyleft />
        </Box>
    )
}

function Copyleft() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyleft | '}
            <Link color="inherit" href="https://p2pmodels.eu/">
                P2PModels
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

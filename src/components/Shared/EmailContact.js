import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Box } from '@material-ui/core'
import Markunread from '@mui/icons-material/Markunread'

const useStyles = makeStyles(theme => ({
    anchor: { display: 'inline-block' },
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        display: 'inline-block',
        marginRight: '1rem',
        height: '3rem !important',
        width: '3rem !important',
    },
    caption: {
        fontSize: '1.25rem',
        display: 'inline-block',
        color: theme.palette.text.main,
        textDecoration: 'underline',
    },
}))

export default function EmailContact(props) {
    const classes = useStyles()
    const { label, email, ...other } = props
    return (
        <a href={`mailto:${email}`} className={classes.anchor} {...other}>
            <Box className={classes.container}>
                <Markunread className={classes.icon} color="info" />
                <Typography variant="body1" className={classes.caption}>
                    {label}
                </Typography>
            </Box>
        </a>
    )
}

import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Box } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    anchor: { display: 'inline-block' },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    imgContainer: {
        marginBottom: '1rem',
        height: '8rem',
        width: '100%',
    },
    img: {
        objectFit: 'contain',
        height: '10rem',
        width: '10rem',
        padding: '1rem 0 2rem',
    },
    caption: {
        fontSize: '1.25rem',
        display: 'inline-block',
        color: theme.palette.text.main,
        textDecoration: 'underline',
    },
}))

export default function EntityContact(props) {
    const classes = useStyles()
    const { src, label, url, className: styleClass, ...other } = props
    return (
        <a href={url} className={clsx(classes.anchor, styleClass)} {...other}>
            <Box className={classes.container}>
                <Box className={classes.imgContainer}>
                    <img className={classes.img} src={src} />
                </Box>
                <Typography variant="body1" className={classes.caption}>
                    {label}
                </Typography>
            </Box>
        </a>
    )
}

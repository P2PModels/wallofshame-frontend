import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Box } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    caption: {
        fontSize: '1rem',
        display: 'inline-block',
    },
    value: {
        fontSize: '4rem',
        display: 'inline-block',
        color: theme.palette.primary.main,
        marginRight: '0.5rem',
    },
    container: {
        maxWidth: '6rem',
        marginRight: '2rem',
        color: theme.palette.primary.main,
    },
}))

export default function DisplayValue(props) {
    const classes = useStyles()
    const { value, caption } = props
    return (
        <>
            <Typography variant="body1" className={classes.value}>
                {value}
            </Typography>
            <Box className={classes.container}>
                <Typography variant="body1" className={classes.caption}>
                    {caption}
                </Typography>
            </Box>
        </>
    )
}

import React from 'react'
import { TextField, InputLabel, makeStyles, useTheme } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    field: {
        margin: `${theme.spacing(1)}px 0`,
    },
    label: {
        color: theme.palette.text.main,
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
    },
}))

export default function Input(props) {
    const theme = useTheme()
    const classes = useStyles()

    const { label, labelTitle, className, required, ...other } = props

    const onFieldFocus = e => {
        const label = e.target.parentNode.parentNode.parentNode.childNodes[0]
        label.style.color = theme.palette.primary.main
    }

    const onFieldBlur = e => {
        const label = e.target.parentNode.parentNode.parentNode.childNodes[0]
        label.style.color = theme.palette.text.primary
    }

    return (
        <div className={className}>
            {labelTitle ? (
                required ? (
                    <InputLabel className={classes.label}>{label}*</InputLabel>
                ) : (
                    <InputLabel className={classes.label}>{label}</InputLabel>
                )
            ) : null}
            <TextField
                variant="outlined"
                label={label}
                className={classes.field}
                onFocus={onFieldFocus}
                onBlur={onFieldBlur}
                {...other}
            />
        </div>
    )
}

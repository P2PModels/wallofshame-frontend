import React from 'react'
import { makeStyles } from '@material-ui/core'
import { TextField } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        margin: `${theme.spacing(1)}px 0`,
    },
}))

export default function Input(props) {
    const classes = useStyles()

    const { value, name, label, onChange, type, ...other } = props

    return (
        <TextField
            variant="outlined"
            name={name}
            label={label}
            type={type}
            value={value}
            onChange={onChange}
            className={classes.root}
            {...other}
        />
    )
}

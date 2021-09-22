import React from 'react'
import { TextField } from '@material-ui/core'

export default function Input(props) {

    const { value, name, label, onChange, ...other } = props

    return (
        <TextField
            variant="outlined"
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            {...other}
        />
    )
}

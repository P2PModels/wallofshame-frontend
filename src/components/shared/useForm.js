import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'

export function useForm(initialFValues) {
    const [values, setValues] = useState(initialFValues)

    const handleInputChange = e => {
        const { name, value } = e.target

        setValues({
            ...values,
            [name]: value,
        })
    }

    const submit = (queryFcn, payload) => e => {
        e.preventDefault()
        // Triger mutation
        queryFcn(payload)
    }

    return {
        values,
        setValues,
        handleInputChange,
        submit,
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            margin: `${theme.spacing(1)}px 0`,
        },
    },
}))

export function Form(props) {
    const classes = useStyles()

    return (
        <form className={classes.root} onSubmit={props.onSubmit}>
            {props.children}
        </form>
    )
}

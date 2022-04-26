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

    const submit = (e, queryFcn, payload) => e => {
        e.preventDefault()
        // Triger mutation
        try {
            queryFcn(payload)
        } catch (err) {
            console.log(err)
        }
    }

    return {
        values,
        setValues,
        handleInputChange,
        submit,
    }
}

export function Form(props) {
    const { onSubmit, children, ...other } = props
    return (
        <form onSubmit={onSubmit} {...other}>
            {children}
        </form>
    )
}

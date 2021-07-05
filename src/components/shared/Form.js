import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'

// Custom hook
export function useForm(initialFValues) {
    const [values, setValues] = useState(initialFValues)

    const handleInputChange = e => {
        const { name, value } = e.target

        setValues({
            ...values,
            [name]: value,
        })
    }

    return {
        values,
        handleInputChange,
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

    return <form className={classes.root}>{props.children}</form>
}

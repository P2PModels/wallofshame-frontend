import React from 'react'
import {
    FormControl,
    FormLabel,
    RadioGroup as MuiRadioGroup,
    FormControlLabel,
    makeStyles,
} from '@material-ui/core'
import { Radio } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        margin: `${theme.spacing(1)}px 0`,
    },
    label: {
        color: theme.palette.text.main,
        fontWeight: 'bold',
    },
}))

function RadioGroup(props) {
    const classes = useStyles()

    const {
        label,
        name,
        value,
        onChange,
        items,
        labelTitle,
        required,
        ...other
    } = props

    return (
        <FormControl {...other}>
            {labelTitle ? (
                required ? (
                    <FormLabel className={classes.label}>{label}*</FormLabel>
                ) : (
                    <FormLabel className={classes.label}>{label}</FormLabel>
                )
            ) : null}
            <MuiRadioGroup row name={name} value={value} onChange={onChange}>
                {items.map((item, i) => (
                    <FormControlLabel
                        value={item.value}
                        label={item.label}
                        control={<Radio />}
                        key={i}
                    />
                ))}
            </MuiRadioGroup>
        </FormControl>
    )
}

export default RadioGroup

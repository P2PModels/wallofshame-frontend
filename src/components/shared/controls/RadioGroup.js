import React from 'react'
import PropTypes from 'prop-types'
import {
    FormControl,
    FormLabel,
    RadioGroup as MuiRadioGroup,
    FormControlLabel,
    Radio,
} from '@material-ui/core'

function RadioGroup(props) {
    const { label, name, value, onChange, items, ...other } = props

    return (
        <FormControl {...other}>
            <FormLabel>{label}</FormLabel>
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

RadioGroup.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    item: PropTypes.array,
}

export default RadioGroup

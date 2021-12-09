import {
    FormControl,
    InputLabel,
    Select as MuiSelect,
    MenuItem,
} from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

function Select(props) {

    const { name, label, value, onChange, options, ...other } = props

    return (
        <FormControl variant="outlined" {...other}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                name={name}
                label={label}
                value={value}
                onChange={onChange}
            >
                <MenuItem value="">None</MenuItem>
                {options.map((opt, i) => (
                    <MenuItem key={i} value={opt.value}>
                        {opt.label}
                    </MenuItem>
                ))}
            </MuiSelect>
        </FormControl>
    )
}

Select.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.array
}

export default Select

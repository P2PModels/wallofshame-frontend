import React from 'react'
import PropTypes from 'prop-types'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

function DatePicker(props) {

    const { name, label, value, onChange, ...other } = props

    const converToDefEventParam = (name, value) => ({
        target: {
            name, 
            value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                format="dd/mm/yyyy"
                margin="normal"
                name={name}
                label={label}
                value={value}
                onChange={date => onChange(converToDefEventParam(name, date))}
                {...other}
            />
        </MuiPickersUtilsProvider>
    )
}

DatePicker.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
}

export default DatePicker


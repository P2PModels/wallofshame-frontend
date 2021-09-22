import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@material-ui/core'

function CheckboxGroup(props) {

    const { label, onChange, options} = props

    const converToDefEventParam = (name, value) => ({
        target: {
            name, 
            value
        }
    })

    return (
        <div>
            <FormControl component="fieldset" variant="outlined">
                <FormLabel component="legend">{label}</FormLabel>
                <FormGroup>
                    {options.map( (opt, i) => (
                            <FormControlLabel
                                control={ <Checkbox name={opt.name} value={opt.value} onChange={e => onChange(converToDefEventParam(name, e.target.checked))} />}
                                label={opt.label}
                                key={i}
                            />
                    ))}
                </FormGroup>
            </FormControl>
        </div>
    )
}

CheckboxGroup.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.array
}

export default CheckboxGroup


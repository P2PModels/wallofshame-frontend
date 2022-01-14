import React from 'react'
import PropTypes from 'prop-types'
import {
    Checkbox as MuiCheckbox,
    FormControl,
    Typography,
    makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        flexDirection: 'row',
        '&  p': {
            alignItems: 'center',
            display: 'flex',
        },
    },
}))

function Checkbox(props) {
    const classes = useStyles()

    const { name, checked, msg, onChange, className, ...other } = props

    const converToDefEventParam = (name, value) => ({
        target: {
            name,
            value,
        },
    })

    return (
        <div className={className}>
            <FormControl
                component="fieldset"
                variant="outlined"
                className={classes.root}
                {...other}
            >
                <MuiCheckbox
                    name={name}
                    checked={checked}
                    onChange={e =>
                        onChange(converToDefEventParam(name, e.target.checked))
                    }
                />
                <Typography>{msg}</Typography>
            </FormControl>
        </div>
    )
}

Checkbox.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func,
}

export default Checkbox

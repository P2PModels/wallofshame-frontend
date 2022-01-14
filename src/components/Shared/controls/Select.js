import React from 'react'
import PropTypes from 'prop-types'
import {
    FormControl,
    InputLabel,
    Select as MuiSelect,
    MenuItem,
    makeStyles,
    useTheme,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    field: {
        margin: `${theme.spacing(1)}px 0`,
        width: '100%',
    },
    label: {
        color: theme.palette.text.main,
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
    },
}))

function Select(props) {
    const classes = useStyles()
    const theme = useTheme()

    const {
        name,
        label,
        labelTitle,
        value,
        onChange,
        options,
        className,
        required,
        ...other
    } = props

    const onOpenSelect = e => {
        const label = document.querySelectorAll(`#${name}-select-label`)[0]
        label.style.color = theme.palette.primary.main
    }

    const onCloseSelect = e => {
        const label = document.querySelectorAll(`#${name}-select-label`)[0]
        label.style.color = theme.palette.text.primary
    }

    return (
        <div className={className}>
            {labelTitle ? (
                required ? (
                    <InputLabel
                        id={`${name}-select-label`}
                        className={classes.label}
                    >
                        {label}*
                    </InputLabel>
                ) : (
                    <InputLabel
                        id={`${name}-select-label`}
                        className={classes.label}
                    >
                        {label}
                    </InputLabel>
                )
            ) : null}

            <FormControl
                variant="outlined"
                className={classes.field}
                {...other}
            >
                <InputLabel>{label}</InputLabel>
                <MuiSelect
                    name={name}
                    label={label}
                    value={value}
                    onChange={onChange}
                    onOpen={onOpenSelect}
                    onClose={onCloseSelect}
                >
                    <MenuItem value="">None</MenuItem>
                    {options.map((opt, i) => (
                        <MenuItem key={i} value={opt.value}>
                            {opt.label}
                        </MenuItem>
                    ))}
                </MuiSelect>
            </FormControl>
        </div>
    )
}

Select.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.array,
}

export default Select

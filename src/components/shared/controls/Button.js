import React from 'react'
import PropTypes from 'prop-types'
import { Button as MuiButton } from '@material-ui/core'

function Button(props) {

    const { text, size, color, variant, onClick, ...other } = props

    return (
        <MuiButton
            size={size||"large"}
            color={color||"primary"}
            variant={variant||"contained"}
            onClick={onClick}
            {...other}
        >
            {text}
        </MuiButton>
    )
}

Button.propTypes = {
    text: PropTypes.string,
    size: PropTypes.string,
    color: PropTypes.string,
    variant: PropTypes.string,
    onClick: PropTypes.func, 
    other: PropTypes.object
}

export default Button


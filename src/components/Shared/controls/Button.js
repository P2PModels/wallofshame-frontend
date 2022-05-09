import React from 'react'
import PropTypes from 'prop-types'
import { Button as MuiButton } from '@material-ui/core'
import { steps } from "../../Steps";
import Joyride from "react-joyride";

function Button(props) {

    const { text, size, color, variant, onClick, ...other } = props

    if(text == 'INFORMA SOBRE TU CASO'){
        return (
            <span className = "report">
                <MuiButton
                    size={size||"large"}
                    color={color||"primary"}
                    variant={variant||"contained"}
                    onClick={onClick}
                    {...other}
                >
                    <div>
                        {text}
                    </div>
                </MuiButton>
            </span>
        )
    }

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

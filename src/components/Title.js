import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

export default function Title(props) {
    const { component, variant, color, gutterBottom, type, ...other } = props

    return (
        <Typography
            component={component ? component : variant || 'h2'}
            variant={variant ? variant : component || 'h2'}
            color={color || 'primary'}
            gutterBottom={gutterBottom || false}
            {...other}
        >
            {props.children}
        </Typography>
    )
}

Title.propTypes = {
    children: PropTypes.node,
}

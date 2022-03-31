import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Typography,
    IconButton,
    DialogTitle as MuiDialogTitle,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
        paddingLeft: 0,
        position: 'sticky',
        top: 0,
          
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1.5),
        color: theme.palette.grey[500],
    },
}))

const ModalTitle = props => {
    const { root, closeButton } = useStyles()
    const { children, onClose, ...other } = props
    return (
        <MuiDialogTitle disableTypography className={root} {...other}>
            <Typography variant="h3">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    )
}

export default ModalTitle

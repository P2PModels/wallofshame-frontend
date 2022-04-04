import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Typography,
    IconButton,
    DialogTitle as MuiDialogTitle,
    Grid
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(3),
        paddingLeft: 0,
        position: 'sticky',
        top: 0,     
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: 0,
        color: theme.palette.grey[500],
    },
    container: {
        position: 'absolute',
        top: '0rem',
        left: '0rem',
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: '0px',
        padding: '2.5rem',
    },
}))

const ModalTitle = props => {
    const { root, closeButton, container } = useStyles()
    const { children, onClose, ...other } = props
    return (
        <MuiDialogTitle disableTypography className={root} {...other}>
            <Grid  className = {container}>
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
            </Grid>
        </MuiDialogTitle>
    )
}

export default ModalTitle

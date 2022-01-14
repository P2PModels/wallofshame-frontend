import { React, useState } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@material-ui/core'

function InfoDialog(props) {
    const { open, title, contentText, closeButtonText, onClose } = props
    // const [open, setOpen] = useState(true)

    const handleClose = cb => {
        cb()
        // setOpen(false)
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            // onClose={handleClose(onClose)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {contentText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" autoFocus>
                    {/* <Button onClick={handleClose} color="primary" autoFocus> */}
                    {closeButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default InfoDialog

import { React, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'

function InfoDialog(props) {

    const { title, contentText, closeButtonText} = props
    const [open, setOpen] = useState(true)
  
    const handleClose = () => {
      setOpen(false);
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
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
                <Button onClick={handleClose} color="primary" autoFocus>
                    {closeButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default InfoDialog

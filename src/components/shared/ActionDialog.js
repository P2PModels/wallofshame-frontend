import { React, useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Typography, IconButton, Dialog, DialogTitle as MuiDialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });
  
  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

function ActionDialog(props) {
  
  const { title, contentText, primaryActionButton, primaryActionHandler, secondaryActionButton, secondaryActionHandler, closeHandler} = props

  const [open, setOpen] = useState(true)
  
  const handleClose = () => {
    setOpen(false)
  }
  
  useEffect(() => {
    setOpen(true)
  })
  
  return (
      <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
          <DialogTitle id="alert-dialog-title" onClose={closeHandler}>{title}</DialogTitle>
          <DialogContent>
              <DialogContentText id="alert-dialog-description">
                  {contentText}
              </DialogContentText>
          </DialogContent>
          <DialogActions>
              <Button onClick={secondaryActionHandler} color="secondary" autoFocus>
                  {secondaryActionButton}
              </Button>
              <Button onClick={primaryActionHandler} color="primary" autoFocus>
                  {primaryActionButton}
              </Button>
          </DialogActions>
      </Dialog>
  )
}

export default ActionDialog

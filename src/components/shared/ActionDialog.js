import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, IconButton, Dialog, DialogTitle as MuiDialogTitle, DialogContent, DialogContentText, DialogActions, Button, Slide } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    dialogContent: {
      padding: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px`,
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1.5),
      color: theme.palette.grey[500],
    },
}))

  
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide {...props} direction="down" timeout={500} ref={ref} />
})

const DialogTitle = ((props) => {
    const { root, closeButton } = useStyles()
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
});

function ActionDialog(props) {
  const { dialogContent } = useStyles()
  
  const { 
    open,
    title, 
    contentText = false, 
    content = false, 
    primaryActionButton = false, 
    primaryActionHandler = undefined, 
    secondaryActionButton = false, 
    secondaryActionHandler  = undefined , 
    onClose } = props
  
  return (
      <Dialog
          open={open}
          onClose={onClose}
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableScrollLock={ true }
      >
          <DialogTitle id="alert-dialog-title" onClose={onClose}>{title}</DialogTitle>
          <DialogContent className={dialogContent}>
              {!contentText && content ?
                  content 
                  : 
                  <DialogContentText id="alert-dialog-description">
                      {(contentText && !content ? contentText : "Default text")}
                  </DialogContentText>   
              }
          </DialogContent>
          { primaryActionButton || secondaryActionButton ?
            <DialogActions>
                { secondaryActionButton ? 
                    <Button onClick={secondaryActionHandler} color="secondary" autoFocus>
                        {secondaryActionButton}
                    </Button>
                    : '' 
                }
                { primaryActionButton ?
                  <Button onClick={primaryActionHandler} color="primary" autoFocus>
                      {primaryActionButton}
                  </Button>
                  : '' 
                }
            </DialogActions>
            : ''
          }
      </Dialog>
  )
}

export default ActionDialog

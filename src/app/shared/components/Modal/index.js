import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Dialog } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = {
    root: {
      borderBottom: `1px solid rgba(0,0,0,0.12)`,
      margin: 0,
      padding: 16,
    },
    closeButton: {
      position: 'absolute',
      right: 4,
      top: 4,
      color: 'gray',
    },
  };
  const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

const DialogContent = withStyles({
    root: {
      margin: 0,
      padding: 16,
    },
})(MuiDialogContent);

const Modal = ({modalVisible, onHandleModalVisible,modalTitle, children, fullWidth, maxWidth}) => {
    return (
        <Dialog open={ modalVisible }
                onClose = {onHandleModalVisible}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                aria-labelledby = "customized-dialog-title"
        >
            <DialogTitle id="customized-dialog-title" onClose={onHandleModalVisible}>
                {modalTitle}     
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
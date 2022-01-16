import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';

export default function YesNoDialog({ children, content=null, onClickNo=null, onClickYes=null, title=null }) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickYes = () => {
    setOpen(false);
    {onClickYes ? onClickYes() : null}
  };

  const handleClickNo = () => {
    setOpen(false);
    {onClickNo ? onClickNo() : null}
  };

  return (
    <div>
      <div onClick={handleClickOpen}>
        {children}
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickYes} color="primary" autoFocus>
            Yes
          </Button>
          <Button onClick={handleClickNo} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
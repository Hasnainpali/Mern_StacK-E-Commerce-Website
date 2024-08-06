import * as React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export default function AlertBox({ open, error, msg, handleClose,autoHideDuration }) {
    
  return (
    <Snackbar
    open={open}
    autoHideDuration={5000}
    onClose={handleClose}
  >
    <Alert
      onClose={handleClose}
      severity={error === false ? "success" : "error"}
      variant="filled"
      sx={{ width: "100%" }}
    >
      {msg}
    </Alert>
  </Snackbar>
  );
}

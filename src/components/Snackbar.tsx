import React from 'react';
import { Snackbar } from '@mui/material';

const SnackbarContainer = ({
  isOpen,
  message,
}: {
  isOpen: boolean;
  message: string;
}) => {
  return (
    <Snackbar
      open={isOpen}
      message={message}
      // onClose={handleClose}
      // action={action}
    />
  );
};

export default SnackbarContainer;

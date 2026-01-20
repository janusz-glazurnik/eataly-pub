import React from 'react';
import { Fab, Zoom, useScrollTrigger } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const AddExpenseButton = ({
  setModalOpen,
}: {
  setModalOpen: (state: boolean) => void;
}) => {
  const trigger = useScrollTrigger();

  return (
    <Zoom in={!trigger}>
      <Fab
        color="primary"
        aria-label="add expense"
        onClick={() => setModalOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: '0 6px 25px rgba(0,0,0,0.3)',
          },
          transition: 'transform 0.2s, box-shadow 0.2s',
          zIndex: 1000,
        }}
      >
        <AddIcon />
      </Fab>
    </Zoom>
  );
};

export default AddExpenseButton;

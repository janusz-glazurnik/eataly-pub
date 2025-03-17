import React from 'react';
import './ExpenseModal.scss';
import { Button } from '@mui/material';

const AddExpenseButton = ({
  setModalOpen,
}: {
  setModalOpen: (state: boolean) => void;
}) => {
  return (
    <Button
      className="add-expense-button"
      variant="contained"
      onClick={() => setModalOpen(true)}
    >
      Add Expense
    </Button>
  );
};

export default AddExpenseButton;

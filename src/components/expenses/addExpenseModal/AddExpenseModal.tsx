import React, { useState } from 'react';
import { useAddExpense } from '../../../hooks/expenses/useAddExpense';
import { useUsers } from '../../../hooks/expenses/useUsers';
import Select from 'react-select';
import { Button } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const ExpenseModal = ({
  isOpen,
  closeModal,
  setSnackbar,
  snackbarMessage,
}: {
  isOpen: boolean;
  closeModal: () => void;
  setSnackbar: (bool: boolean) => void;
  snackbarMessage: (message: string) => void;
}) => {
  if (!isOpen) return null;

  const { mutate, isPending, isError, error, isSuccess } = useAddExpense();
  const { data } = useUsers();

  if (!data) {
    return <div>loading</div>;
  }

  // Default state
  const [form, setForm] = useState({
    currency: 'EUR',
    amount: 0,
    description: 'just a random description',
    payer: '',
    evenSplit: true,
    participants: ['p1', 'p2', 'p3', 'p4'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.currency || !form.amount) return;

    mutate(
      {
        // currency: form.currency.toUpperCase() as Currency,
        currency: 'EUR',
        amount: form.amount,
        description: form.description,
        payer: form.payer,
        evenSplit: true,
        participants: form.participants,
      },
      {
        onSuccess: () => {
          // TODO TG Add form reset because it remembers previous state and do not update correctly on UI
          // setForm({ currency: '', amount: 0 });
          snackbarMessage('Expense successfully added');
          setSnackbar(true);
          closeModal();
        },
      }
    );
  };

  const usersSelect = data?.users.map((user) => {
    return {
      value: user.id,
      label: user.name,
    };
  });

  return (
    <div className="add-expense-modal fixed inset-0 flex justify-center items-center z-50">
      <div className="add-expense-modal-content bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Add Expense</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Amount:</label>
            <input
              type="number"
              className="border border-gray-300 p-2 w-full rounded-md"
              placeholder="100"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, amount: Number(e.target.value) }))
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              className="border border-gray-300 p-2 w-full rounded-md"
              placeholder="Add your description"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Payer</label>
            <Select
              options={usersSelect}
              onChange={(e) => setForm((prev) => ({ ...prev, payer: e.value }))}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Participants</label>
            <Select
              closeMenuOnSelect={false}
              defaultValue={usersSelect}
              isMulti
              options={usersSelect}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  participants: e.map((e) => e.value),
                }))
              }
            />
          </div>

          <Button
            className="add-expense-button"
            variant="contained"
            type="submit"
          >
            Add Expense
          </Button>
        </form>
        <HighlightOffIcon className="close-button" onClick={closeModal} />
      </div>
    </div>
  );
};

export default ExpenseModal;

import React, { useState, useEffect } from 'react';
import { useAddExpense } from '../../../hooks/expenses/useAddExpense';
import { useUsers } from '../../../hooks/expenses/useUsers';
import Select from 'react-select';
import {
  Button,
  Box,
  Typography,
  Modal,
  TextField,
  Paper,
  IconButton,
  Link,
} from '@mui/material';
import {
  Close as CloseIcon,
  Euro as EuroIcon,
  Description as DescriptionIcon,
  Person as PersonIcon,
  Group as GroupIcon,
} from '@mui/icons-material';

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
  const { mutate, isPending } = useAddExpense();
  const { data } = useUsers();

  const activeUsers =
    data?.users.filter((user) => user.status === 'active') || [];
  const activeUserIds = activeUsers.map((u) => u.id);

  const [form, setForm] = useState({
    currency: 'EUR',
    amount: 0,
    description: '',
    payer: '',
    evenSplit: true,
    participants: [] as string[],
  });

  // Set default participants to all active users and default payer when data is loaded
  useEffect(() => {
    if (activeUserIds.length > 0) {
      if (form.participants.length === 0) {
        setForm((prev) => ({
          ...prev,
          participants: activeUserIds,
        }));
      }
      if (!form.payer) {
        setForm((prev) => ({
          ...prev,
          payer: activeUserIds[0], // Simulating first user as logged in
        }));
      }
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.currency ||
      form.amount <= 0 ||
      !form.payer ||
      form.participants.length === 0
    ) {
      alert(
        'Please fill all required fields and ensure amount is greater than 0'
      );
      return;
    }

    mutate(
      {
        currency: 'EUR',
        amount: form.amount,
        description: form.description || 'No description',
        payer: form.payer,
        evenSplit: true,
        participants: form.participants,
      },
      {
        onSuccess: () => {
          setForm({
            currency: 'EUR',
            amount: 0,
            description: '',
            payer: activeUserIds[0], // Reset to default payer
            evenSplit: true,
            participants: activeUserIds,
          });
          snackbarMessage('Expense successfully added');
          setSnackbar(true);
          closeModal();
        },
      }
    );
  };

  const usersSelect = activeUsers.map((user) => ({
    value: user.id,
    label: user.name,
  }));

  const handleSelectAll = (e: React.MouseEvent) => {
    e.preventDefault();
    setForm((prev) => ({ ...prev, participants: activeUserIds }));
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.preventDefault();
    setForm((prev) => ({ ...prev, participants: [] }));
  };

  return (
    <Modal open={isOpen} onClose={closeModal} closeAfterTransition>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 450 },
          bgcolor: 'background.paper',
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
          outline: 'none',
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5" fontWeight="800" color="primary">
            Add Expense
          </Typography>
          <IconButton onClick={closeModal} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <TextField
              fullWidth
              label="Amount"
              type="number"
              variant="outlined"
              placeholder="0.00"
              value={form.amount || ''}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, amount: Number(e.target.value) }))
              }
              InputProps={{
                startAdornment: (
                  <EuroIcon sx={{ mr: 1, color: 'text.secondary' }} />
                ),
              }}
              required
            />
          </Box>

          <Box mb={3}>
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              placeholder="What was it for?"
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
              InputProps={{
                startAdornment: (
                  <DescriptionIcon sx={{ mr: 1, color: 'text.secondary' }} />
                ),
              }}
            />
          </Box>

          <Box mb={3}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              gutterBottom
              display="flex"
              alignItems="center"
            >
              <PersonIcon sx={{ fontSize: 18, mr: 0.5 }} /> Payer
            </Typography>
            <Select
              options={usersSelect}
              value={
                usersSelect?.find((option) => option.value === form.payer) ||
                null
              }
              onChange={(e) =>
                setForm((prev) => ({ ...prev, payer: e?.value || '' }))
              }
              styles={{
                control: (base) => ({
                  ...base,
                  borderRadius: '8px',
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                  padding: '2px',
                  '&:hover': {
                    borderColor: 'rgba(0, 0, 0, 0.87)',
                  },
                }),
              }}
            />
          </Box>

          <Box mb={4}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography
                variant="subtitle2"
                color="text.secondary"
                display="flex"
                alignItems="center"
              >
                <GroupIcon sx={{ fontSize: 18, mr: 0.5 }} /> Participants
              </Typography>
              <Box>
                <Link
                  component="button"
                  variant="caption"
                  onClick={handleSelectAll}
                  sx={{ mr: 1, textDecoration: 'none' }}
                >
                  Select All
                </Link>
                <Link
                  component="button"
                  variant="caption"
                  onClick={handleClearAll}
                  sx={{ textDecoration: 'none', color: 'error.main' }}
                >
                  Clear All
                </Link>
              </Box>
            </Box>
            <Select
              closeMenuOnSelect={false}
              isMulti
              options={usersSelect}
              value={usersSelect?.filter((option) =>
                form.participants.includes(option.value)
              )}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  participants: e ? e.map((opt) => opt.value) : [],
                }))
              }
              styles={{
                control: (base) => ({
                  ...base,
                  borderRadius: '8px',
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                  padding: '2px',
                  '&:hover': {
                    borderColor: 'rgba(0, 0, 0, 0.87)',
                  },
                }),
              }}
            />
          </Box>

          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={isPending}
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a72d8 0%, #6b4391 100%)',
              },
            }}
          >
            {isPending ? 'Adding...' : 'Add Expense'}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ExpenseModal;

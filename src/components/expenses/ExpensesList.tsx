import React from 'react';
import { ExpenseType } from '../../hooks/expenses/useExpenses';
import { getSummaryExpense } from '../../utils/expensesListUtils';
import ExpenseCard from './ExpenseCard';
import { UserType } from '../../hooks/expenses/useUsers';
import { Typography, Box, Container, Paper } from '@mui/material';
import { ReceiptLong as ReceiptIcon } from '@mui/icons-material';

const ExpensesList = ({
  expenses,
  users,
}: {
  expenses: ExpenseType[];
  users: UserType[];
}) => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box display="flex" alignItems="center">
          <ReceiptIcon sx={{ fontSize: 40, mr: 2, opacity: 0.8 }} />
          <Box>
            <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 500 }}>
              Total Expenses
            </Typography>
            <Typography variant="h4" fontWeight="800">
              {getSummaryExpense(expenses).toFixed(2)} EUR
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ opacity: 0.8, textAlign: 'right' }}>
          {expenses.length} transactions
        </Typography>
      </Paper>

      <Box>
        {expenses.length === 0 ? (
          <Typography
            variant="body1"
            textAlign="center"
            color="text.secondary"
            sx={{ mt: 4 }}
          >
            No expenses found. Add your first expense!
          </Typography>
        ) : (
          expenses
            .slice()
            .sort(
              (a, b) =>
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime()
            )
            .map((expense) => (
              <ExpenseCard key={expense.id} expense={expense} users={users} />
            ))
        )}
      </Box>
    </Container>
  );
};

export default ExpensesList;

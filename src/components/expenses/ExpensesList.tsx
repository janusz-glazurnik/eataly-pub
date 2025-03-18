import React from 'react';
import { ExpenseType } from '../../hooks/expenses/useExpenses';
import { getSummaryExpense } from '../../utils/expensesListUtils';
import ExpenseCard from './ExpenseCard';
import { UserType } from '../../hooks/expenses/useUsers';
import { Typography } from '@mui/material';

const ExpensesList = ({
  expenses,
  users,
}: {
  expenses: ExpenseType[];
  users: UserType[];
}) => {
  return (
    <>
      <Typography variant="h3" component="h3">
        Total money spent: {getSummaryExpense(expenses)} EUR
      </Typography>

      {expenses.map((expense) => (
        <ExpenseCard key={expense.id} expense={expense} users={users} />
      ))}
    </>
  );
};

export default ExpensesList;

import React from 'react';
import { ExpenseType } from '../../hooks/expenses/useExpenses';
import { getSummaryExpense } from '../../utils/expensesListUtils';
import ExpenseCard from './ExpenseCard';
import { UserType } from '../../hooks/expenses/useUsers';

const ExpensesList = ({
  expenses,
  users,
}: {
  expenses: ExpenseType[];
  users: UserType[];
}) => {
  return (
    <div>
      <div className="pb-4">{getSummaryExpense(expenses)} EUR</div>

      {expenses.map((expense) => (
        <ExpenseCard key={expense.id} expense={expense} users={users} />
      ))}
    </div>
  );
};

export default ExpensesList;

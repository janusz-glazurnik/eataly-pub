import React from 'react';
import ExpenseCard from './ExpenseCard';
import { ExpenseType } from '../../hooks/expenses/useExpenses';
import { getSummaryExpense } from '../../utils/expensesListUtils';

const ExpensesList = ({ expenses }: { expenses: ExpenseType[] }) => {
  return (
    <div>
      <div className="pb-4">{getSummaryExpense(expenses)} EUR</div>

      {expenses.map((expense) => (
        <ExpenseCard key={expense.id} expense={expense} />
      ))}
    </div>
  );
};

export default ExpensesList;

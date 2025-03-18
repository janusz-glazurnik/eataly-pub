import React from 'react';
import ExpenseCard from './expenseCard';
import { ExpenseResponse } from '../../hooks/expenses/useExpenses';

const ExpensesList = ({ expenses }: { expenses: ExpenseResponse }) => {
  // TODO TG move it to utils
  const getSummaryExpense = () => {
    const expensesList = expenses.expenses;
    const expensesAmount = expensesList.reduce(
      (acc, cur) => acc + cur.amount,
      0
    );

    return { expensesAmount };
  };

  return (
    <div>
      <div className="pb-4">{getSummaryExpense().expensesAmount} EUR</div>

      {expenses.expenses.map((expense) => (
        <ExpenseCard key={expense.id} expense={expense} />
      ))}
    </div>
  );
};

export default ExpensesList;

import React from 'react';
import { ExpenseType } from '../../hooks/expenses/useExpenses';

const ExpenseCard = ({ expense }: { expense: ExpenseType }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">
          {expense.description}
        </h3>
        <span className="text-lg font-semibold text-blue-500">
          {expense.amount} {expense.currency}
        </span>
      </div>
      <h4 className="text-xl font-bold text-gray-800">
        payer: {expense.payer}
      </h4>
      <h3 className="text-xl font-bold text-gray-800">
        participants: {expense.participants}
      </h3>
      <div className="text-gray-600 text-sm mb-2">
        <p>ID: {expense.id}</p>
        <p>{new Date(expense.timestamp).toLocaleDateString()}</p>
      </div>
      <div className="bg-gray-100 rounded-full px-3 py-1 inline-block">
        {expense.evenSplit ? 'Even split' : 'Custom split'}
      </div>
    </div>
  );
};

export default ExpenseCard;

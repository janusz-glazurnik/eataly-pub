import { ExpenseType } from '../hooks/expenses/useExpenses';

export const getSummaryExpense = (expenses: ExpenseType[]) =>
  expenses.reduce((acc, cur) => acc + cur.amount, 0);

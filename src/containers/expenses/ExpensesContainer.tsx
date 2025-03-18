import React from 'react';
import ExpensesList from '../../components/expenses/ExpensesList';
import Loader from '../../components/loader/loader';
import Empty from '../../components/empty';
import Error from '../../components/error';
import { useGetExpenses } from '../../hooks/expenses/useExpenses';

const ExpensesContainer = () => {
  const { expenses, isLoading, error } = useGetExpenses();

  if (isLoading) {
    return <Loader />;
  }

  if (!expenses) {
    return <Empty />;
  }

  if (error) {
    return <Error errorMessage={error.message} />;
  }

  return <ExpensesList expenses={expenses} />;
};

export default ExpensesContainer;

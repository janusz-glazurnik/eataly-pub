import React from 'react';
import ExpensesList from '../../components/expenses/ExpensesList';
import Loader from '../../components/loader/loader';
import Empty from '../../components/empty';
import Error from '../../components/error';
import { useGetExpenses } from '../../hooks/expenses/useExpenses';

const ExpensesContainer = () => {
  const { data, isLoading, error } = useGetExpenses();

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <Empty />;
  }

  if (error) {
    return <Error errorMessage={error.message} />;
  }

  return <ExpensesList expenses={data} />;
};

export default ExpensesContainer;

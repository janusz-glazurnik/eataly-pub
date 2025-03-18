import React from 'react';
import ExpensesList from '../../components/expenses/ExpensesList';
import Loader from '../../components/loader/loader';
import Empty from '../../components/empty';
import Error from '../../components/error';
import { useGetExpenses } from '../../hooks/expenses/useExpenses';
import { useGetUsers } from '../../hooks/expenses/useUsers';

const ExpensesContainer = () => {
  const { expenses, isLoading, error } = useGetExpenses();
  const { users } = useGetUsers();

  if (isLoading) {
    return <Loader />;
  }

  if (!expenses || !users) {
    return <Empty />;
  }

  if (error) {
    return <Error errorMessage={error.message} />;
  }

  return <ExpensesList expenses={expenses} users={users} />;
};

export default ExpensesContainer;

import React from 'react';
import Loader from '../../components/loader/loader';
import Empty from '../../components/empty';
import Error from '../../components/error';
import UsersList from '../../components/expenses/usersList/UsersList';
import { useGetUsers } from '../../hooks/expenses/useUsers';
import { useGetExpenses } from '../../hooks/expenses/useExpenses';

const UsersContainer = () => {
  const { users, isLoading: usersIsLoading, error: usersError } = useGetUsers();

  const {
    expenses,
    isLoading: expensesIsLoading,
    error: expensesError,
  } = useGetExpenses();

  // TODO TG can be expanded to cover user and expanses empty separately
  if (!users || !expenses) {
    return <Empty />;
  }

  if (usersIsLoading || expensesIsLoading) {
    return <Loader />;
  }

  if (usersError) {
    return <Error errorMessage={usersError.message} />;
  }

  return <UsersList users={users} expenses={expenses} />;
};

export default UsersContainer;

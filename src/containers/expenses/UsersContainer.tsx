import React from 'react';
import Loader from '../../components/loader/loader';
import Empty from '../../components/empty';
import Error from '../../components/error';
import UsersList from '../../components/expenses/usersList/UsersList';
import { useGetUsers } from '../../hooks/expenses/useUsers';
import { useGetExpenses } from '../../hooks/expenses/useExpenses';

const UsersContainer = () => {
  const {
    data: usersData,
    isLoading: usersIsLoading,
    error: usersError,
  } = useGetUsers();

  const {
    data: expensesData,
    isLoading: expensesIsLoading,
    error: expensesError,
  } = useGetExpenses();

  if (!usersData || !expensesData) {
    return <Empty />;
  }

  if (usersIsLoading || expensesIsLoading) {
    return <Loader />;
  }

  if (usersError) {
    return <Error errorMessage={usersError.message} />;
  }

  return <UsersList users={usersData} expenses={expensesData} />;
};

export default UsersContainer;

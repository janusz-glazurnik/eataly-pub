import React from 'react';
import Loader from '../../components/loader/loader';
import Empty from '../../components/empty';
import Error from '../../components/error';
import { useGetExpenses } from '../../hooks/expenses/useExpenses';
import UsersList from '../../components/expenses/usersList/UsersList';

const UsersContainer = () => {
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

  return <UsersList />;
};

export default UsersContainer;

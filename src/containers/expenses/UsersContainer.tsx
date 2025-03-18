import React from 'react';
import Loader from '../../components/loader/loader';
import Empty from '../../components/empty';
import Error from '../../components/error';
import UsersList from '../../components/expenses/usersList/UsersList';
import { useGetUsers } from '../../hooks/expenses/useUsers';

const UsersContainer = () => {
  const {
    data: usersData,
    isLoading: usersIsLoading,
    error: usersError,
  } = useGetUsers();

  if (usersIsLoading) {
    return <Loader />;
  }

  if (!usersData) {
    return <Empty />;
  }

  if (usersError) {
    return <Error errorMessage={usersError.message} />;
  }

  return <UsersList users={usersData} />;
};

export default UsersContainer;

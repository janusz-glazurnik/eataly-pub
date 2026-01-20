import React from 'react';
import Loader from '../../components/loader/loader';
import Empty from '../../components/empty';
import Error from '../../components/error';
import { useGetUsers } from '../../hooks/expenses/useUsers';
import GroupsList from '../../components/expenses/groupsList/GroupsList';

const GroupsContainer = () => {
  const { users, isLoading, error, isFetching } = useGetUsers();

  // if (isLoading || isFetching) {
  //   return <Loader />;
  // }

  if (error) {
    return <Error errorMessage={error.message} />;
  }

  if (!users) {
    return <Empty />;
  }

  return <GroupsList users={users} />;
};

export default GroupsContainer;

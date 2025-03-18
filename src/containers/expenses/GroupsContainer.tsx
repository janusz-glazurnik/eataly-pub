import React from 'react';
import Loader from '../../components/loader/loader';
import Empty from '../../components/empty';
import Error from '../../components/error';
import { useGetUsers } from '../../hooks/expenses/useUsers';

const GroupsContainer = () => {
  const { data, isLoading, error } = useGetUsers();

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <Empty />;
  }

  if (error) {
    return <Error errorMessage={error.message} />;
  }

  return <div>groups placeholder</div>;
};

export default GroupsContainer;

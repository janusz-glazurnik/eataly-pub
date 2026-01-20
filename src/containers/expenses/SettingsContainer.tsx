import React from 'react';
import Loader from '../../components/loader/loader';
import Empty from '../../components/empty';
import Error from '../../components/error';
import Settings from '../../components/settings/Settings';
import { useGetUsers } from '../../hooks/expenses/useUsers';

const SettingsContainer = () => {
  const { users, isLoading, error } = useGetUsers();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error errorMessage={error.message} />;
  }

  if (!users || users.length === 0) {
    return <Empty />;
  }

  // Simulating logged in user as the first one from the list
  const loggedInUser = users[0];

  return <Settings user={loggedInUser} />;
};

export default SettingsContainer;

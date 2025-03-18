import React from 'react';
import Loader from '../../components/loader/loader';
import Empty from '../../components/empty';
import Error from '../../components/error';
import { useGetExpenses } from '../../hooks/expenses/useExpenses';

const SettingsContainer = () => {
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

  return <div>settings placeholder</div>;
};

export default SettingsContainer;

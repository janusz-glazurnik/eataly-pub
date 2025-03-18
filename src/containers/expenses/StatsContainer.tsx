import React from 'react';
import Loader from '../../components/loader/loader';
import Empty from '../../components/empty';
import Error from '../../components/error';
import { useGetExpenses } from '../../hooks/expenses/useExpenses';

const StatsContainer = () => {
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

  return <div>stats placeholder</div>;
};

export default StatsContainer;

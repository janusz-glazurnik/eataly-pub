import { useQuery } from '@tanstack/react-query';

const fetchExpenses = async () => {
  const response = await fetch('http://localhost:8080/api/expenses');
  if (!response.ok) {
    throw new Error('Error! Can not fetch expenses');
  }

  return response.json();
};

export const useExpenses = () => {
  return useQuery({
    queryKey: ['expenses'],
    queryFn: fetchExpenses,
  });
};

export const useGetExpenses = () => {
  const { data, error, isLoading } = useExpenses();

  return { data, error, isLoading };
};

import { useQuery } from '@tanstack/react-query';

export type ExpenseType = {
  id: string;
  timestamp: Date;
  payer: string;
  currency: string;
  amount: number;
  description: string;
  evenSplit: boolean;
  participants: Array<string>;
  proportions?: Array<string>;
};

export interface ExpenseResponse {
  expenses: ExpenseType[];
}

const fetchExpenses = async (): Promise<ExpenseResponse> => {
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
  const { data, error, isLoading, isFetching } = useExpenses();

  return { expenses: data?.expenses, error, isLoading, isFetching };
};

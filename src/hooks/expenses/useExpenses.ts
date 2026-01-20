import { useQuery } from '@tanstack/react-query';
import { mockExpenses } from '../../mockData';

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
  // Try to fetch from API, fallback to mock if it fails or doesn't exist
  try {
    const response = await fetch('http://localhost:8080/api/expenses');
    if (response.ok) {
      return response.json();
    }
  } catch (e) {
    console.warn('Backend not available, using mock expenses');
  }

  // Fallback to local storage or mock data
  const storedExpenses = localStorage.getItem('eataly_expenses');
  if (storedExpenses) {
    const parsed = JSON.parse(storedExpenses);
    // Convert timestamp strings back to Date objects
    const expenses = parsed.map((e: any) => ({
      ...e,
      timestamp: new Date(e.timestamp),
    }));
    return { expenses };
  }

  return { expenses: mockExpenses };
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

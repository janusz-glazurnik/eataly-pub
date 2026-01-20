import { useMutation, useQueryClient } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { mockExpenses } from '../../mockData';

interface Expense {
  amount: number;
  currency: string;
  description: string;
  evenSplit: boolean;
  participants: string[];
  payer: string;
}

interface ExpenseResponse extends Expense {
  id: string;
  timestamp: Date;
}

const addExpense = async (expense: Expense): Promise<ExpenseResponse> => {
  // Try to post to API, fallback to mock if it fails
  try {
    const response = await fetch('http://localhost:8080/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense),
    });

    if (response.ok) {
      return response.json();
    }
  } catch (e) {
    console.warn('Backend not available, saving expense locally');
  }

  // Fallback: save to localStorage
  const newExpense: ExpenseResponse = {
    ...expense,
    id: uuidv4(),
    timestamp: new Date(),
  };

  const storedExpenses = localStorage.getItem('eataly_expenses');
  let expenses = storedExpenses
    ? JSON.parse(storedExpenses)
    : [...mockExpenses];
  expenses.push(newExpense);
  localStorage.setItem('eataly_expenses', JSON.stringify(expenses));

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return newExpense;
};

export const useAddExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addExpense,
    onError: (error) => {
      console.error(error);
    },
    onSuccess: async () => {
      try {
        await queryClient.invalidateQueries({ queryKey: ['expenses'] });
      } catch (error) {
        console.error('Error invalidating queries:', error);
      }
    },
  });
};

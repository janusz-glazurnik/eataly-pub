import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Expense {
  amount: number;
  currency: string;
  description: string;
  evenSplit: boolean;
  participants: string[];
  payer: string;
}

interface ExpenseResponse extends Expense {
  timestamp: Date;
}

const addExpense = async (expense: Expense): Promise<ExpenseResponse> => {
  const response = await fetch('http://localhost:8080/api/expenses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
  });

  if (!response.ok) {
    throw new Error('Error! Can not add expense');
  }

  return response.json();
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

import { ExpenseType } from '../hooks/expenses/useExpenses';
import { UserType } from '../hooks/expenses/useUsers';

// TODO TG think about changing it to hooks
export const getAllExpensesPerUser = (id: string, data: ExpenseType[]) => {
  const allExpenses = data?.filter((expense) => expense.payer === id);

  return (
    allExpenses && allExpenses.reduce((sum, expense) => sum + expense.amount, 0)
  );
};

export const getExpensesPerParticipant = (id: string, data: ExpenseType[]) => {
  return data?.reduce((sumAmount, expense) => {
    if (expense.evenSplit) {
      const participantsLength = expense.participants.length;
      const expenseCostPerParticipant = expense.amount / participantsLength;

      if (expense.participants?.includes(id)) {
        sumAmount += expenseCostPerParticipant;
      }
    }

    // TODO TG prepare logic for proportions
    // else if (expense.proportions) {
    //   const proportion = expense.proportions[id];
    //
    //   sumAmount += expense.amount * proportion;
    // }

    return sumAmount;
  }, 0);
};

export const getSaldoPerUser = (id: string, expenses: ExpenseType[]) => {
  return (
    getAllExpensesPerUser(id, expenses) -
    getExpensesPerParticipant(id, expenses)
  );
};

export const getUserBasedOnId = (id: string, users: UserType[]) => {
  return users?.find((user) => user.id === id);
};

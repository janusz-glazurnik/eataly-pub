import React from 'react';
import { useGetUsers } from '../../../hooks/expenses/useUsers';
import { useGetExpenses } from '../../../hooks/expenses/useExpenses';
import { computeNetBalances, settleBalances } from '../../../utils/balance';
import { Avatar, Card, CardContent, Typography } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import './UsersList.scss';
import { getInitials } from '../../../utils/utils';

const UsersList: React.FC = () => {
  const {
    data: users,
    isLoading: usersIsLoading,
    error: usersError,
  } = useGetUsers();

  const { data: expenses, isLoading, error } = useGetExpenses();

  if (usersIsLoading) {
    return <div>Loading...</div>;
  }

  const getAllExpensesPerUser = (id: string) => {
    const allExpenses = expenses.expenses.filter(
      (expense) => expense.payer === id
    );
    const allExpensesSummary = allExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    return allExpensesSummary;
  };

  const getExpensesPerParticipant = (id: string) => {
    return expenses.expenses.reduce((sumAmount, expense) => {
      if (expense.evenSplit) {
        const participantsLength = expense.participants.length;
        const expenseCostPerParticipant = expense.amount / participantsLength;

        if (expense.participants?.includes(id)) {
          sumAmount += expenseCostPerParticipant;
        }
      } else if (expense.proportions) {
        const proportion = expense.proportions[id];

        sumAmount += expense.amount * proportion;
      }

      return sumAmount;
    }, 0);
  };

  const netBalances = computeNetBalances(expenses.expenses);
  const transactions = settleBalances(netBalances);

  const getUserBasedOnId = (id: string) => {
    return users.users.find((user) => user.id === id);
  };

  const calculateBalances = (userId: string) => {
    const haveAnyUnbalanced = transactions.filter(
      (transaction) => transaction.to === userId
    );

    if (haveAnyUnbalanced.length === 0) {
      return null;
    }

    return haveAnyUnbalanced.map((transaction) => (
      <span>
        {' <---'} {getUserBasedOnId(transaction.from)?.name}{' '}
        <b>{transaction.amount} EUR</b>
      </span>
    ));
  };

  return (
    <div className="users-list bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Participants</h2>

      {users?.users.map((user) => (
        <Card variant="outlined" key={user.id}>
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: 'text.secondary', fontSize: 14 }}
            >
              UserID: {user.id}
            </Typography>
            <Typography className="title-avatar" variant="h5" component="div">
              <Avatar sx={{ bgcolor: deepOrange[500] }}>
                {getInitials(user.name)}
              </Avatar>{' '}
              {user.name} {calculateBalances(user.id)}
            </Typography>
            <Typography variant="body2">
              Money spent: {getAllExpensesPerUser(user.id)} EUR
              <br />
              Should spent: {getExpensesPerParticipant(user.id)} EUR
              <br />
              Saldo:{' '}
              {getAllExpensesPerUser(user.id) -
                getExpensesPerParticipant(user.id)}{' '}
              EUR
            </Typography>

            <br />
          </CardContent>
          {/*<CardActions>*/}
          {/*  <Button size="small">Learn More</Button>*/}
          {/*</CardActions>*/}
        </Card>
      ))}
    </div>
  );
};

export default UsersList;

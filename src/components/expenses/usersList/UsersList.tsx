import React from 'react';
import { UserType } from '../../../hooks/expenses/useUsers';
import { ExpenseType } from '../../../hooks/expenses/useExpenses';
import { computeNetBalances, settleBalances } from '../../../utils/balance';
import { Avatar, Card, CardContent, Typography } from '@mui/material';
import { deepOrange, lightBlue } from '@mui/material/colors';
import './UsersList.scss';
import { getInitials } from '../../../utils/utils';
import {
  getAllExpensesPerUser,
  getExpensesPerParticipant,
  getUserBasedOnId,
} from '../../../utils/usersListUtils';

const UsersList = ({
  users,
  expenses,
}: {
  users: UserType[];
  expenses: ExpenseType[];
}) => {
  const netBalances = computeNetBalances(expenses);
  const transactions = settleBalances(netBalances);

  const calculateBalances = (userId: string) => {
    const haveAnyUnbalanced = transactions.filter(
      (transaction) => transaction.to === userId
    );

    if (haveAnyUnbalanced.length === 0) {
      return null;
    }

    // TODO TG find better key because index may cause problems
    return haveAnyUnbalanced.map((transaction, index) => (
      <span key={index}>
        {' <---'} {getUserBasedOnId(transaction.from, users)?.name}{' '}
        <b>{transaction.amount} EUR</b>
      </span>
    ));
  };

  // TODO TG maybe filter/map can be a separate component
  return (
    <div className="users-list bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Participants</h2>

      {/* TODO TG maybe prepare util/query for active users */}
      {users
        ?.filter((user) => user.status === 'active')
        .map((user) => (
          <Card variant="outlined" key={user.id}>
            <CardContent>
              <Typography
                gutterBottom
                sx={{ color: 'text.secondary', fontSize: 14 }}
              >
                UserID: {user.id}
              </Typography>
              <Typography className="title-avatar" variant="h5" component="div">
                <Avatar
                  sx={
                    user.gender === 'male'
                      ? { bgcolor: deepOrange[500] }
                      : { bgcolor: lightBlue[500] }
                  }
                >
                  {getInitials(user.name)}
                </Avatar>{' '}
                {user.name} {calculateBalances(user.id)}
              </Typography>
              <Typography variant="body2">
                Money spent: {getAllExpensesPerUser(user.id, expenses)} EUR
                <br />
                Should spent: {getExpensesPerParticipant(user.id, expenses)} EUR
                <br />
                Saldo:{' '}
                {getAllExpensesPerUser(user.id, expenses) -
                  getExpensesPerParticipant(user.id, expenses)}{' '}
                EUR
              </Typography>
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

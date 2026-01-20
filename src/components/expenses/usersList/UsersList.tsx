import React from 'react';
import { UserType } from '../../../hooks/expenses/useUsers';
import { ExpenseType } from '../../../hooks/expenses/useExpenses';
import SingleUser from './SingleUser';
import { Container, Typography, Box, Paper } from '@mui/material';
import { People as PeopleIcon } from '@mui/icons-material';

const UsersList = ({
  users,
  expenses,
}: {
  users: UserType[];
  expenses: ExpenseType[];
}) => {
  const activeUsers = users?.filter((user) => user.status === 'active') || [];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box display="flex" alignItems="center">
          <PeopleIcon sx={{ fontSize: 40, mr: 2, opacity: 0.8 }} />
          <Box>
            <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 500 }}>
              Participants
            </Typography>
            <Typography variant="h4" fontWeight="800">
              {activeUsers.length} active
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ opacity: 0.8, textAlign: 'right' }}>
          Overview of balances and settlements
        </Typography>
      </Paper>

      <Box>
        {activeUsers.map((user) => (
          <SingleUser key={user.id} user={user} expenses={expenses} />
        ))}
      </Box>
    </Container>
  );
};

export default UsersList;

import React, { useMemo } from 'react';
import Loader from '../../components/loader/loader';
import Error from '../../components/error';
import { useGetExpenses } from '../../hooks/expenses/useExpenses';
import { useGetUsers } from '../../hooks/expenses/useUsers';
import { computeNetBalances, settleBalances } from '../../utils/balance';
import { getUserBasedOnId } from '../../utils/usersListUtils';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Divider,
  Box,
  Container,
  Paper,
  Avatar,
  Tooltip,
} from '@mui/material';
import {
  Insights as StatsIcon,
  ArrowForward as ArrowIcon,
  Payments as PaymentsIcon,
} from '@mui/icons-material';
import { getInitials } from '../../utils/utils';
import { deepOrange, lightBlue } from '@mui/material/colors';

const StatsContainer = () => {
  const {
    expenses,
    isLoading: expensesLoading,
    error: expensesError,
  } = useGetExpenses();
  const { users, isLoading: usersLoading, error: usersError } = useGetUsers();

  const transactions = useMemo(() => {
    if (!expenses) return [];
    const balances = computeNetBalances(expenses);
    return settleBalances(balances);
  }, [expenses]);

  if (expensesLoading || usersLoading) {
    return <Loader />;
  }

  if (expensesError || usersError) {
    return (
      <Error
        errorMessage={expensesError?.message || usersError?.message || 'Error'}
      />
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box display="flex" alignItems="center">
          <StatsIcon sx={{ fontSize: 40, mr: 2, opacity: 0.8 }} />
          <Box>
            <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 500 }}>
              Settlement Analysis
            </Typography>
            <Typography variant="h4" fontWeight="800">
              {transactions.length} payments
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ opacity: 0.8, textAlign: 'right' }}>
          Detailed breakdown of who owes whom
        </Typography>
      </Paper>

      <Card
        sx={{
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          overflow: 'hidden',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" alignItems="center" mb={3}>
            <PaymentsIcon sx={{ color: 'primary.main', mr: 1 }} />
            <Typography variant="h5" fontWeight="700">
              Required Payments
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {transactions.length === 0 ? (
            <Box textAlign="center" py={4}>
              <Typography variant="h6" color="text.secondary">
                🎉 All settled up! No debts.
              </Typography>
            </Box>
          ) : (
            <List disablePadding>
              {transactions.map((t, index) => {
                const fromUser = getUserBasedOnId(t.from, users);
                const toUser = getUserBasedOnId(t.to, users);

                return (
                  <React.Fragment key={index}>
                    <ListItem
                      sx={{
                        px: 2,
                        py: 2,
                        borderRadius: 2,
                        '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box display="flex" alignItems="center" flex={1}>
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          sx={{ minWidth: 80 }}
                        >
                          <Tooltip title={fromUser?.name || 'Unknown'}>
                            <Avatar
                              sx={{
                                bgcolor:
                                  fromUser?.gender === 'male'
                                    ? deepOrange[500]
                                    : lightBlue[500],
                                mb: 0.5,
                              }}
                            >
                              {fromUser ? getInitials(fromUser.name) : '?'}
                            </Avatar>
                          </Tooltip>
                          <Typography
                            variant="caption"
                            fontWeight="600"
                            noWrap
                            sx={{ maxWidth: 80 }}
                          >
                            {fromUser?.name.split(' ')[0]}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            mx: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            flex: 1,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              color: 'error.main',
                              fontWeight: '800',
                              mb: 0.5,
                            }}
                          >
                            {t.amount.toFixed(2)} EUR
                          </Typography>
                          <ArrowIcon color="disabled" />
                        </Box>

                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          sx={{ minWidth: 80 }}
                        >
                          <Tooltip title={toUser?.name || 'Unknown'}>
                            <Avatar
                              sx={{
                                bgcolor:
                                  toUser?.gender === 'male'
                                    ? deepOrange[500]
                                    : lightBlue[500],
                                mb: 0.5,
                              }}
                            >
                              {toUser ? getInitials(toUser.name) : '?'}
                            </Avatar>
                          </Tooltip>
                          <Typography
                            variant="caption"
                            fontWeight="600"
                            noWrap
                            sx={{ maxWidth: 80 }}
                          >
                            {toUser?.name.split(' ')[0]}
                          </Typography>
                        </Box>
                      </Box>
                    </ListItem>
                    {index < transactions.length - 1 && (
                      <Divider variant="middle" component="li" sx={{ my: 1 }} />
                    )}
                  </React.Fragment>
                );
              })}
            </List>
          )}
        </CardContent>
      </Card>

      <Box mt={4}>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Calculations are based on all recorded expenses and their respective
          participants.
        </Typography>
      </Box>
    </Container>
  );
};

export default StatsContainer;

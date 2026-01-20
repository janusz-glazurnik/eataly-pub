import React from 'react';
import { useGetUsers, UserType } from '../../../hooks/expenses/useUsers';
import { ExpenseType } from '../../../hooks/expenses/useExpenses';
import { computeNetBalances, settleBalances } from '../../../utils/balance';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Typography,
  Box,
  Divider,
  Grid2,
  Chip,
} from '@mui/material';
import { deepOrange, lightBlue } from '@mui/material/colors';
import { getInitials } from '../../../utils/utils';
import {
  getAllExpensesPerUser,
  getExpensesPerParticipant,
  getSaldoPerUser,
  getUserBasedOnId,
} from '../../../utils/usersListUtils';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import {
  AccountBalanceWallet as WalletIcon,
  TrendingUp as ProfitIcon,
  TrendingDown as DebtIcon,
} from '@mui/icons-material';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

const SingleUser = ({
  user,
  expenses,
}: {
  user: UserType;
  expenses: ExpenseType[];
}) => {
  const { users } = useGetUsers();
  const netBalances = React.useMemo(
    () => computeNetBalances(expenses),
    [expenses]
  );
  const transactions = React.useMemo(
    () => settleBalances(netBalances),
    [netBalances]
  );
  const [expanded, setExpanded] = React.useState(false);

  const saldo = getSaldoPerUser(user.id, expenses);
  const isDebt = saldo < 0;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const calculateBalances = (userId: string) => {
    const oweToMe = transactions.filter(
      (transaction) => transaction.to === userId
    );

    const iOweTo = transactions.filter(
      (transaction) => transaction.from === userId
    );

    if (iOweTo.length > 0) {
      return (
        <Box>
          <Typography
            variant="subtitle2"
            color="error"
            gutterBottom
            fontWeight="bold"
          >
            People you need to pay back:
          </Typography>
          {iOweTo.map((transaction, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="space-between"
              sx={{ mb: 1, py: 0.5 }}
            >
              <Typography variant="body2">
                {getUserBasedOnId(transaction.to, users)?.name}
              </Typography>
              <Typography variant="body2" fontWeight="bold" color="error">
                {transaction.amount.toFixed(2)} EUR
              </Typography>
            </Box>
          ))}
        </Box>
      );
    }

    if (oweToMe.length > 0) {
      return (
        <Box>
          <Typography
            variant="subtitle2"
            color="success.main"
            gutterBottom
            fontWeight="bold"
          >
            People who owe you:
          </Typography>
          {oweToMe.map((transaction, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="space-between"
              sx={{ mb: 1, py: 0.5 }}
            >
              <Typography variant="body2">
                {getUserBasedOnId(transaction.from, users)?.name}
              </Typography>
              <Typography
                variant="body2"
                fontWeight="bold"
                color="success.main"
              >
                {transaction.amount.toFixed(2)} EUR
              </Typography>
            </Box>
          ))}
        </Box>
      );
    }

    return (
      <Typography variant="body2" color="text.secondary">
        All settled up!
      </Typography>
    );
  };

  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 3,
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        },
        borderLeft: `6px solid ${isDebt ? '#f44336' : '#4caf50'}`,
      }}
    >
      <CardContent sx={{ pb: 1 }}>
        <Grid2 container spacing={2} alignItems="center">
          <Grid2>
            <Avatar
              sx={{
                width: 56,
                height: 56,
                fontSize: '1.25rem',
                bgcolor:
                  user.gender === 'male' ? deepOrange[500] : lightBlue[500],
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
            >
              {getInitials(user.name)}
            </Avatar>
          </Grid2>
          <Grid2 size="grow">
            <Typography variant="h6" fontWeight="700">
              {user.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ID: {user.id}
            </Typography>
          </Grid2>
          <Grid2 sx={{ textAlign: 'right' }}>
            <Box display="flex" flexDirection="column" alignItems="flex-end">
              <Typography
                variant="h6"
                fontWeight="800"
                color={isDebt ? 'error' : 'success.main'}
              >
                {saldo.toFixed(2)} EUR
              </Typography>
              <Chip
                icon={isDebt ? <DebtIcon /> : <ProfitIcon />}
                label={isDebt ? 'Owes' : 'Is owed'}
                size="small"
                color={isDebt ? 'error' : 'success'}
                variant="outlined"
                sx={{ mt: 0.5, fontWeight: 600, fontSize: '0.65rem' }}
              />
            </Box>
          </Grid2>
        </Grid2>

        <Divider sx={{ my: 2, opacity: 0.6 }} />

        <Grid2 container spacing={1}>
          <Grid2 size={6}>
            <Box display="flex" alignItems="center">
              <WalletIcon
                sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }}
              />
              <Typography variant="caption" color="text.secondary">
                Spent:
              </Typography>
            </Box>
            <Typography variant="body2" fontWeight="600">
              {getAllExpensesPerUser(user.id, expenses).toFixed(2)} EUR
            </Typography>
          </Grid2>
          <Grid2 size={6} sx={{ textAlign: 'right' }}>
            <Typography variant="caption" color="text.secondary">
              Share:
            </Typography>
            <Typography variant="body2" fontWeight="600">
              {getExpensesPerParticipant(user.id, expenses).toFixed(2)} EUR
            </Typography>
          </Grid2>
        </Grid2>
      </CardContent>

      <CardActions
        disableSpacing
        sx={{
          pt: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
        }}
      >
        <Typography variant="caption" color="text.secondary" fontWeight="600">
          {isDebt ? 'Next payments' : 'Incoming payments'}
        </Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        <CardContent sx={{ bgcolor: 'rgba(0,0,0,0.01)' }}>
          {calculateBalances(user.id)}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default SingleUser;

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
} from '@mui/material';
import { deepOrange, lightBlue } from '@mui/material/colors';
import './UsersList.scss';
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
  const netBalances = computeNetBalances(expenses);
  const transactions = settleBalances(netBalances);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const calculateBalances = (userId: string) => {
    const haveAnyUnbalanced = transactions.filter(
      (transaction) => transaction.to === userId
    );

    const haveAnyDept = transactions.filter(
      (transaction) => transaction.from === userId
    );

    console.log('|-- SingleUser haveAnyUnbalanced', userId, haveAnyUnbalanced);
    console.log('|-- SingleUser haveAnyDept', userId, haveAnyDept);

    if (haveAnyDept.length > 0) {
      return (
        <>
          <Typography sx={{ marginBottom: 2 }}>
            Who should you give the money to:
          </Typography>
          {haveAnyDept.map((transaction, index) => (
            <Typography key={index} sx={{ marginBottom: 2 }}>
              {getUserBasedOnId(transaction.to, users)?.name}{' '}
              <b>{transaction.amount} EUR</b>
            </Typography>
          ))}
        </>
      );
    }

    // TODO TG find better key because index may cause problems
    return (
      <>
        <Typography sx={{ marginBottom: 2 }}>Who owes you money:</Typography>
        {haveAnyUnbalanced.map((transaction, index) => (
          <Typography key={index} sx={{ marginBottom: 2 }}>
            {getUserBasedOnId(transaction.from, users)?.name}{' '}
            <b>{transaction.amount} EUR</b>
          </Typography>
        ))}
      </>
    );
  };

  // TODO TG maybe filter/map can be a separate component
  return (
    <Card
      className={getSaldoPerUser(user.id, expenses) < 0 ? 'debt' : 'no-debt'}
      variant="outlined"
      key={user.id}
    >
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
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
          {user.name}
        </Typography>
        <Typography variant="body2">
          Money spent: {getAllExpensesPerUser(user.id, expenses)} EUR
          <br />
          Should spent: {getExpensesPerParticipant(user.id, expenses)} EUR
          <br />
          Saldo: {getSaldoPerUser(user.id, expenses)} EUR
        </Typography>

        <CardActions disableSpacing>
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
          <CardContent>{calculateBalances(user.id)}</CardContent>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default SingleUser;

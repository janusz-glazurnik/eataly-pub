import React from 'react';
import { ExpenseType } from '../../hooks/expenses/useExpenses';
import { UserType } from '../../hooks/expenses/useUsers';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Chip,
  Divider,
  Tooltip,
  AvatarGroup,
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  ReceiptLong as ReceiptIcon,
} from '@mui/icons-material';
import { getInitials } from '../../utils/utils';
import { deepOrange, lightBlue } from '@mui/material/colors';

const ExpenseCard = ({
  expense,
  users,
}: {
  expense: ExpenseType;
  users: UserType[];
}) => {
  const payerId = expense.payer;
  const payerData = users.find(({ id }) => id === payerId);

  const getParticipantData = (participantId: string) => {
    return users.find((user) => user.id === participantId);
  };

  const formattedDate = new Date(expense.timestamp).toLocaleDateString(
    'pl-PL',
    {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }
  );

  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
        },
        overflow: 'visible',
        position: 'relative',
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <Box display="flex" alignItems="center">
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                mr: 2,
                width: 48,
                height: 48,
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              }}
            >
              <ReceiptIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="700" color="text.primary">
                {expense.description}
              </Typography>
              <Box display="flex" alignItems="center" mt={0.5}>
                <CalendarIcon
                  sx={{ fontSize: 14, color: 'text.secondary', mr: 0.5 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {formattedDate}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box textAlign="right">
            <Typography variant="h5" fontWeight="800" color="primary.main">
              {expense.amount.toFixed(2)} {expense.currency}
            </Typography>
            <Chip
              label={expense.evenSplit ? 'Even Split' : 'Custom Split'}
              size="small"
              variant="outlined"
              color="secondary"
              sx={{ mt: 1, fontWeight: 600, fontSize: '0.65rem' }}
            />
          </Box>
        </Box>

        <Divider sx={{ my: 2, opacity: 0.6 }} />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography
              variant="overline"
              color="text.secondary"
              fontWeight="700"
            >
              Paid by
            </Typography>
            <Box display="flex" alignItems="center" mt={0.5}>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  fontSize: '0.875rem',
                  bgcolor:
                    payerData?.gender === 'male'
                      ? deepOrange[500]
                      : lightBlue[500],
                  mr: 1,
                }}
              >
                {payerData ? (
                  getInitials(payerData.name)
                ) : (
                  <PersonIcon fontSize="small" />
                )}
              </Avatar>
              <Typography variant="body2" fontWeight="600">
                {payerData?.name || 'Unknown'}
              </Typography>
            </Box>
          </Box>

          <Box textAlign="right">
            <Typography
              variant="overline"
              color="text.secondary"
              fontWeight="700"
            >
              Participants
            </Typography>
            <Box display="flex" justifyContent="flex-end" mt={0.5}>
              <AvatarGroup max={4}>
                {expense.participants.map((pId) => {
                  const pData = getParticipantData(pId);
                  return (
                    <Tooltip key={pId} title={pData?.name || 'Unknown'}>
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          fontSize: '0.75rem',
                          bgcolor:
                            pData?.gender === 'male'
                              ? deepOrange[400]
                              : lightBlue[400],
                        }}
                      >
                        {pData ? (
                          getInitials(pData.name)
                        ) : (
                          <GroupIcon fontSize="small" />
                        )}
                      </Avatar>
                    </Tooltip>
                  );
                })}
              </AvatarGroup>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ExpenseCard;

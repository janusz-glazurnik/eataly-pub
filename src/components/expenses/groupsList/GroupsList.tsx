import React from 'react';
import { useGetUsersGroups, UserType } from '../../../hooks/expenses/useUsers';
import { Container, Typography, Box, Paper } from '@mui/material';
import { Group as GroupIcon } from '@mui/icons-material';
import GroupCard from './GroupCard';

const GroupsList = ({ users }: { users: UserType[] }) => {
  const uniqueGroups = useGetUsersGroups();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 4,
          background:
            'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box display="flex" alignItems="center">
          <GroupIcon sx={{ fontSize: 40, mr: 2, opacity: 0.8 }} />
          <Box>
            <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 500 }}>
              Groups
            </Typography>
            <Typography variant="h4" fontWeight="800">
              {uniqueGroups?.length || 0} active
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ opacity: 0.8, textAlign: 'right' }}>
          Organize expenses by circles
        </Typography>
      </Paper>

      <Box>
        {!uniqueGroups || uniqueGroups.length === 0 ? (
          <Typography
            variant="body1"
            textAlign="center"
            color="text.secondary"
            sx={{ mt: 4 }}
          >
            No groups found.
          </Typography>
        ) : (
          uniqueGroups.map((group) => {
            const usersPerGroup = users.filter((user) =>
              user.groups?.includes(group)
            );

            return (
              <GroupCard
                key={group}
                groupName={group}
                members={usersPerGroup}
              />
            );
          })
        )}
      </Box>
    </Container>
  );
};

export default GroupsList;

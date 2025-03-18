import React from 'react';
import { UsersResponse } from '../../../hooks/expenses/useUsers';
import { Avatar, Card, CardContent, Typography } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import './GroupsList.scss';
import { getInitials } from '../../../utils/utils';

const GroupsList = ({ users }: { users: UsersResponse }) => {
  return (
    <div className="groups-list bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Groups</h2>

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
              </Avatar>
              {user.name}
            </Typography>
            <Typography variant="body2">placeholder</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GroupsList;

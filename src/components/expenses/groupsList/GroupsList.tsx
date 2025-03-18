import React from 'react';
import {
  useGetUsersGroups,
  User,
  UsersResponse,
} from '../../../hooks/expenses/useUsers';
import { Avatar, Card, CardContent, Typography } from '@mui/material';
import { deepOrange, lightBlue } from '@mui/material/colors';
import './GroupsList.scss';
import { getInitials } from '../../../utils/utils';

const GroupsList = ({ users }: { users: UsersResponse }) => {
  const uniqueGroups = useGetUsersGroups();

  // TODO TG probalby it will be better to have a separate component for it
  const getCard = (usersPerGroup: User[]) => {
    return usersPerGroup.map((user) => (
      <Card variant="outlined" key={user.id}>
        <CardContent>
          <Typography
            gutterBottom
            sx={{ color: 'text.secondary', fontSize: 14 }}
          >
            <a href={`mailto:${user.email}`}>{user.email}</a> ||{' '}
            <a href={`tel:${user.phone}}`}>{user.phone}</a>
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
            </Avatar>
            {user.name}
          </Typography>
          <Typography variant="body2">placeholder</Typography>
        </CardContent>
      </Card>
    ));
  };

  return (
    <div className="groups-list bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Groups</h2>

      {uniqueGroups &&
        uniqueGroups.map((group) => {
          const usersPerGroup = users.users.filter((user) =>
            user.groups.includes(group)
          );

          return (
            <div>
              <h2>{group}</h2>
              {getCard(usersPerGroup)}
            </div>
          );
        })}
    </div>
  );
};

export default GroupsList;

import React from 'react';
import { UserType } from '../../../hooks/expenses/useUsers';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  AvatarGroup,
  Tooltip,
  Divider,
} from '@mui/material';
import { Group as GroupIcon, Person as PersonIcon } from '@mui/icons-material';
import { getInitials } from '../../../utils/utils';
import { deepOrange, lightBlue } from '@mui/material/colors';

interface GroupCardProps {
  groupName: string;
  members: UserType[];
}

const GroupCard = ({ groupName, members }: GroupCardProps) => {
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
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box display="flex" alignItems="center">
            <Avatar
              sx={{
                bgcolor: 'secondary.main',
                mr: 2,
                width: 40,
                height: 40,
              }}
            >
              <GroupIcon />
            </Avatar>
            <Typography variant="h6" fontWeight="700">
              {groupName}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" fontWeight="500">
            {members.length} members
          </Typography>
        </Box>

        <Divider sx={{ mb: 2, opacity: 0.6 }} />

        <Box>
          <Typography
            variant="overline"
            color="text.secondary"
            fontWeight="700"
            sx={{ display: 'block', mb: 1 }}
          >
            Members
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <AvatarGroup max={6}>
              {members.map((member) => (
                <Tooltip key={member.id} title={member.name}>
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      fontSize: '0.875rem',
                      bgcolor:
                        member.gender === 'male'
                          ? deepOrange[400]
                          : lightBlue[400],
                    }}
                  >
                    {getInitials(member.name)}
                  </Avatar>
                </Tooltip>
              ))}
            </AvatarGroup>

            <Box display="flex" gap={1}>
              {/* Można tu dodać akcje typu "View Details" lub "Add Expense for Group" */}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GroupCard;

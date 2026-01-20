import React, { useState } from 'react';
import { UserType } from '../../hooks/expenses/useUsers';
import {
  Container,
  Typography,
  Box,
  Paper,
  Avatar,
  TextField,
  Grid2,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  MenuItem,
  Card,
  CardContent,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { getInitials } from '../../utils/utils';
import { deepOrange, lightBlue } from '@mui/material/colors';

const Settings = ({ user }: { user: UserType }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email || '',
    phone: user.phone || '',
    language: user.preferences.language,
    emailNotifications: user.preferences.notifications.email,
    smsNotifications: user.preferences.notifications.sms,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    // In a real app, we would call a mutation here
    console.log('Saving settings:', formData);
    alert('Settings saved successfully (mock)');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #2af598 0%, #009efd 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box display="flex" alignItems="center">
          <SettingsIcon sx={{ fontSize: 40, mr: 2, opacity: 0.8 }} />
          <Box>
            <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 500 }}>
              User Settings
            </Typography>
            <Typography variant="h4" fontWeight="800">
              Settings
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ opacity: 0.8, textAlign: 'right' }}>
          Manage your profile and preferences
        </Typography>
      </Paper>

      <Grid2 container spacing={4}>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Card
            sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
          >
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  fontSize: '2.5rem',
                  mx: 'auto',
                  mb: 2,
                  bgcolor:
                    user.gender === 'male' ? deepOrange[500] : lightBlue[500],
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                }}
              >
                {getInitials(user.name)}
              </Avatar>
              <Typography variant="h5" fontWeight="700">
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
              <Box mt={3}>
                <Typography
                  variant="caption"
                  display="block"
                  color="text.secondary"
                  gutterBottom
                >
                  Member since
                </Typography>
                <Typography variant="body2" fontWeight="600">
                  {user.registrationDate
                    ? new Date(user.registrationDate).toLocaleDateString()
                    : 'N/A'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 8 }}>
          <Paper
            sx={{
              p: 4,
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            }}
          >
            <Box display="flex" alignItems="center" mb={3}>
              <PersonIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="700">
                Profile Information
              </Typography>
            </Box>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid2>
              <Grid2 size={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid2>
            </Grid2>

            <Divider sx={{ my: 4 }} />

            <Box display="flex" alignItems="center" mb={3}>
              <LanguageIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="700">
                Preferences
              </Typography>
            </Box>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  select
                  label="Language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                >
                  <MenuItem value="pl">Polski</MenuItem>
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="de">Deutsch</MenuItem>
                </TextField>
              </Grid2>
            </Grid2>

            <Divider sx={{ my: 4 }} />

            <Box display="flex" alignItems="center" mb={3}>
              <NotificationsIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="700">
                Notifications
              </Typography>
            </Box>
            <Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.emailNotifications}
                    onChange={handleChange}
                    name="emailNotifications"
                    color="primary"
                  />
                }
                label="Email Notifications"
              />
              <Box mb={1} />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.smsNotifications}
                    onChange={handleChange}
                    name="smsNotifications"
                    color="primary"
                  />
                }
                label="SMS Notifications"
              />
            </Box>

            <Box mt={4} display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                size="large"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                sx={{
                  borderRadius: 2,
                  px: 4,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 14px rgba(0,158,253,0.3)',
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Paper>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default Settings;

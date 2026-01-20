import React, { useState } from 'react';
import Logo from '../../assets/logo.svg';
import { NavLink, useNavigate } from 'react-router';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  useScrollTrigger,
  Slide,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Restaurant as RestaurantIcon,
  ReceiptLong as ReceiptIcon,
  People as PeopleIcon,
  BarChart as StatsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useGetUsers } from '../../hooks/expenses/useUsers';
import { getInitials } from '../../utils/utils';

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const { users } = useGetUsers();
  const loggedInUser = users?.[0];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navItems = [
    { label: 'Home', path: '/', icon: <RestaurantIcon sx={{ mr: 1 }} /> },
    {
      label: 'Expenses',
      path: '/expenses',
      icon: <ReceiptIcon sx={{ mr: 1 }} />,
    },
    { label: 'Groups', path: '/groups', icon: <PeopleIcon sx={{ mr: 1 }} /> },
    { label: 'Stats', path: '/stats', icon: <StatsIcon sx={{ mr: 1 }} /> },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid',
          borderColor: 'divider',
          color: 'text.primary',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Desktop Logo */}
            <Box
              component="img"
              src={Logo}
              sx={{
                display: { xs: 'none', md: 'flex' },
                mr: 1,
                height: 40,
                width: 40,
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="div"
              onClick={() => navigate('/')}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              EATALY
            </Typography>

            {/* Mobile Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {navItems.map((item) => (
                  <MenuItem
                    key={item.label}
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate(item.path);
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      {item.icon}
                      <Typography textAlign="center">{item.label}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Mobile Logo */}
            <Box
              component="img"
              src={Logo}
              sx={{
                display: { xs: 'flex', md: 'none' },
                mr: 1,
                height: 32,
                width: 32,
              }}
            />
            <Typography
              variant="h5"
              noWrap
              component="div"
              onClick={() => navigate('/')}
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              EATALY
            </Typography>

            {/* Desktop Navigation Items */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
                gap: 2,
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={NavLink}
                  to={item.path}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: 'text.secondary',
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: 600,
                    textTransform: 'none',
                    '&.active': {
                      color: 'primary.main',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '10%',
                        width: '80%',
                        height: '3px',
                        backgroundColor: 'primary.main',
                        borderRadius: '3px 3px 0 0',
                      },
                    },
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'transparent',
                    },
                  }}
                  end={item.path === '/'}
                >
                  {item.icon}
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* User Profile / Settings */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={loggedInUser?.name}
                    src="/static/images/avatar/2.jpg"
                    sx={{
                      bgcolor: 'secondary.main',
                      width: 40,
                      height: 40,
                      fontSize: '1rem',
                      fontWeight: 'bold',
                    }}
                  >
                    {loggedInUser ? getInitials(loggedInUser.name) : 'U'}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    navigate('/settings');
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <SettingsIcon sx={{ mr: 1, fontSize: 20 }} />
                    <Typography textAlign="center">Settings</Typography>
                  </Box>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;

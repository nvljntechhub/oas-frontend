import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
  Outlet,
  NavLink as RouterLink,
  useNavigate,
  useParams
} from 'react-router-dom';
import {
  BadgeTwoTone,
  Work,
  ScheduleTwoTone,
  LogoutTwoTone,
  VerifiedUserTwoTone,
  PersonTwoTone
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { colorCodes, routesURLs, successResponses } from 'src/utils/properties';
import { Grid } from '@mui/material';
import { logout } from 'src/services/auth.service';
import { useSnackbar } from 'notistack';
import { Cookies } from 'react-cookie';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  background: colorCodes.MIDNIGHT,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}));

type Props = {};

const LayoutComponent = (props: Props) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [module, setModule] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = window.location.pathname;
    const jobSeekerManagementIndex = currentPath.indexOf(
      routesURLs.JOB_SEEKER_MANAGEMENT
    );
    if (jobSeekerManagementIndex !== -1) {
      const subPathAfterJobSeekerManagement = currentPath.substring(
        jobSeekerManagementIndex + routesURLs.JOB_SEEKER_MANAGEMENT.length
      );
      console.log(
        'subPathAfterJobSeekerManagement',
        subPathAfterJobSeekerManagement
      );

      if (subPathAfterJobSeekerManagement === routesURLs.DASHBOARD) {
        setModule(1);
      } else if (subPathAfterJobSeekerManagement === routesURLs.JOB_SEEKER) {
        setModule(2);
      } else if (subPathAfterJobSeekerManagement === routesURLs.APPOINTMENT) {
        setModule(3);
      }
    }
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    enqueueSnackbar(successResponses.LOGGED_OUT_SUCCESSFULLY, {
      variant: 'success'
    });
    localStorage.clear();
    const cookies = new Cookies();
    cookies.remove('token');
    navigate(routesURLs.JOB_SEEKER_SIGN_IN);
  };
  return (
    <>
      {/* <HeaderComponent />
      <SidebarComponent /> */}
      <Box sx={{ display: 'flex', position: 'relative' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    marginRight: 5,
                    ...(open && { display: 'none' })
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                  The JOBS - Job Seeker
                </Typography>
              </Toolbar>
            </Grid>
            <Grid item mt={1.4}>
              <IconButton onClick={handleLogout}>
                <LogoutTwoTone sx={{ color: '#ffffff' }} />
              </IconButton>
            </Grid>
          </Grid>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  background: module === 1 ? '#5F5F5F84' : ''
                }}
                component={RouterLink}
                to={routesURLs.JOB_SEEKER_MANAGEMENT + routesURLs.DASHBOARD}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center'
                  }}
                >
                  <PersonTwoTone />
                </ListItemIcon>
                <ListItemText
                  primary="Dashboard"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
            {/* <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  background: module === 2 ? '#5F5F5F84' : ''
                }}
                component={RouterLink}
                to="/admin-management/job_seeker"
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center'
                  }}
                >
                  <Work />
                </ListItemIcon>
                <ListItemText
                  primary="Job Seeker"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem> */}
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  background: module === 3 ? '#5F5F5F84' : ''
                }}
                component={RouterLink}
                to={routesURLs.JOB_SEEKER_MANAGEMENT + routesURLs.APPOINTMENT}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center'
                  }}
                >
                  <ScheduleTwoTone />
                </ListItemIcon>
                <ListItemText
                  primary="Appointments"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default LayoutComponent;

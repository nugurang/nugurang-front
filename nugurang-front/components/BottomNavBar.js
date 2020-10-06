import Link from 'next/link';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ForumIcon from '@material-ui/icons/Forum';
import ChatIcon from '@material-ui/icons/ChatBubble';
import NotificationsIcon from '@material-ui/icons/Notifications';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import PersonIcon from '@material-ui/icons/Person';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AppBar from '@material-ui/core/AppBar';

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0
  }
}));

export default function BottomNavBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar className={classes.appBar}>
      <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
        <BottomNavigationAction label="Dashboard" value="dashboard" icon={<DashboardIcon />} href="/"/>
        <BottomNavigationAction label="Forum" value="forum" icon={<ForumIcon />} />
        <BottomNavigationAction label="Team" value="team" icon={<BusinessCenterIcon />} />
        <BottomNavigationAction label="Person" value="person" icon={<PersonIcon />} />
        <BottomNavigationAction label="Sign in" value="signin" icon={<MoreHorizIcon />} href="/signin"/>
      </BottomNavigation>
    </AppBar>
  );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import ForumIcon from '@material-ui/icons/Forum';
import ChatIcon from '@material-ui/icons/ChatBubble';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
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
        <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Forum" value="forum" icon={<ForumIcon />} />
        <BottomNavigationAction label="People" value="people" icon={<PeopleIcon />} />
        <BottomNavigationAction label="Person" value="person" icon={<PersonIcon />} />
      </BottomNavigation>
    </AppBar>
  );
}

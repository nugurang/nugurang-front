import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Link from 'next/link';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import HomeIcon from '@material-ui/icons/Home';
import TeaIcon from '@material-ui/icons/EmojiFoodBeverage';
import GroupIcon from '@material-ui/icons/Group';
import ChatIcon from '@material-ui/icons/QuestionAnswer';
import MoreIcon from '@material-ui/icons/MoreHoriz';

const styles = {
  root: {
    top: 'auto',
    bottom: 0,
  },
};


function BottomNavBar(props) {
  const { classes, children, className, ...other } = props;

  const [value, setValue] = React.useState('recents');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar className={classes.root}>
      <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
        <Link href="/" passHref>
          <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
        </Link>
        <Link href="/forum" passHref>
          <BottomNavigationAction label="Forum" value="forum" icon={<TeaIcon />} />
        </Link>
        <Link href="team" passHref>
          <BottomNavigationAction label="Team" value="team" icon={<GroupIcon />}/>
        </Link>
        <Link href="chat" passHref>
          <BottomNavigationAction label="Chat" value="chat" icon={<ChatIcon />} />
        </Link>
        <Link href="more" passHref>
          <BottomNavigationAction label="More" value="more" icon={<MoreIcon />} />
        </Link>
      </BottomNavigation>
    </AppBar>
  );
}

BottomNavBar.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(BottomNavBar);

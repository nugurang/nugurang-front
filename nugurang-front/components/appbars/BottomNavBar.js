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
import ForumIcon from '@material-ui/icons/Forum';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

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
        <Link href="/"><BottomNavigationAction label="Home" value="home" icon={<HomeIcon />}/></Link>
        <BottomNavigationAction label="Forum" value="forum" icon={<ForumIcon />} />
        <Link href="/team"><BottomNavigationAction label="Team" value="team" icon={<GroupIcon/>} /></Link>
        <BottomNavigationAction label="Person" value="person" icon={<PersonIcon />}/>
        <Link href="/more"><BottomNavigationAction label="Sign in" value="signin" icon={<MoreHorizIcon />}/></Link>
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
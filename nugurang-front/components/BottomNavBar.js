import { withStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ChatIcon from '@material-ui/icons/QuestionAnswer';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import TeaIcon from '@material-ui/icons/EmojiFoodBeverage';

const styles = {
  root: {
    top: 'auto',
    bottom: 0,
  },
};

function BottomNavBar(props) {
  const router = useRouter();
  const { classes } = props;
  const actions = [
    ['home', <HomeIcon/>],
    ['boards', <TeaIcon/>],
    ['team', <GroupIcon/>],
    ['chat', <ChatIcon/>],
    ['more', <MoreIcon/>]
  ].map(([value, icon]) => {
      return <BottomNavigationAction
               label={value}
               value={value}
               icon={icon}
               onClick={() => {router.push(`/${value}`)}}
              />
  });
  return (
    <AppBar className={classes.root}>
      <BottomNavigation
        value={router.pathname.split('/')[1] || 'home'}
        className={classes.root}
      >
        {actions}
      </BottomNavigation>
    </AppBar>
  );
}

BottomNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomNavBar);

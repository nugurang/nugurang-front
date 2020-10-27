import { withStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Container from '@material-ui/core/Container';
import ChatIcon from '@material-ui/icons/QuestionAnswer';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import TeaIcon from '@material-ui/icons/EmojiFoodBeverage';

const styles = {
  appBar: {
    background: 'transparent',
    top: 'auto',
    bottom: 0,
  },
};

function BottomNavBar(props) {
  const router = useRouter();
  const { classes } = props;
  let key = 0;
  const actions = [
    ['Home', 'home', <HomeIcon />],
    ['Boards', 'boards', <TeaIcon />],
    ['Teams', 'teams', <GroupIcon />],
    ['Chats', 'chats', <ChatIcon />],
    ['More', 'more', <MoreIcon />]
  ].map(([label, value, icon]) => {
      return (
        <BottomNavigationAction
          key={++key}
          label={label}
          value={value}
          icon={icon}
          onClick={() => {router.push(`/${value}`)}}
        />
      )
  });
  return (
    <AppBar className={classes.appBar}>
      <Container maxWidth="sm">
        <BottomNavigation
          value={router.pathname.split('/')[1] || 'home'}
        >
          {actions}
        </BottomNavigation>
      </Container>
    </AppBar>
  );
}

BottomNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomNavBar);

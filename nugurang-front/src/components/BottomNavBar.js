import { makeStyles } from '@material-ui/styles';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import ChatIcon from '@material-ui/icons/QuestionAnswer';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import TeaIcon from '@material-ui/icons/EmojiFoodBeverage';

const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    top: 'auto',
    bottom: 0,
    margin: 0,
    padding: "0.5rem",
  },
  bottomNavigation: {
    backgroundColor: "transparent",
  },
}));



function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="up" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};


export default function BottomNavBar(props) {
  const router = useRouter();
  const classes = useStyles();
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
          key={++key} label={label} value={value} icon={icon}
          onClick={() => {router.push(`/${value}`)}}
        />
      )
  });
  return (
    <HideOnScroll {...props}>
      <AppBar className={classes.appBar}>
        <Container maxWidth="sm">
          <BottomNavigation
            className={classes.bottomNavigation}
            value={router.pathname.split('/')[1] || 'home'}
          >
            {actions}
          </BottomNavigation>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
}
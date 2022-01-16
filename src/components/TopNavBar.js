import { makeStyles } from '@material-ui/styles';
import { useRouter } from 'next/router';
import React from 'react';
import PropTypes from 'prop-types';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';


const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    color: "black",
  },
  button: {
    border: "transparent",
  },
  topNavigation: {
    backgroundColor: "transparent",
  },
}));


function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function TopNavBar(props) {
  const router = useRouter();
  const classes = useStyles();

  return (
    <HideOnScroll {...props}>
      <AppBar className={classes.appBar}>
        <Container maxWidth="lg">
          <Toolbar className={classes.topNavigation}>
            <Grid container alignItems="center" direction="row" justify="flex-start">
              <Grid item>
                <Button className={classes.button} onClick={() => router.push('/home')}>Home</Button>
                <Button className={classes.button} onClick={() => router.push('/boards')}>Boards</Button>
                <Button className={classes.button} onClick={() => router.push('/teams')}>Teams</Button>
                <Button className={classes.button} onClick={() => router.push('/chats')}>Chats</Button>
                <Button className={classes.button} onClick={() => router.push('/more')}>More</Button>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );

}
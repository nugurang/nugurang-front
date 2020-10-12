import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  avatar: {
    fontSize: 48,
    height: '100px', 
    margin: '0px',
    width: '100px'
  },
  box: {
    border: '0px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '5px',
    padding: '5px',
    variant: 'outlined',
  },
  nameTypography: {
    fontFamily: "Ubuntu",
    fontSize: 36,
    fontWeight: 400,
    margin: '0px 20px',
  },
  statisticsTypography: {
    fontFamily: "Ubuntu",
    fontSize: 18,
    fontWeight: 300,
    margin: '0px 20px',
  },
  bioTypography: {
    fontFamily: "Ubuntu",
    fontSize: 24,
    fontWeight: 300,
    margin: '0px 10px',
  },
  bioPaper: {
    border: '1px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '5px',
    padding: '5px',
    variant: 'outlined',
  },
});


function UserInfoBox(props) {

  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <Box className={classes.box} elevation={0}>

        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={12} sm={2} justify='space-around'>
            <Avatar className={classes.avatar}
              alt={props.user.name}
              src={props.user.image}
              variant="circle"
            />
          </Grid>
          <Grid item xs={12} sm justify='space-around'>
            <Typography className={classes.nameTypography}>
              {props.user.name}
            </Typography>
            <Typography className={classes.statisticsTypography}>
              {props.user.statistics}
            </Typography>
          </Grid>
          <Grid item xs={12} justify='space-around'>
            <Paper className={classes.bioPaper} variant='outlined'>
              <Typography className={classes.bioTypography}>
                {props.user.bio}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}

UserInfoBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserInfoBox);
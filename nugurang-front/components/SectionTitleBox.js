import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router'
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  avatar: {
    backgroundColor: "white",
    color: "black",
    height: '30px',
    width: '30px',
  },
  box: {
    border: '0px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '5px',
    padding: '0px',
    variant: 'outlined',
  },
  hr: {
    backgroundColor: "gray",
    height: 2,
  },
  typography: {
    fontFamily: "Ubuntu",
    fontSize: 30,
    fontWeight: 300,
  },
});


function SectionTitleBox(props) {

  const { classes } = props
  const router = useRouter()

  return (
    <React.Fragment>
      <CssBaseline />
      <Box className={classes.box}>
        <Grid container spacing={2} alignItems="center" direction="row" justify="flex-start">
          <Grid item align="center">
            <Avatar className={classes.avatar}>
              {props.icon}
            </Avatar>
          </Grid>
          <Grid item align="center">
            <Typography className={classes.typography}>
              {props.title}
            </Typography>
          </Grid>
        </Grid>
        <hr className={classes.hr}/>
      </Box>
    </React.Fragment>
  );
}

SectionTitleBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SectionTitleBox);
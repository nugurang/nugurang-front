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
  box: {
    border: '0px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '30px 20px 0px 20px',
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
        <Grid container spacing={2} alignItems="center" justify="space-between">
          <Grid item xs={1}>
            <Avatar>
              {props.icon}
            </Avatar>
          </Grid>
          <Grid item xs>
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
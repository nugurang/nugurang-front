import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router'
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const styles = theme => ({
  backButton: {
    marginRight: theme.spacing(2),
  },
  box: {
    border: '0px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '30px 20px 10px 20px',
    padding: '0px',
    variant: 'outlined',
  },
  typography: {
    fontFamily: "Ubuntu",
    fontSize: 30,
    fontWeight: 300,
  },
});


function PageTitleBox(props) {

    const { classes } = props
    const router = useRouter()

    return (
      <React.Fragment>
        <CssBaseline />
        <Box className={classes.box}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs={1}>
              <IconButton edge="start" onClick={() => router.back()} className={classes.backButton} color="inherit" aria-label="back">
                <ArrowBackIcon />
              </IconButton>
            </Grid>
            <Grid item xs>
              <Typography className={classes.typography}>
                {props.title}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </React.Fragment>
    );
}

PageTitleBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PageTitleBox);
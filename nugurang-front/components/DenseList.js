import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import StarsIcon from '@material-ui/icons/Stars';

const styles = theme => ({
  paper: {
    border: '0px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '30px 20px 10px 20px',
    padding: '0px',
    variant: 'outlined',
  },
  typography: {
    fontFamily: "Ubuntu",
    fontSize: 14,
    fontWeight: 300,
  },
});


function CommentList(props) {

    const { classes } = props

    return (
      <React.Fragment>
        <CssBaseline />
        <Paper className={classes.paper} elevation={0}>
          <List dense="true">
            {props.list.map(article => (
              <ListItem button>
                <ListItemText primary={article.title} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </React.Fragment>
    );
}

CommentList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommentList);
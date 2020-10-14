import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import StarsIcon from '@material-ui/icons/Stars';

const styles = theme => ({
  avatar: {
    backgroundColor: "white",
    color: "black",
    height: '25px',
    width: '25px',
  },
  box: {
    border: '0px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '5px',
    padding: '0px',
    variant: 'outlined',
  },
  listPrimaryTypography: {
    fontFamily: "Ubuntu",
    fontSize: 20,
    fontWeight: 400,
  },
  listSecondaryTypography: {
    fontFamily: "Ubuntu",
    fontSize: 14,
    fontWeight: 300,
    wordWrap: 'break-word',
  },
});


function UniversalList(props) {

    const { classes } = props

    return (
      <React.Fragment>
        <CssBaseline />
        <Box className={classes.box}>
          <List>
            {props.list.map(listItem => (
              <ListItem button alignItems="flex-start">
                {
                  listItem.icon ?
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}
                      alt={listItem.name}
                      src={listItem.icon}
                      variant="square"
                    />
                  </ListItemAvatar> : null
                }
                <ListItemText
                  primary={<Typography className={classes.listPrimaryTypography} >{listItem.primary}</Typography>}
                  secondary={
                  listItem.secondary ?
                    <Typography className={classes.listSecondaryTypography}>
                      {listItem.secondary}
                    </Typography> : null}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </React.Fragment>
    );
}

UniversalList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UniversalList);
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
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  avatar: {
    fontSize: 24,
    height: '50px', 
    margin: '0px',
    width: '50px'
  },
  box: {
    width: '500px'
  },
  list: {
    border: '0px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '5px',
    padding: '0px',
    variant: 'outlined',
  },
  nameTypography: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 300,
    margin: '0px 0px',
  },
  contentTypography: {
    border: '1px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 10,
    fontFamily: "Ubuntu",
    fontSize: 18,
    fontWeight: 300,
    margin: '0px 55px',
    padding: '5px',
    variant: 'outlined',
    wordWrap: 'break-word',
  },
});


function ChattingBox(props) {

  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <Box className={classes.box}>
          {props.chats.map(chat => (
                chat.isMyChat == true ?
                  <div>
                    <Grid container spacing={2} alignItems="center" direction="row" justify="flex-end">
                      <Grid item>
                        <Grid container>
                          <Grid item align="right">
                            <Typography className={classes.nameTypography}>
                              {chat.name}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item align="right">
                        <Avatar className={classes.avatar}
                          alt={chat.name}
                          src={chat.image}
                        />
                      </Grid>
                    </Grid>
                    <Typography className={classes.contentTypography} align="right">
                      {chat.content}
                    </Typography>
                  </div>
                :                           
                  <div>
                    <Grid container spacing={2} alignItems="center"  alignments="flex-start" direction="row" justify="flex-start">
                      <Grid item align="left">
                        <Avatar className={classes.avatar}
                          alt={chat.name}
                          src={chat.image}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <Grid container>
                          <Grid item align="left">
                            <Typography className={classes.nameTypography}>
                              {chat.name}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Typography className={classes.contentTypography} align="left">
                      {chat.content}
                    </Typography>
                  </div>
          ))}
      </Box>
    </React.Fragment>
  );
}

ChattingBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChattingBox);







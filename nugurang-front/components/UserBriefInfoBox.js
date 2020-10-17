import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = {
  avatar: {
    fontSize: 36,
    height: '75px', 
    margin: '0px',
    width: '75px'
  },
  box: {
    border: '0px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '5px',
    padding: '0px',
    variant: 'outlined',
    wordWrap: "break-word",
  },
  nameTypography: {
    fontFamily: "Ubuntu",
    fontSize: 28,
    fontWeight: 400,
    margin: '0px',
    overflow: "hidden", 
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
  statisticsTypography: {
    fontFamily: "Ubuntu",
    fontSize: 18,
    fontWeight: 300,
    margin: '0px',
    overflow: "hidden", 
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
};


function UserBriefInfoBox(props) {
  const { classes } = props;
  return (
    <>
      <Box className={classes.box}>
        <Grid container spacing={2} alignItems="center" direction="row" justify="flex-start">
          <Grid item align="center">
            <Avatar
              className={classes.avatar}
              alt={props.user.name}
              src={props.user.image}
            />
          </Grid>
          <Grid item align="left">
            <Typography className={classes.nameTypography}>{props.user.name}</Typography>
            <Typography className={classes.statisticsTypography}>{props.user.statistics}</Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

UserBriefInfoBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserBriefInfoBox);

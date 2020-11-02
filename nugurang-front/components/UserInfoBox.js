import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  avatar: {
    fontSize: 48,
    height: '5rem',
    margin: '0rem',
    width: '5rem'
  },
  box: {
    border: '0rem solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '0.5rem',
    padding: '0rem',
    variant: 'outlined',
  },
  nameTypography: {
    fontFamily: "Ubuntu",
    fontSize: 36,
    fontWeight: 400,
    margin: '0rem',
  },
  followersTypography: {
    fontFamily: "Ubuntu",
    fontSize: 18,
    fontWeight: 300,
    margin: '0rem',
  },
  bioTypography: {
    fontFamily: "Ubuntu",
    fontSize: 24,
    fontWeight: 300,
    margin: '0rem 1rem',
    wordWrap: 'break-word',
  },
  bioPaper: {
    border: '0.1rem solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '0.5rem',
    padding: '0.5rem',
    variant: 'outlined',
  },
}));


export default function UserInfoBox({ bio, dense, followers, followings, image, name }) {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item container spacing={2} alignItems="center" justify="flex-start">
          <Grid item>
            <Avatar className={classes.avatar}
              alt={name}
              src={image}
              variant="circle"
            />
          </Grid>
          <Grid item>
            <Typography className={classes.nameTypography}>
              {name}
            </Typography>
            <Box display={dense ? "none" : "block"}>
              <Typography className={classes.followersTypography}>
                {followers.length}
                {' followers, '}
                {followings.length}
                {' followings'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box display={dense ? "none" : "block"}>
            <Paper className={classes.bioPaper} variant='outlined'>
              <Typography className={classes.bioTypography}>
                {bio}
              </Typography>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
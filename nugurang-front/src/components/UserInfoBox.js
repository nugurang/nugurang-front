import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  avatar: {
    fontSize: 48,
    height: '5rem',
    margin: '0rem',
    width: '5rem'
  },
}));


export default function UserInfoBox({ user, dense=false }) {
  const router = useRouter();
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item container spacing={2} alignItems="center" justify="flex-start">
          <div onClick={() => router.push(`/image/${user.image.id}`)}>
            <Grid item>
              <Avatar className={classes.avatar}
                alt={user.name}
                src={user.image ? user.image.address : null}
                variant="circle"
              >
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
            </Grid>
          </div>
          <Grid item>
            <Typography variant="h5">{user.name}</Typography>
            <Box display={dense ? "none" : "block"}>
              <Typography variant="body1">
                {user.getFollowers.length}
                {' followers, '}
                {user.getFollowings.length}
                {' followings'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box display={dense ? "none" : "block"}>
            <Typography variant="body1">{user.biography || "No biography :("}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
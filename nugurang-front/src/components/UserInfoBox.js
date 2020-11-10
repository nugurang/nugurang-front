import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
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
}));


export default function UserInfoBox({ user, dense=false }) {
  const router = useRouter();
  const classes = useStyles();
  return (
    <>
      <Box style={{margin: "1rem"}}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Grid container spacing={2} alignItems="center" justify="flex-start">
              <Grid item>
                <div onClick={() => user.image ? router.push(`/image/${user.image.id}`) : null}>
                  <Avatar className={classes.avatar}
                    alt={user.name}
                    src={user.image ? user.image.address : null}
                    variant="circle"
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                </div>
              </Grid>
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
          </Grid>
        </Grid>
      </Box>

      <Box display={dense ? "none" : "block"}>
        <Paper elevation={1}>
          <Typography variant="body1">{user.biography || "No biography :("}</Typography>
        </Paper>
      </Box>
    </>
  );
}
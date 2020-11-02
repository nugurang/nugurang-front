import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
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


export default function WorkInfoBox({ name, opened, users, dense="false" }) {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item container spacing={2} alignItems="center" justify="flex-start">
          <Grid item align="right">
            <AvatarGroup className={classes.avatarGroup} max={3} spacing="small">
              {users.map(user => (
                <Avatar key={user.id} alt={user.name} src={user.image} />
              ))}
            </AvatarGroup>
          </Grid>
          <Grid item>
            <Typography className={classes.nameTypography}>
              {name}
            </Typography>
            <Box display={dense ? "none" : "block"}>
              <Typography className={classes.followersTypography}>
                Hi
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
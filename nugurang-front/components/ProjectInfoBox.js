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
}));


export default function ProjectInfoBox({ project, dense="false" }) {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item container spacing={2} alignItems="center" justify="flex-start">
          {
            project.getUsers
            ? (
              <Grid item align="right">
                <AvatarGroup className={classes.avatarGroup} max={3} spacing="small">
                  {project.getUsers.map(user => (
                    <Avatar key={user.id} alt={user.name} src={user.image} />
                  ))}
                </AvatarGroup>
              </Grid>
            )
            : ( <></> )
          }
          <Grid item>
            <Typography className={classes.nameTypography}>
              {project.name}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
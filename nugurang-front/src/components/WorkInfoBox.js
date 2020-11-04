import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


export default function WorkInfoBox({ work, dense=false }) {
  return (
    <Grid container spacing={2} alignItems="center" justify="center">
      <Grid item container spacing={2} alignItems="center" justify="flex-start">
        <Grid item>
          <Typography variant="h4">
            {work.name}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
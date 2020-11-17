import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


export default function TaskInfoBox({ task }) {
  return (
    <Grid container spacing={2} alignItems="center" justify="center">
      <Grid item container spacing={2} alignItems="center" direction="row" justify="flex-start">
        <Grid item>
          <Typography variant="h4">{task.name}</Typography>
        </Grid>
        <Grid item>
          <Chip color="primary" style={{margin: "0.5rem"}} label={task.progress.name} />
          <Chip color="primary" style={{margin: "0.5rem"}} avatar={<Avatar>Lv</Avatar>} label={task.difficulty} />
        </Grid>
      </Grid>
    </Grid>
  );
}
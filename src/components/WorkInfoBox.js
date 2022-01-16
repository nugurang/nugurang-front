import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


export default function WorkInfoBox({ work }) {
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
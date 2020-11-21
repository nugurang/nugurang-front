import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


export default function TaskInfoBox({ task }) {
  return (
    <Grid container alignItems="center">
      <Grid item xs={12}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            {
              task.users
              ? (
                <Grid item align="right">
                  <AvatarGroup max={3} spacing="small">
                    {task.users.map(user => (
                      <Avatar key={user.id} alt={user.name} src={user.image} />
                    ))}
                  </AvatarGroup>
                </Grid>
              )
              : ( <></> )
            }
          </Grid>
          <Grid item>
            <Typography variant="h4">{task.name}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Chip color="primary" style={{margin: "0.5rem 0"}} label={task.progress.name} />
          </Grid>
          <Grid item>
            <Chip color="primary" style={{margin: "0.5rem 0"}} avatar={<Avatar>Lv</Avatar>} label={task.difficulty} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
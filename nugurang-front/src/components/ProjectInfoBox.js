import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


export default function ProjectInfoBox({ project }) {
  return (
    <Grid container spacing={2} alignItems="center" justify="center">
      <Grid item container spacing={2} alignItems="center" justify="flex-start">
        {
          project.getUsers
          ? (
            <Grid item align="right">
              <AvatarGroup max={3} spacing="small">
                {project.getUsers.map(user => (
                  <Avatar key={user.id} alt={user.name} src={user.image ? user.image.address : null} />
                ))}
              </AvatarGroup>
            </Grid>
          )
          : ( <></> )
        }
        <Grid item>
          <Typography variant="h4">
            {project.name}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


export default function ProjectInfoBox({ project, dense="false" }) {
  return (
      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item container spacing={2} alignItems="center" justify="flex-start">
          {
            project.getUsers
            ? (
              <Grid item align="right">
                <AvatarGroup max={3} spacing="small">
                  {project.getUsers.map(user => (
                    <Avatar key={user.id} alt={user.name} src={user.image} />
                  ))}
                </AvatarGroup>
              </Grid>
            )
            : ( <></> )
          }
          <Grid item>
            <Typography variant="h6">
              {project.name}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
  );
}
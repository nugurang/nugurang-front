import React from 'react';
import { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import DraftsIcon from '@material-ui/icons/Drafts';
import MailIcon from '@material-ui/icons/Mail';

export default function NotificationListItem({ notification }) {
  const router = useRouter();
  const createdAt = new Date(notification.createdAt);


  return (
    <ListItem
      alignItems="flex-start"
      button
      onClick={() => notification.onClick ? notification.onClick() : null}
    >
      <Grid container>
        <Grid item>
          <ListItemIcon>
            {
              notification.isRead
              ? <DraftsIcon />
              : <MailIcon />
            }
          </ListItemIcon>
        </Grid>
        <Grid item xs>
          <Box display="flex" flexWrap="wrap">
            <ListItemText
              primary={(
                <Box display='block'>
                  <Typography variant="body1">
                    {createdAt.getFullYear()}-
                    {createdAt.getMonth()}-
                    {createdAt.getDate()}{" "}
                    {createdAt.getHours()}:
                    {createdAt.getMinutes()}{" "}
                    {createdAt.getHours() < 12 ? "AM" : "PM"}
                  </Typography>
                </Box>
              )}
            />
          </Box>
          <Box display={notification.type.name == "TEAM_INVITATION" ? "block" : "none"}>
            {notification.data?.flat().map((string) => <Grid item><Typography variant="body2">{"You are invited to team "}{string}{"."}</Typography></Grid>)}
          </Box>
          <Box display={notification.type.name == "PROJECT_INVITATION" ? "block" : "none"}>
            {notification.data?.flat().map((string) => <Grid item><Typography variant="body2">{"You are invited to project "}{string}{"."}</Typography></Grid>)}
          </Box>
        </Grid>
      </Grid>
    </ListItem>
  );
}

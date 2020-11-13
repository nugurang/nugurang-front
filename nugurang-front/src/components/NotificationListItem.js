import React from 'react';
import { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';


export default function NotificationListItem({ notification }) {
  const router = useRouter();
  return (
    <ListItem
      alignItems="flex-start"
      button
      onClick={() => notification.onClick ? notification.onClick() : null}
    >
      <Grid container>
        <Grid item>
          <ListItemIcon>
            <MessageOutlinedIcon/>
          </ListItemIcon>
        </Grid>
        <Grid item xs>
          <Box display="flex" flexWrap="wrap">
            <ListItemText
              primary={(
                <Box display='block'>
                  <Typography variant="h6">
                    {notification.title}
                  </Typography>
                </Box>
              )}
              secondary={(
                <Box display={notification.content ? "block" : "none"}>
                  <Typography variant="body1">
                    {notification.content}
                  </Typography>
                </Box>
              )}
            />
          </Box>
          <Grid item xs={12}>
            <Typography variant="body2">
              {notification.createdAt}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </ListItem>
  );
}
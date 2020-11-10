import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';

import NoContentsBox from './NoContentsBox';
import StatCounterBox from './StatCounterBox';

export default function ThreadListItem({ thread }) {
  const router = useRouter();
  return (
    <ListItem
      alignItems="flex-start"
      button
      onClick={() => thread.onClick ? thread.onClick() : null}
    >
      <Grid container>
        <Grid item>
          <ListItemAvatar>
            <Avatar
              alt={thread.user.name}
              src={thread.user.image ? thread.user.image.address : null}
              variant="circle"
            />
          </ListItemAvatar>
        </Grid>
        <Grid item xs>
          <Box display="flex" flexWrap="wrap">
            <ListItemText
              primary={(
                <Box display={thread.name ? "block" : "none"}>
                  <Typography variant="h6">{thread.name}</Typography>
                </Box>
              )}
              secondary={(
                <Box display={thread.content ? "block" : "none"}>
                  <Typography variant="body1">{thread.content}</Typography>
                </Box>
              )}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <StatCounterBox image={thread.image} upCount={thread.upCount} />
        </Grid>
      </Grid>
    </ListItem>
  );
}

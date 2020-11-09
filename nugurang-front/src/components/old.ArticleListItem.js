import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import StatCounterBox from './StatCounterBox';

export default function ArticleListItem({ author, avatar, content, image, like, onClick, topic, view, vote }) {
  return (
    <ListItem
      alignItems="flex-start"
      button
      onClick={onClick}
    >
      <Grid container>
        <Grid item>
          <ListItemAvatar>
            <Avatar
              alt={author}
              src={avatar}
              variant="circle"
            />
          </ListItemAvatar>
        </Grid>
        <Grid item xs>
          <Box display="flex" flexWrap="wrap">
            <ListItemText
              primary={(
                <Box display={author ? "block" : "none"}>
                  <Typography variant="body1">
                    {author}
                  </Typography>
                </Box>
              )}
              secondary={(
                <Box display={content ? "block" : "none"}>
                  <Typography variant="body2">
                    {content}
                  </Typography>
                </Box>
              )}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <StatCounterBox topic={topic} image={image} view={view} like={like} vote={vote} />
        </Grid>
      </Grid>
    </ListItem>
  );
}
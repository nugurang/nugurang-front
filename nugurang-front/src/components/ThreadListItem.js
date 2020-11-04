import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import StatCounterBox from './StatCounterBox';

const useStyles = makeStyles(() => ({
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));


export default function ArticleListItemElement({ author, content, image, like, onClick, name, topic, view, vote }) {
  const classes = useStyles();
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
              alt={name}
              src={image}
              variant="circle"
            />
          </ListItemAvatar>
        </Grid>
        <Grid item xs>
          <Box display="flex" flexWrap="wrap">
            <ListItemText
              primary={(
                <Box display={author ? "block" : "none"}>
                  <Typography variant="body2">{author}</Typography>
                </Box>
              )}
              secondary={(
                <Typography variant="body1">{content}</Typography>
              )}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <StatCounterBox topic={topic} view={view} like={like} vote={vote} />
        </Grid>
      </Grid>
    </ListItem>
  );
}
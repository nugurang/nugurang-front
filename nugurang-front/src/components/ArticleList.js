import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import 'array-flat-polyfill';

import StatCounterBox from './StatCounterBox';

const useStyles = makeStyles(() => ({
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));


export default function ArticleList({ items }) {
  const classes = useStyles();
  return (
    <List>
      {[items].flat().map((item) => (
        <Grid item key={item.id}>
          <ListItem
            alignItems="flex-start"
            button
            onClick={item.onClick}
          >
            <Grid container alignItems="flex-start">
              <Grid item>
                <Avatar
                  alt={item.user.name}
                  src={item.user.image ? item.user.image.address : null}
                  variant="circle"
                />
              </Grid>
              <Grid item xs={10}>
                <Box display="flex" flexWrap="wrap">
                  <ListItemText
                    primary={(
                      <Box display={item.user? "block" : "none"}>
                        <Typography variant="body1">
                          {item.user.name}
                        </Typography>
                      </Box>
                    )}
                    secondary={(
                      <Box display={item.content ? "block" : "none"}>
                        <Typography variant="body2">
                          {item.content}
                        </Typography>
                      </Box>
                    )}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <StatCounterBox topic={item.topic} image={item.image} view={item.view} like={item.like} vote={item.vote} />
              </Grid>
            </Grid>
          </ListItem>
        </Grid>
      ))}
    </List>
  );
}
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
  avatar: {
    backgroundColor: "transparent",
    color: "black",
    height: '2rem',
    width: '2rem',
    margin: '0.5rem 0.5rem',
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  listPrimaryTypography: {
    fontFamily: "Ubuntu",
    fontSize: 20,
    fontWeight: 400,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
  listSecondaryTypography: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 300,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
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
                <Avatar className={classes.avatar}
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
                        <Typography className={classes.listPrimaryTypography}>
                          {item.user.name}
                        </Typography>
                      </Box>
                    )}
                    secondary={(
                      <Box display={item.content ? "block" : "none"}>
                        <Typography className={classes.listSecondaryTypography}>
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
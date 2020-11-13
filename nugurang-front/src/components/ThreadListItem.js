import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles({
  singleLineEllipsis: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 1,
    "-webkit-box-orient": "vertical"
  },
  doubleLineEllipsis: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical"
  },
});

export default function ThreadListItem({ thread }) {
  const router = useRouter();
  const classes = useStyles();
  return (
    <ListItem
      alignItems="flex-start"
      button
      onClick={() => thread.onClick ? thread.onClick() : null}
    >
      <Grid container>
        <Grid item xs={12}>
          <Grid container alignItems="center" justify="flex-start">
            <Grid item>
              <ListItemAvatar>
                <Avatar
                  alt={thread.user.name}
                  src={thread.user.image ? thread.user.image.address : null}
                  variant="circle"
                >
                  {thread.user.name.charAt(0).toUpperCase()}
                </Avatar>
              </ListItemAvatar>
            </Grid>
            <Grid item>
              <Box display="flex" flexWrap="wrap">
                <Typography variant="body1" className={classes.singleLineEllipsis}>{thread.user.name}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.doubleLineEllipsis}>{thread.name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <StatCounterBox image={thread.image} upCount={thread.upCount} />
        </Grid>
      </Grid>
    </ListItem>
  );
}

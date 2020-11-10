import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { useRouter } from 'next/router';
import Typography from '@material-ui/core/Typography';
import 'array-flat-polyfill';

import NoContentsBox from './NoContentsBox';
import StatCounterBox from './StatCounterBox';

const useStyles = makeStyles(() => ({
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

export default function ThreadCard({ thread }) {
  const classes = useStyles();
  const router = useRouter();
  return (
    <Card
      onClick={() => thread.onClick ? thread.onClick() : null}
      variant="outlined"
    >
      <CardActionArea>
        <Box display={thread.image ? "block" : "none"}>
          <CardMedia className={classes.cardMedia}
            image={thread.image}
            title={thread.imageTitle ? thread.imageTitle : null}
          />
        </Box>
        <CardContent>
          <Grid container spacing={1} alignItems="center" direction="row">
            <Grid item>
              <Avatar
                src={thread.user.image ? thread.user.image.address : null}
                variant="circle"
              />
            </Grid>
            <Grid item>
              <Box display={thread.name ? "block" : "none"}>
                <Typography variant="h6">
                  {thread.name}
                </Typography>
              </Box>
              <Box display={thread.author ? "block" : "none"}>
                <Typography variant="body1">
                  {thread.author}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container justify="flex-end">
            <Grid item align="right">
              <StatCounterBox compact image={thread.image} upCount={thread.upCount} />
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

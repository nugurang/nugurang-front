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

export default function ThreadGrid({ items }) {
  const classes = useStyles();
  const router = useRouter();
  return (
    <>
      {
        items && items.length > 0
        ? (
        <Grid container alignments="center" justify="flex-start">
          {[items].flat().map((item) => (
            <Grid item xs={12} sm={6} key={item.id}>
              <Card
                onClick={() => router.push(`/threads/${item.id}`)}
                variant="outlined"
              >
                <CardActionArea>
                  <Box display={item.image ? "block" : "none"}>
                    <CardMedia className={classes.cardMedia}
                      image={item.image}
                      title={item.imageTitle ? item.imageTitle : null}
                    />
                  </Box>
                  <CardContent>
                    <Grid container spacing={1} alignItems="center" direction="row">
                      <Grid item>
                        <Avatar
                          src={item.user.image ? item.user.image.address : null}
                          variant="circle"
                        />
                      </Grid>
                      <Grid item>
                        <Box display={item.name ? "block" : "none"}>
                          <Typography variant="h6">
                            {item.name}
                          </Typography>
                        </Box>
                        <Box display={item.author ? "block" : "none"}>
                          <Typography variant="body1">
                            {item.author}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container justify="flex-end">
                      <Grid item align="right">
                        <StatCounterBox compact image={item.image} upCount={item.upCount} />
                      </Grid>
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        )
        : <NoContentsBox/>
      }
    </>
  );
}

import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import StatCounterBox from './StatCounterBox';

const useStyles = makeStyles(() => ({
  avatar: {
    backgroundColor: "white",
    color: "black",
    height: '2.5rem',
    width: '2.5rem',
  },
  card: {
    border: '0.1rem solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '0.5rem',
    padding: '0rem',
    variant: 'outlined',
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  authorTypography: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 300,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
  contentTypography: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 300,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
  titleTypography: {
    fontFamily: "Ubuntu",
    fontSize: 20,
    fontWeight: 400,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
}));


export default function ThreadGrid({ items }) {
  const classes = useStyles();
  return (
    <Grid container alignments="center" justify="flex-start">
      {[items].flat().map((item) => (
        <Grid item xs={12} sm={6} key={item.id}>
          <Card
            className={classes.card}
            onClick={item.onClick ? item.onClick : null}
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
                    <Avatar className={classes.avatar}
                      src={item.avatar}
                      variant="circle"
                    />
                  </Grid>
                  <Grid item>
                    <Box display={item.name ? "block" : "none"}>
                      <Typography className={classes.titleTypography}>
                        {item.name}
                      </Typography>
                    </Box>
                    <Box display={item.author ? "block" : "none"}>
                      <Typography className={classes.contentTypography}>
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
)
    )}
    </Grid>
  );
}

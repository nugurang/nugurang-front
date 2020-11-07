import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  card: {
    border: '0.1rem solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '0.5rem',
    padding: '0rem 0rem',
    variant: 'outlined',
    position: 'relative',
  },
  cardMedia: {
    height: 0,
    paddingTop: '100%', // 1:1
  },
  cardTitleTypography: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 300,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
  cardScoreTypography: {
    color: 'black',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    border: '0rem solid',
    borderColor: 'rgba(0, 0, 0, 1)',
    borderRadius: 30,
    fontFamily: "Ubuntu",
    fontSize: 18,
    fontWeight: 400,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
    padding: '0rem 0.2rem',
    position: 'absolute',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
  }
}));


export default function ThreadGrid({ items }) {
  const classes = useStyles();
  return (
    <Grid container alignments="center" justify="flex-start">
      {[items].flat().map((item) => (
        <Grid item xs={4} sm={3} key={item.id}>
          <Card className={classes.card} variant="outlined">
            <CardActionArea>
              <CardMedia className={classes.cardMedia}
                image={item.image}
                name={item.name}
              />
              <Typography className={classes.cardScoreTypography}>
                {item.score}
              </Typography>
              <Typography className={classes.cardTitleTypography} align="center">
                {item.name}
              </Typography>
            </CardActionArea>
          </Card>
        </Grid>
)
    )}
    </Grid>
  );
}
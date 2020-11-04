import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import 'array-flat-polyfill';


const useStyles = makeStyles(() => ({
  card: {
    border: '0rem solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '0rem',
    padding: '0rem',
    variant: 'outlined',
  },
  cardMedia: {
    height: 0,
    paddingTop: '100%', // 1:1
  },
}));


export default function CallingCard({ children, image=null, onClick=null }) {
  const classes = useStyles();
  let key=0;
  return (
    <Card variant="outlined">
      <CardActionArea onClick={onClick || null}>
        <Grid container direction="row">
          <Grid item xs={4}>
            {
              image ?
              (
                <CardMedia className={classes.cardMedia}
                  image={image}
                />
              ) : null
            }
          </Grid>
          <Grid item>
            <CardContent>
              {[children].flat().map((child) => <div key={++key}>{child}</div>)}
            </CardContent>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
}
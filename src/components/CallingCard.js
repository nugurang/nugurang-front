import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


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
    height: '100%',
    width: 'auto',
    paddingTop: '100%', // 1:1
  },
  doubleLineEllipsis: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical"
  },
}));


export default function CallingCard({ image=null, label=null, onClick=null }) {
  const classes = useStyles();
  const key=0;
  return (
    <Card variant="outlined">
      <CardActionArea onClick={onClick || null}>
        <Grid container alignItems="center" direction="row">
          <Grid item xs={3}>
            {
              image
              ? <CardMedia className={classes.cardMedia} image={image} />
              : null
            }
          </Grid>
          <Grid item xs={9}>
            <Typography variant="body1" className={classes.doubleLineEllipsis}>{label}</Typography>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
}
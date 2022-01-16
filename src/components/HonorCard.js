import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  cardMedia: {
    height: 0,
    paddingTop: '100%', // 1:1
  },
  cardScoreTypography: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: 30,
    maxWidth: "80%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
    padding: '0rem 0.2rem',
    position: 'absolute',
    bottom: '2.5rem',
    left: '50%',
    transform: 'translateX(-50%)',
  }
}));


export default function HonorCard({ honor }) {
  const classes = useStyles();
  return (
    <Card className={classes.card} variant="outlined">
      <CardActionArea>
        <CardMedia className={classes.cardMedia} image={honor.position.image ? honor.position.image.address : null} name={honor.name} />
        <Typography className={classes.cardScoreTypography} variant="subtitle2">{honor.honor}</Typography>
        <Typography align="center" variant="subtitle1">{honor.position.name}</Typography>
      </CardActionArea>
    </Card>
  );
}
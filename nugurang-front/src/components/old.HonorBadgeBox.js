import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
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


export default function HonorBadgeBox({ image, name, score }) {
  const classes = useStyles();
  return (
    <Box>
      <Card className={classes.card} variant="outlined">
        <CardActionArea>
          <CardMedia className={classes.cardMedia}
            image={image}
            name={name}
          />
          <Typography className={classes.cardScoreTypography} variant="subtitle2">{score}</Typography>
          <Typography variant="subtitle2">{name}</Typography>
        </CardActionArea>
      </Card>
    </Box>
  );
}
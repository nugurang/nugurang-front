import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(() => ({
  card: {
    border: '0.1rem solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '0rem 0rem',
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
          <Typography className={classes.cardScoreTypography}>
            {score}
          </Typography>
          <Typography className={classes.cardTitleTypography} align="center">
            {name}
          </Typography>
        </CardActionArea>
      </Card>
    </Box>
  );
}
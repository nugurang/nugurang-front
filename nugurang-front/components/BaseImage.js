import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/styles';


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
    paddingTop: '56.25%', // 16:9
  },
}));


export default function BaseImage({ image, imageTitle, onClick }) {
  const classes = useStyles();
  return (
    <Card
      className={classes.card}
      onClick={onClick || null}
      variant="outlined"
    >
      {
        image ?
        (
          <CardMedia className={classes.cardMedia}
            image={image}
            title={imageTitle || null}
          />
        ) : null
      }
    </Card>
  );
}
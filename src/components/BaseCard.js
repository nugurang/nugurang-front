import React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  card: {
    border: '0.1rem solid',
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
  typography: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 400,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
}));

export default function BaseCard({ children, image, imageTitle, onClick }) {
  const classes = useStyles();
  return (
    <Card
      className={classes.card}
      onClick={onClick || null}
      variant="outlined"
    >
      <CardActionArea>
        <Box display={image ? "block" : "none"}>
          <CardMedia className={classes.cardMedia}
            image={image}
            title={imageTitle || null}
          />
        </Box>
        <CardContent>
          {children}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
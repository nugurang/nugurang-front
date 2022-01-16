import React, { useRef } from 'react'
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));


export default function ImageUploadingBox({ image }) {
  const classes = useStyles();
  const selectedImageAddress = useRef(null);


  function handleUploadClick() {
    const file = event.target.files[0];
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);

    reader.onloadend = function(e) {
      this.setState({
        selectedImageAddress: [reader.result]
      });
    }.bind(this);

    this.setState({
      selectedImageAddress: event.target.files[0],
    });
  };


  return (
    <Box className={classes.box}>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={12} sm={8}>
          <Card className={classes.card} variant="outlined">
            <CardMedia className={classes.cardMedia} image={image} />
          </Card>
        </Grid>
        <Grid container spacing={2} xs={12} sm={4} alignItems="center" justify="space-evenly">
          <Grid item align="center">
            <Button onClick={handleUploadClick}>Upload image</Button>
          </Grid>
          <Grid item align="center">
            <Button>Delete image</Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
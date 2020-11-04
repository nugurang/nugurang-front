import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));


export default function ImageUploadingBox({ image }) {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={12} sm={8}>
          <Card className={classes.card} variant="outlined">
            <CardMedia className={classes.cardMedia} image={image}/>
          </Card>
        </Grid>
        <Grid container spacing={2} xs={12} sm={4} alignItems="center" justify="space-evenly">
          <Grid item align="center">
            <Button>Upload image</Button>
          </Grid>
          <Grid item align="center">
            <Button>Delete image</Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
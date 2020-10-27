import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  box: {
    border: '0rem solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '0.5rem',
    padding: '0rem',
    variant: 'outlined',
  },
  button: {
    background: '#FEFEFE',
    border: '0.1rem solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    color: 'default',
    margin: '0.5rem',
    padding: '0.5rem 1em',
    variant: 'outlined',
  },
  buttonTypography: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 400,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
  card: {
    border: '0.1rem solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '0.5rem',
    variant: 'outlined',
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));


export default function ImageUploadingBox({ image }) {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.box}>
        <Grid container alignItems="center" justify="center">
          <Grid item xs={12} sm={8}>
            <Card className={classes.card} variant="outlined">
              <CardMedia className={classes.cardMedia}
                image={image}
              />
            </Card>
          </Grid>
          <Grid container spacing={2} xs={12} sm={4} alignItems="center" justify="space-evenly">
            <Grid item align="center">
              <Button className={classes.button}>
                <Typography className={classes.buttonTypography}>Upload image</Typography>
              </Button>
            </Grid>
            <Grid item align="center">
              <Button className={classes.button}>
                <Typography className={classes.buttonTypography}>Delete image</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
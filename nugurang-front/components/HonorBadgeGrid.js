import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  box: {
    border: '0px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '5px',
    padding: '15px',
    variant: 'outlined',
  },
  button: {
    background: '#FEFEFE',
    border: '1px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    color: 'default',
    margin: '10px',
    padding: '10px 30px',
    variant: 'outlined',
  },
  buttonTypography: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 300,
  },
  card: {
    border: '1px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '0px',
    padding: '0px',
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
  },
  cardValueTypography: {
    color: 'black',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    border: '0px solid',
    borderColor: 'rgba(0, 0, 0, 1)',
    borderRadius: 30,
    fontFamily: "Ubuntu",
    fontSize: 18,
    fontWeight: 400,
    padding: '0px 5px',
    position: 'absolute',
    bottom: '30px', 
    left: '50%', 
    transform: 'translateX(-50%)',
  }
});


function HonorBadgeGrid(props) {

    const { classes } = props

    return (
      <React.Fragment>
        <CssBaseline />
        <Box className={classes.box}>
          <Grid container spacing={2}>

            {props.honorBadges.map(honorBadge => (
              <Grid item xs={4} sm={3}>
                <Card className={classes.card} variant="outlined">
                  <CardActionArea>
                    <CardMedia className={classes.cardMedia}
                      image={honorBadge.image}
                      name={honorBadge.name}
                    />
                    <Typography className={classes.cardValueTypography}>
                      {honorBadge.value}
                    </Typography>
                    <Typography className={classes.cardTitleTypography} align="center">
                      {honorBadge.name}
                    </Typography>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}

          </Grid>
        </Box>
      </React.Fragment>
    );
}

HonorBadgeGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HonorBadgeGrid);
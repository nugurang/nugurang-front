import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  box: {
    border: '0px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '5px',
    padding: '0px',
    variant: 'outlined',
  },
  cardTitleTypography: {
    fontFamily: "Ubuntu",
    fontSize: 28,
    fontWeight: 300,
    margin: '0px',
  },
  cardSubtitleTypography: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 300,
    margin: '0px',
  },
  contentPaper: {
    border: '1px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '5px',
    padding: '5px',
    variant: 'outlined',
  },
  contentTypography: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 300,
    margin: '10px',
  },
  card: {
    border: '1px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '5px',
    padding: '5px',
    variant: 'outlined',
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});


function ArticleBox(props) {

  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <Box className={classes.box} elevation={0}>

        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={12}justify='space-around'>
           

            <Card className={classes.card} variant="outlined">
              <CardActionArea>
                <CardMedia className={classes.cardMedia}
                  image={props.article.image}
                  title={props.article.title}
                />
                <CardContent>
                  <Typography className={classes.cardTitleTypography}>
                    {props.article.title}
                  </Typography>
                  <Typography className={classes.cardSubtitleTypography}>
                    {props.article.subtitle}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} justify='space-around'>
            <Paper className={classes.contentPaper} variant='outlined'>
              <Typography className={classes.contentTypography}>
                {props.article.content}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}

ArticleBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ArticleBox);
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = {
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
    wordWrap: "break-word",
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
    wordWrap: "break-word",
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
};


function ArticleBox(props) {
  const { classes } = props;
  return (
    <>
      <Box className={classes.box} elevation={0}>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={12} justify='space-around'>
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
                  <Typography className={classes.contentTypography}>
                    {props.article.content}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

ArticleBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ArticleBox);

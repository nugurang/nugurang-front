import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import ChatIcon from '@material-ui/icons/Chat';
import ImageIcon from '@material-ui/icons/Image';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';


const styles = theme => ({
  box: {
    border: '0px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '5px',
    padding: '0px',
    variant: 'outlined',
  },
  chip: {
    height: "20px",
    width: "auto",
    margin: "0px",
  },
  typographyPrimary: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 300,
  },
  typographySecondary: {
    fontFamily: "Ubuntu",
    fontSize: 14,
    fontWeight: 300,
  },
  typographyLikeComment: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 300,
  },
  iconImage: {
    height: "20px",
    width: "20px",
    margin: "6px 2px 0px -10px",
  },
  iconLikeComment: {
    height: "20px",
    width: "20px",
    margin: "5px -10px 0px -10px",
  },
});


function ArticleListWithLikeComment(props) {

    const { classes } = props

    return (
      <React.Fragment>
        <CssBaseline />
        <Box className={classes.box}>
          <List>
            {props.articles.map(article => (
              <ListItem button alignItems="flex-start">
                <Grid container spacing={2} alignItems="center" direction="row" justify="space-around">
                  <Grid item xs align="left">
                    <ListItemText
                      primary={<Typography className={classes.typographyPrimary} >{article.title}</Typography>}
                      secondary={<Typography className={classes.typographySecondary} >{article.content}</Typography>}
                    />
                  </Grid>
                  <Grid item container xs={4} spacing={2} alignItems="center" justify="flex-end">
                    {
                      article.chip ?
                      <Grid item align="right">
                        {article.chip}
                      </Grid>: null
                    }
                    <Grid container spacing={2} alignItems="center" direction="row" justify="flex-end">
                      {
                        article.image ?
                        <Grid item align="right">
                          <ImageIcon className={classes.iconImage} />
                        </Grid>: null
                      }
                      <Grid item align="right">
                        <ThumbUpIcon className={classes.iconLikeComment} />
                      </Grid>
                      <Grid item align="right">
                        <Typography className={classes.typographyLikeComment}>{article.like}</Typography>
                      </Grid>
                      <Grid item align="right">
                        <ChatIcon className={classes.iconLikeComment} />
                      </Grid>
                      <Grid item align="right">
                        <Typography className={classes.typographyLikeComment}>{article.comment}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </Box>
      </React.Fragment>
    );
}

ArticleListWithLikeComment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ArticleListWithLikeComment);
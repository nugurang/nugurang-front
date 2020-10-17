import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import ChatIcon from '@material-ui/icons/Chat';
import ImageIcon from '@material-ui/icons/Image';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';


const styles = {
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
  titleTypography: {
    fontFamily: "Ubuntu",
    fontSize: 18,
    fontWeight: 400,
    overflow: "hidden", 
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
  likeCommentTypography: {
    fontFamily: "Ubuntu",
    fontSize: 18,
    fontWeight: 300,
    overflow: "hidden", 
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
  likeCommentIcon: {
    height: "20px",
    width: "20px",
    margin: "0px 5px",
  },
};


function ArticleDenseListWithLikeComment(props) {
  const { classes } = props;
  return (
    <>
      <Box className={classes.box}>
        <List dense>
          {props.articles.map(article => (
            <ListItem button key={article.id}>
              <Grid container spacing={0} alignItems="center" justify="flex-end">
                <Grid item container alignItems="center" direction="row" justify="flex-end">
                  <Grid item xs>
                    <ListItemText primary={<Typography className={classes.titleTypography}>{article.title}</Typography>} />
                  </Grid>
                  <Grid item xs={3}>
                    <div key={article.id}>
                      {
                        article.chip ?
                        (
                          <Grid item align="right">
                            <Chip className={classes.chip} label={article.chip} />
                          </Grid>
                        ) : null
                      }
                    </div>
                  </Grid>
                </Grid>
                <Grid item container alignItems="center">
                  <Grid>
                    <div key={article.id}>
                      {
                        article.image ?
                        (
                          <Grid item align="right">
                            <ImageIcon className={classes.likeCommentIcon} />
                          </Grid>
                        ) : null
                      }
                    </div>
                  </Grid>
                  <Grid item align="right">
                    <ThumbUpIcon className={classes.likeCommentIcon} />
                  </Grid>
                  <Grid item align="right">
                    <div key={article.id}>
                      <Typography className={classes.likeCommentTypography}>{article.like}</Typography>
                    </div>
                  </Grid>
                  <Grid item align="right">
                    <ChatIcon className={classes.likeCommentIcon} />
                  </Grid>
                  <Grid item align="right">
                    <div key={article.id}>
                      <Typography className={classes.likeCommentTypography}>{article.comment}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}

ArticleDenseListWithLikeComment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ArticleDenseListWithLikeComment);

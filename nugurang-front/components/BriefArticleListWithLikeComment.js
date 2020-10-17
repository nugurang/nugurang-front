import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

import ChatIcon from '@material-ui/icons/Chat';
import ImageIcon from '@material-ui/icons/Image';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';


const styles = {
  avatar: {
    fontSize: 24,
    height: '50px', 
    margin: '0px',
    width: '50px'
  },
  box: {
    margin: '5px',
    padding: '0px',
  },
  list: {
    border: '0px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '5px',
    padding: '0px',
    variant: 'outlined',
  },
  authorTypography: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 300,
    margin: '0px 0px',
    overflow: "hidden", 
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
  titleTypography: {
    fontFamily: "Ubuntu",
    fontSize: 18,
    fontWeight: 400,
    margin: '0px 0px',
    overflow: "hidden", 
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
  contentTypography: {
    border: '0px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 10,
    fontFamily: "Ubuntu",
    fontSize: 18,
    fontWeight: 300,
    margin: '0px',
    padding: '5px',
    overflow: "hidden", 
    textOverflow: "ellipsis",
    wordWrap: "break-word",
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
};


function BriefArticleListWithLikeComment(props) {
  const { classes } = props;
  return (
    <>
      <Box className={classes.box}>
        <List>
          {props.articles.map(article => (
            <div key={article.id}>
              <ListItem button alignItems="flex-start">
                <Grid container spacing={2}>

                  <Grid item container xs={12} spacing={2} direction="row" justify="flex-start">
                    <Grid item align="left">
                      <Avatar className={classes.avatar}
                        alt={article.name}
                        src={article.image}
                      />
                    </Grid>
                    
                    <Grid item spacing={2} justify="flex-start">
                      <Grid item align="left">
                        <Typography className={classes.authorTypography}>
                          {article.author}
                        </Typography>
                      </Grid>
                      <Grid item align="left">
                        <Typography className={classes.authorTypography}>
                          {article.title}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography noWrap className={classes.contentTypography}>
                      {article.content}
                    </Typography>
                  </Grid>

                  <Grid container spacing={2} alignItems="center" direction="row" justify="flex-end">
                    {
                      article.image ? 
                        <Grid item align="right"><ImageIcon className={classes.iconImage} /></Grid>
                       : null
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
              </ListItem>
            </div>
          ))}
        </List>
      </Box>
    </>
  );
}

BriefArticleListWithLikeComment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BriefArticleListWithLikeComment);







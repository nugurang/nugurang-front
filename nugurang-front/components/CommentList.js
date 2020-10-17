import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import StarsIcon from '@material-ui/icons/Stars';

const styles = {
  box: {
    border: '0px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '5px',
    padding: '0px',
    variant: 'outlined',
  },
  titleTypography: {
    fontFamily: "Ubuntu",
    fontSize: 14,
    fontWeight: 300,
    overflow: "hidden", 
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
  contentTypography: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 300,
    wordWrap: "break-word",
  },
};


function CommentList(props) {
  const { classes } = props;
  return (
    <>
      <Box className={classes.box}>
        <List>
          {props.comments.map(comment => (
            <ListItem key={comment.id} button alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>
                  <StarsIcon />
                </Avatar>
              </ListItemAvatar>
              <div key={comment.id}>
                <ListItemText
                  primary={<Typography className={classes.titleTypography}>{comment.author}</Typography>}
                  secondary={<Typography className={classes.contentTypography}>{comment.content}</Typography>}
                />
              </div>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}

CommentList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommentList);

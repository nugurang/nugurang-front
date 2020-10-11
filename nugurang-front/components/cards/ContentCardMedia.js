import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const styles = {
  root: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

function ContentCardMedia(props) {
  const { classes, children, className, ...other } = props;

  return (
    <CardMedia className={clsx(classes.root, className)} elevation={0} {...other}>
      {children || ''}
    </CardMedia>
  );
}

ContentCardMedia.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(ContentCardMedia);
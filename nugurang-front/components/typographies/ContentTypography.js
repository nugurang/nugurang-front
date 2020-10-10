import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const styles = {
  root: {
    fontFamily: "Ubuntu",
    fontSize: 18,
    fontWeight: 300,
  },
};

function ContentTypography(props) {
  const { classes, children, className, ...other } = props;

  return (
    <Typography className={clsx(classes.root, className)} {...other}>
      {children || ''}
    </Typography>
  );
}

ContentTypography.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(ContentTypography);
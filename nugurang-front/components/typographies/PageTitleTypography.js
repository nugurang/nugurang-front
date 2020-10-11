import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const styles = {
  root: {
    fontFamily: "Ubuntu",
    fontSize: 32,
    fontWeight: 300,
    lineHeight: 1.0,
    letterSpacing: 0.0,
    padding: '20px 10px 0px 10px',
  },
};

function PageTitleTypography(props) {
  const { classes, children, className, ...other } = props;

  return (
    <Typography className={clsx(classes.root, className)} {...other}>
      {children || ''}
    </Typography>
  );
}

PageTitleTypography.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(PageTitleTypography);
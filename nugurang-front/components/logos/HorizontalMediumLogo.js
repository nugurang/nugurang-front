import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

const styles = {
  font: {
    fontFamily: "Ubuntu",
    fontSize: 48,
    fontWeight: 400,
    margin: '10px',
    padding: '10px',
  },
};

function HorizontalMediumLogo(props) {
  const { classes, children, className, ...other } = props;

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Avatar alt="Nugurang"
        src="/static/favicons/favicon-nugurang.png"
        variant="square"
      />
      <Typography className={clsx(classes.font, className)} {...other}>
        Nugurang
      </Typography>
    </Box>
  );
}

HorizontalMediumLogo.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(HorizontalMediumLogo);
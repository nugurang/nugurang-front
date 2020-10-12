import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const styles = {
  button: {
    background: '#FEFEFE',
    border: '1px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    color: 'default',
    margin: '5px',
    padding: '5px 30px',
    variant: 'outlined',
  },
  buttonTypography: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 400,
  },
};

function UniversalButton(props) {
  const { classes, children, className, ...other } = props;

  return (
    <Button className={classes.button}>
      <Typography className={classes.buttonTypography}>{props.label}</Typography>
    </Button>
  );
}

UniversalButton.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(UniversalButton);
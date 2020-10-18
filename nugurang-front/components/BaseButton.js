import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  button: {
    background: '#FEFEFE',
    border: '0.1rem solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    color: 'default',
    margin: '0.5rem',
    padding: '0.5rem 1.5rem',
    variant: 'outlined',
  },
  typography: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 400,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
}));

export default function BaseButton({ endIcon, label, startIcon, onClick }) {
  const classes = useStyles();
  return (
    <Button
      className={classes.button}
      startIcon={startIcon || null}
      endIcon={endIcon || null}
      onClick={onClick || null}
    >
      <Typography className={classes.typography}>{label}</Typography>
    </Button>
  );
}
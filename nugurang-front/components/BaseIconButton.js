import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  button: {
    background: '#FEFEFE',
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

export default function BaseIconButton({ icon, onClick }) {
  const classes = useStyles();
  return (
    <IconButton
      className={classes.iconButton}
      onClick={onClick || null}
    >
      {icon}
    </IconButton>
  );
}
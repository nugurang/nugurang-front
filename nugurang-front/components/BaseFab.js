import React from 'react';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import 'array-flat-polyfill';

const useStyles = makeStyles(() => ({
  fab: {
    bottom: "7.5rem",
  },
}));

export default function BaseFab({ children, onClick, ariaLabel="null", color="primary" }) {
  const classes = useStyles();
  let key = 0;
  return (
    <Fab
      className={classes.fab}
      color={color}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {[children].flat().map((child) => <div key={++key}>{child}</div>)}
    </Fab>
  );
}
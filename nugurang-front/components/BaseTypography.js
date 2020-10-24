import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles(() => ({
  typography: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 400,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
}));


export default function BaseTypography({ children, size=16, weight=300 }) {
  const classes = useStyles();
  let key = 0;
  return (
    <Typography className={classes.typography} style={{fontSize: {size}, fontWeight: {weight}}}>
      {[children].flat().map((child) => <div key={++key}>{child}</div>)}
    </Typography>
  );
}
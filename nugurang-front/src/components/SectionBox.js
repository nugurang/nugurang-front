import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import 'array-flat-polyfill';

const useStyles = makeStyles(() => ({
  margin: {
    margin: '1rem 0',
  },
  borderlessPaper: {
    border: '0.1rem solid',
    borderColor: 'rgba(0, 0, 0, 0)',
    borderRadius: 5,
    margin: '0rem 1rem',
    padding: '0.5rem',
  },
}));


export default function SectionBox({ children, border=true, titleBar=null, }) {
  const classes = useStyles();
  let key = 0;
  return (
    <Box className={classes.margin}>
      {titleBar ? titleBar : null}
      <Paper className={border ? null : classes.borderlessPaper} elevation={0}>
        {[children].flat().map((child) => <div key={++key}>{child}</div>)}
      </Paper>
    </Box>
  );
}
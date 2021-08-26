import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import 'array-flat-polyfill';

const useStyles = makeStyles(() => ({
  margin: {
    margin: '1rem 0',
  },
  titleBarMargin: {
    margin: '0.5rem',
  },
  borderlessPaper: {
    border: '0rem solid',
    borderColor: 'rgba(0, 0, 0, 0)',
    margin: '0rem 1rem',
    padding: '0rem',
  },
}));


export default function SectionBox({ children, border=true, titleBar=null, }) {
  const classes = useStyles();
  let key = 0;
  return (
    <Box className={classes.margin}>
      <Paper
        className={border ? null : classes.borderlessPaper}
        elevation={border ? 3 : 0}
      >
        <Box className={classes.titleBarMargin} display={titleBar ? "block" : "none"}>
          {titleBar || null}
        </Box>
        {[children].flat().map((child) => <div key={++key}>{child}</div>)}
      </Paper>
    </Box>
  );
}
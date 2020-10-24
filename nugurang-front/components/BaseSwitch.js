import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

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

export default function BaseButton({ checked, label, onChange, }) {
  const classes = useStyles();
  return (
    <Grid component="label" container alignItems="center" spacing={1}>
      <Grid item>
        <Switch name="events" checked={checked} onChange={onChange} />
      </Grid>
      <Grid item><Typography className={classes.typography}>{label}</Typography></Grid>
    </Grid>
  );
}
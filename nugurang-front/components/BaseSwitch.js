import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  switch: {
    color: "black",
    "&.Mui-checked": {
      color: "#9778ec"
    },
    '& .MuiSwitch-colorSecondary': {
      '&.Mui-checked': {
        color: '#9778ec',
      },
      '&.Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#9778ec',
      },
    },
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

export default function BaseButton({ checked, label, onChange, }) {
  const classes = useStyles();
  return (
    <Grid component="label" container alignItems="center" spacing={1}>
      <Grid item>
        <Switch className={classes.switch} name="events" checked={checked} onChange={onChange} />
      </Grid>
      <Grid item><Typography className={classes.typography}>{label}</Typography></Grid>
    </Grid>
  );
}
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  textField: {
    '& label.Mui-focused': {
      color: '#9778ec',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#9778ec',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'gray',
      },
      '&:hover fieldset': {
        borderColor: 'gray',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#9778ec',
      },
    },
  },
}));

export default function BaseTextField({ label }) {
  const classes = useStyles();
  return (
    <FormControl fullWidth variant="filled">
      <TextField
        className={classes.textField}
        inputProps={{ style: { fontFamily: "Ubuntu" } }}
        inputLabelProps={{ style: { fontFamily: "Ubuntu" } }}
        label={label || null}
        variant="outlined"
      />
    </FormControl>
  );
}
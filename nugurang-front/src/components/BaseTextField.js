import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

export default function BaseTextField({ label }) {
  return (
    <FormControl fullWidth variant="filled">
      <TextField
        inputProps={{ style: { fontFamily: "Ubuntu" } }}
        inputLabelProps={{ style: { fontFamily: "Ubuntu" } }}
        label={label || null}
        variant="outlined"
      />
    </FormControl>
  );
}
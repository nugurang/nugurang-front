import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(() => ({
  textField: {
    '& label.Mui-focused': {
      color: '#9778ec',
    },
    '& .MuiSelect-underline:after': {
      borderBottomColor: '#9778ec',
    },
    '& .MuiOutlinedSelect-root': {
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


export default function BaseMultiSelect({ items, label, onChange, placeholder=null }) {
  const classes = useStyles();
  return (
    <Autocomplete
      multiple
      onChange={onChange}
      options={items}
      getOptionLabel={option => option.label}
      filterSelectedOptions
      renderInput={params => (
        <TextField
          {...params}
          className={classes.textField}
          variant="outlined"
          label={label}
          placeholder={placeholder}
          margin="normal"
          fullWidth
        />
      )}
    />
  );
}
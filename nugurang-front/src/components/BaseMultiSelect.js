import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


export default function BaseMultiSelect({ items, label, onChange, placeholder=null }) {
  return (
    <Autocomplete
      multiple
      limitTags={2}
      onChange={onChange}
      options={items}
      getOptionLabel={option => option.label}
      filterSelectedOptions
      renderInput={params => (
        <TextField
          {...params}
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
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  select: {
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


export default function BaseSelect({ items, label, onChange, value }) {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl} variant="outlined">
      <InputLabel>Age</InputLabel>
      <Select className={classes.select} value={value} onChange={onChange} label={label}>
        {[items].flat().map((item) => (
          <MenuItem key={item.id} value={item.value}>
            <Typography className={classes.menuItem}>
              {item.label ? item.label : item.value}
            </Typography>
          </MenuItem>
        )
        )}
      </Select>
    </FormControl>
  );
}
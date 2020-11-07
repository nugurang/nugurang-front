import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';

import BaseTextField from './BaseTextField';

const useStyles = makeStyles(() => ({
  box: {
    border: '0.1rem solid',
    borderColor: 'rgba(0, 0, 0, 0)',
    borderRadius: 5,
    margin: '0.5rem',
    padding: '0.5rem',
    variant: 'outlined',
  },
}));


export default function SearchBox({ items, link=null }) {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <Grid container spacing={2} alignItems="center" justify="space-between">
        <Grid item xs>
          <BaseTextField label="Search users" />
        </Grid>
        <Grid item>
          <IconButton type="submit" aria-label="search">
            <SearchIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}
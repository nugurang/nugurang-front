import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router'
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  box: {
    border: '0px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '5px',
    padding: '0px',
    variant: 'outlined',
  },
  textField: {
    '& label.Mui-focused': {
      color: 'purple',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'purple',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderColor: 'gray',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'purple',
      },
    },
  },
});


function SectionTitleBoxWithTextField(props) {

  const { classes } = props
  const router = useRouter()

  return (
    <React.Fragment>
      <CssBaseline />
      <Box className={classes.box}>
        <Grid container spacing={2} alignItems="center" justify="flex-start">
          <Grid item align="center">
            <Avatar>
              {props.icon}
            </Avatar>
          </Grid>
          <Grid item align="center">
            <FormControl fullWidth variant="filled">
              <TextField
                className={classes.textField}
                id="outlined-basic"
                inputProps={{ style: { fontFamily: "Ubuntu" } }}
                InputLabelProps={{ style: { fontFamily: "Ubuntu" } }}
                label={props.title}
                variant="outlined"
              />
            </FormControl>
          </Grid>

        </Grid>
      </Box>
    </React.Fragment>
  );
}

SectionTitleBoxWithTextField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SectionTitleBoxWithTextField);
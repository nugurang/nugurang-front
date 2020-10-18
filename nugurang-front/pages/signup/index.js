/* import { gql, useQuery } from '@apollo/client'; */
import { makeStyles } from '@material-ui/styles';
import { useRouter } from 'next/router';
import React from 'react';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import Layout from '../../components/Layout';

import BaseButton from '../../components/BaseButton';
import ImageUploadingBox from '../../components/ImageUploadingBox';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';



const useStyles = makeStyles(() => ({
  box: {
    border: '0px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '0px',
    padding: '20px',
    variant: 'outlined',
  },
  button: {
    background: '#FEFEFE',
    border: '1px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    color: 'default',
    margin: '5px',
    padding: '5px 30px',
    variant: 'outlined',
  },
  buttonTypography: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 400,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
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
        borderColor: 'gray',
      },
      '&:hover fieldset': {
        borderColor: 'gray',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'purple',
      },
    },
  },
}));


export default function SignUpIndex() {
  const router = useRouter();
  const classes = useStyles();
  return (
    <Layout>

      <SectionTitleBar title="Sign up" backButton="true" />


      <SectionBox titleBar={<SectionTitleBar title="Add profile image" icon=<AddAPhotoIcon /> />}>
        <ImageUploadingBox image="/static/images/sample_1.jpg" />
      </SectionBox>


      <SectionBox titleBar={<SectionTitleBar title="Add username" icon=<PersonAddIcon /> />}>
        <Box className={classes.box}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
                  className={classes.textField}
                  inputProps={{ style: { fontFamily: "Ubuntu" } }}
                  InputLabelProps={{ style: { fontFamily: "Ubuntu" } }}
                  label="Enter username"
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item>
              <BaseButton label="Verify" />
            </Grid>
          </Grid>
        </Box>
      </SectionBox>


      <Box className={classes.box} align="center">
        <BaseButton label="Submit" onClick={() => router.push('/signup/welcome')} />
      </Box>

    </Layout>
  );
}
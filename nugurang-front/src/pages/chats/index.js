import { makeStyles } from '@material-ui/styles';
import { useRouter } from 'next/router';
import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import BaseButton from '../../components/BaseButton';
import Layout from '../../components/Layout';
import SectionTitleBar from '../../components/SectionTitleBar';


const useStyles = makeStyles(() => ({
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
  welcomeTypography: {
    fontFamily: "Ubuntu",
    fontSize: 30,
    fontWeight: 400,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
}));


export default function Welcome() {
  const router = useRouter();
  const classes = useStyles();
  return (
    <Layout>

      <SectionTitleBar title="Sorry!" backButton backButtonLink="/home" />

      <Box mt="50%">
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={12} align="center">
            <Typography className={classes.welcomeTypography}>Chatting service is on development.</Typography>
          </Grid>
          <Grid item xs={12} align="center">

            <Box className={classes.box} align="center">
              <BaseButton label="Go back" onClick={() => router.back()} />
            </Box>

          </Grid>
        </Grid>
      </Box>

    </Layout>
  );
}
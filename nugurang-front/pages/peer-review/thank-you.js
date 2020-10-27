import { makeStyles } from '@material-ui/styles';
import { useRouter } from 'next/router';
import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Layout from '../../components/Layout';

import BaseButton from '../../components/BaseButton';
import SectionTitleBar from '../../components/SectionTitleBar';


const useStyles = makeStyles(() => ({
  typography: {
    fontFamily: "Ubuntu",
    fontSize: 30,
    fontWeight: 400,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
}));


export default function ThankYou() {
  const router = useRouter();
  const classes = useStyles();
  return (
    <Layout>
      <SectionTitleBar title="Review completed!"/>
      <Box mt="50%">
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={12} align="center">
            <Typography className={classes.typography}>Thank you for your cooperation!</Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Box className={classes.box} align="center">
              <BaseButton label="Go home" onClick={() => router.push('/home')} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}

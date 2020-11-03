import { gql, useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';
import { useRouter } from 'next/router';
import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';

import Layout from '../../components/Layout';

import BaseButton from '../../components/BaseButton';
import SectionTitleBar from '../../components/SectionTitleBar';
import withAuth from '../../components/withAuth';


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



function JoinTeam() {
  const router = useRouter();
  const classes = useStyles();

  return (
    <Layout>
      <SectionTitleBar title="Invitation" backButton />
      <Box mt="50%">
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={12} align="center">
            <Typography className={classes.typography}>Would you like to join?</Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Box className={classes.box} align="center">
              <BaseButton label="Accept" onClick={() => router.push('/home')} />
              <BaseButton label="Decline" onClick={() => router.push('/home')} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}

export default withAuth(JoinTeam);
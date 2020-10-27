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


export const CHECK_USER = gql`
  query {
    currentUser {
      name
    }
  }
`;

function Welcome() {
  const router = useRouter();
  const classes = useStyles();

  const { loading: queryLoading, error: queryError, data } = useQuery(CHECK_USER);
  if (queryLoading) return <p>Loading...</p>;
  if (queryError) return <p>Error :(</p>;

  return (
    <Layout>
      <SectionTitleBar title="Welcome!" icon=<CheckIcon />/>
      <Box mt="50%">
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={12} align="center">
            <Typography className={classes.typography}>Welcome, {data.currentUser.name}!</Typography>
            <Typography className={classes.typography}>Your account is created.</Typography>
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

export default withAuth(Welcome);
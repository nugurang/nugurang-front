import { gql, useQuery } from '@apollo/client';
import {useRouter} from 'next/router';
import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Loading from '../components/Loading';


export const GET_CURRENT_USER = gql`
  query {
    currentUser {
      id
      name
    }
  }
`;


export default function Splash() {
  const router = useRouter();
  const responses = [
    useQuery(GET_CURRENT_USER)
  ];
  const errorResponse = responses.find((response) => response.error)

  if (responses.some((response) => response.loading))
    return <Loading />;
  if (!errorResponse) {
    router.push('/home');
    return null;
  }

  return (
    <Box mt="50%">
      <Grid container justify="center">

        <Grid item xs={12}>
          <Grid container alignItems="center" direction="row" justify="center" spacing={2}>
            <Grid item align="center">
              <img src="/static/favicons/favicon-nugurang.png" alt="Nugurang" />
            </Grid>
            <Grid item align="center">
              <Typography variant="h2" style={{fontWeight: "400"}}>Nugurang</Typography>
            </Grid>
          </Grid>
        </Grid>

        <div style={{ margin: 20 }}>
          <Grid item xs={12} align="center">
            <Button variant="outlined" onClick={() => router.push('/signin')}>Sign in</Button>
          </Grid>
        </div>

      </Grid>
    </Box>
  );
}
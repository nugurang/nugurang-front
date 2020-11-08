import { useRouter } from 'next/router';
import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import FullScreenDialogBox from '../../components/FullScreenDialogBox';
import Layout from '../../components/Layout';
import SectionTitleBar from '../../components/SectionTitleBar';
import withAuth from '../../components/withAuth';


function Chatting() {
  const router = useRouter();
  return (
    <Layout>
      <FullScreenDialogBox titleBar=<SectionTitleBar title="Invitation" backButton />>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={12} align="center">
            <Typography variant="h4">Are you sure to join?</Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Box align="center">
              <Button color="primary" onClick={() => router.back()}>Accept</Button>
              <Button color="error" onClick={() => router.back()}>Decline</Button>
            </Box>
          </Grid>
        </Grid>
      </FullScreenDialogBox>
    </Layout>
  );
}

export default withAuth(Chatting);
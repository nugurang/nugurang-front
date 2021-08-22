import { useRouter } from 'next/router';
import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import withAuthServerSide from '../../utils/withAuthServerSide';

import FullScreenDialogBox from '../../components/FullScreenDialogBox';
import Layout from '../../components/Layout';
import PageTitleBar from '../../components/PageTitleBar';

export const getServerSideProps = withAuthServerSide();

function Chatting() {
  const router = useRouter();
  return (
    <Layout>
      <FullScreenDialogBox titleBar={<PageTitleBar title="Sorry!" backButton />}>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={12} align="center">
            <Typography variant="h4">Chatting service is on development.</Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Box align="center">
              <Button variant="outlined" onClick={() => router.back()}>Go back</Button>
            </Box>
          </Grid>
        </Grid>
      </FullScreenDialogBox>
    </Layout>
  );
}

export default Chatting;

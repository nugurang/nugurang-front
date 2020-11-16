import { makeStyles } from '@material-ui/styles';
import { useRouter } from 'next/router';
import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';

import Layout from '../../../components/Layout';

import FullScreenDialogBox from '../../../components/FullScreenDialogBox';
import PageTitleBar from '../../../components/PageTitleBar';
import withAuth from '../../../components/withAuth';


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


function ThankYou() {
  const router = useRouter();
  const classes = useStyles();
  return (
    <Layout>
      <FullScreenDialogBox titleBar = {<PageTitleBar title="Review completed" icon=<CheckIcon />} />>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={12} align="center">
            <Typography className={classes.typography}>Thank you for your cooperation!</Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Box className={classes.box} align="center">
              <Button variant="outlined" onClick={() => router.push('/home')}>Go home</Button>
            </Box>
          </Grid>
        </Grid>
      </FullScreenDialogBox>
    </Layout>
  );
}

export default withAuth(ThankYou);
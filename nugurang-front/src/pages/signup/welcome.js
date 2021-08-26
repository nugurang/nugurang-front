import { makeStyles } from '@material-ui/styles';
import { useRouter } from 'next/router';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';

import withAuthServerSide from '../../utils/withAuthServerSide';

import FullScreenDialogBox from '../../components/FullScreenDialogBox';
import Layout from '../../components/Layout';
import PageTitleBar from '../../components/PageTitleBar';
import withAuth from '../../components/withAuth';


const useStyles = makeStyles(() => ({
  avatar: {
    fontSize: 48,
    height: '7.5rem',
    margin: '0rem',
    width: '7.5rem'
  },
}));

export const getServerSideProps = withAuthServerSide( async ({ currentUser }) => {
  return {
    props: {
      currentUser,
    },
  };
});

function Welcome({ currentUser }) {
  const router = useRouter();
  const classes = useStyles();

  return (
    <Layout>
      <FullScreenDialogBox titleBar={<PageTitleBar title="Welcome" icon={<CheckIcon />} />}>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={12} align="center">
            <Avatar className={classes.avatar}
              alt={currentUser.name}
              src={currentUser.image ? currentUser.image.address : null}
              variant="circle"
            >
              {currentUser.name.charAt(0).toUpperCase()}
            </Avatar>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h4">
              Welcome,
              {' '}
              {currentUser.name}
              !
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h5">Your account is created.</Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Box align="center">
              <Button variant="contained" onClick={() => router.push('/')}>Go home</Button>
            </Box>
          </Grid>
        </Grid>
      </FullScreenDialogBox>
    </Layout>
  );
}

export default withAuth(Welcome);
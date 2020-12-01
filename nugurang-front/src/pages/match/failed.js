import { gql, useMutation, useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';
import { useRouter } from 'next/router';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';

import FullScreenDialogBox from '../../components/FullScreenDialogBox';
import GraphQlError from '../../components/GraphQlError';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
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

export const CURRENT_USER = gql`
  query {
    currentUser {
      id
      name
      image {
        id
        address
      }
    }
  }
`;


const GET_EVENT = gql`
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      id
      name
      description
      recruitingStart
      recruitingEnd
      eventStart
      eventEnd
    }
  }
`;



function Failed() {
  const router = useRouter();
  const classes = useStyles();

  const results = [
    [null, useQuery(CURRENT_USER)],
    [null, useQuery(GET_EVENT, {variables: {id: router.query.event}})],
  ];
  const [currentUser, getEvent] = results.map(result => result[0]);
  const user = results[0][1].data?.currentUser;
  const event = results[1][1].data?.getEvent;

  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />;

  return (
    <Layout>
      <FullScreenDialogBox titleBar=<PageTitleBar title="Match joined!" icon=<CheckIcon /> />>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={12} align="center">
            <Avatar className={classes.avatar}
              alt={user.name}
              src={user.image ? user.image.address : null}
              variant="circle"
            >
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h4">
              {"Your match request is expired."}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Box align="center">
              <Button variant="outlined" onClick={() => router.push(`/home`)}>Go Home</Button>
            </Box>
          </Grid>
        </Grid>
      </FullScreenDialogBox>
    </Layout>
  );
}

export default withAuth(Failed);
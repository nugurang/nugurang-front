import { gql, useQuery } from '@apollo/client';
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


export const GET_NOTIFICATION = gql`
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
      id
      isRead
      createdAt
      data
      type {
        id
        name
      }
      user {
        id
        name
        image {
          id
          address
        }
      }
    }
  }
`;

function Join() {
  const router = useRouter();
  const classes = useStyles();

  const results = [
    [null, useQuery(CURRENT_USER)],
    [null, useQuery(GET_NOTIFICATION, {variables: {id: router.query.notification}})],
  ];
  const currentUser = results[0][1].data?.currentUser;
  const notification = results[1][1].data?.getNotification;

  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />;

  return (
    <Layout>
      <FullScreenDialogBox titleBar=<PageTitleBar title="Invitation" icon=<CheckIcon /> />>
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
              {"You are invited to team "}
              {notification.data}{"."}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h5">Do you want to join?</Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Box align="center" style={{margin: "1rem"}}>
              <Button variant="outlined" onClick={() => router.push('/home')}>Accept</Button>  
              <Button variant="outlined" onClick={() => router.push('/home')}>Deny</Button>
            </Box>
          </Grid>
        </Grid>
      </FullScreenDialogBox>
    </Layout>
  );
}

export default withAuth(Join);
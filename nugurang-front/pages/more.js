import { gql, useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';
import {useRouter} from 'next/router';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import QueueIcon from '@material-ui/icons/Queue';

import { BACKEND_ADDR } from '../src/config';
import Layout from '../components/Layout';
import BaseButton from '../components/BaseButton';
import BaseListItem from '../components/BaseListItem';
import GraphQlError from '../components/GraphQlError';
import SectionBox from '../components/SectionBox';
import SectionTitleBar from '../components/SectionTitleBar';
import UserInfoBox from '../components/UserInfoBox';
import withAuth from '../components/withAuth';
import Loading from '../components/Loading';


const TEST_MORE_MENU_LIST = [
  {
    id: 1,
    title: "Initialize database",
    link: "init",
  },
  {
    id: 2,
    title: "Component overview",
    link: "comp-ov",
  },
];


const useStyles = makeStyles(() => ({
  typography: {
    fontFamily: "Ubuntu",
    fontSize: 24,
    fontWeight: 300,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
}));


export const GET_CURRENT_USER = gql`
  query {
    currentUser {
      id
      oauth2Provider
      oauth2Id
      name
      email
      image {
        id
        address
      }
      biography
      getFollowers(page:0, pageSize:100) {
        id
      }
      getFollowings(page:0, pageSize:100) {
        id
      }
    }
  }
`;


function More() {
  const router = useRouter();
  const classes = useStyles();
  const responses = [
    useQuery(GET_CURRENT_USER)
  ];
  const errorResponse = responses.find((response) => response.error)
  if (errorResponse)
    return <GraphQlError error={errorResponse.error} />

  if (responses.some((response) => response.loading))
    return <Loading />;

  const currentUser = responses[0].data.currentUser;


  return (
    <Layout>
      <SectionTitleBar title="More" backButton backButtonLink="/home" />

      <SectionBox border={false}>
        <Grid container alignItems="center">
          {
            !currentUser
            ? (
              <>
                <Grid item xs={12} sm={8}>
                  <Typography className={classes.typography}>You need to sign in first.</Typography>
                </Grid>
                <Grid item xs={12} sm={4} align="right">
                  <BaseButton label="Sign in" onClick={() => router.push('/signin')} />
                </Grid>
              </>
            )
            : (
              <>
                <Grid item xs={12}>
                  <UserInfoBox user={currentUser} dense/>
                </Grid>
                <Grid item xs align="right">
                  <BaseButton label="My info" onClick={() => router.push(`/user/${currentUser.id}`)} />
                  <BaseButton label="Sign out" onClick={() => router.push(`${BACKEND_ADDR}/logout`)} />
                </Grid>
              </>
            )
          }
        </Grid>
      </SectionBox>


      <SectionBox
        titleBar={
          <SectionTitleBar title="More features" icon=<QueueIcon /> />
        }
      >
        <List>
          {TEST_MORE_MENU_LIST.map((item) => <BaseListItem item key={item.id} primary={item.title} onClick={() => {router.push(`/${item.link}`)}} />)}
        </List>
      </SectionBox>

    </Layout>
  );
}

export default withAuth(More);
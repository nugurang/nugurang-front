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
import SectionBox from '../components/SectionBox';
import SectionTitleBar from '../components/SectionTitleBar';
import UserInfoBox from '../components/UserInfoBox';
import withAuth from '../components/withAuth';


const TEST_USER = {
  id: 0,
  name: "Test User",
  email: "Test email",
  image: "/static/images/sample_1.jpg",
  bio: "Test bio",
  followers: 5,
  followings: 10,
}

const TEST_MORE_MENU_LIST = [
  {
    id: 1,
    title: "Message",
    link: "home",
  },
  {
    id: 2,
    title: "Display",
    link: "home",
  },
  {
    id: 3,
    title: "Notification",
    link: "home",
  },
  {
    id: 4,
    title: "General",
    link: "home",
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


export const CHECK_USER = gql`
  query {
    currentUser {
      id
      oauth2Provider
      oauth2Id
      name
      email
      image {
        address
      }
      biography
    }
  }
`;


function More() {
  const router = useRouter();
  const classes = useStyles();
  const { loading, error, data } = useQuery(CHECK_USER);
  if (loading)  {
    return (<p>Loading...</p>);
  }
  if (error) {
    console.log(error);
  }

  if (data && !data.currentUser) {
    router.push('/signup');
    return null;
  }
  return (
    <Layout>
      <SectionTitleBar title="More" backButton backButtonLink="/home"/>

      <SectionBox border={false}>
        <Grid container alignItems="center">
          {
            !data
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
                  <UserInfoBox
                    name={data.currentUser.name}
                    image={data.currentUser.image.address}
                    bio={data.currentUser.bio}
                    followers={TEST_USER.followers}
                    followings={TEST_USER.followings}
                    dense
                  />
                </Grid>
                <Grid item xs align="right">
                  <BaseButton label="My info" onClick={() => router.push('/user')} />
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
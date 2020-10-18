/* import { gql, useQuery } from '@apollo/client'; */
import {useRouter} from 'next/router';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

import QueueIcon from '@material-ui/icons/Queue';

import Layout from '../components/Layout';

import BaseButton from '../components/BaseButton';
import BaseListItem from '../components/BaseListItem';
import SectionBox from '../components/SectionBox';
import SectionTitleBar from '../components/SectionTitleBar';
import UserInfoBox from '../components/UserInfoBox';


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

/*
function getData() {
  const { loading, error, data } = useQuery(gql`
    query {
      userInfo {
        getCurrentUser() {
          id
          name
          image
        }
      }
    }
  `);
  if (loading)
    return (<p>Loading...</p>);
  if (error) {
    console.log(error);
  }
  return data;
}
*/

export default function More() {
  const router = useRouter();
  /* const data = getData(); */
  return (
    <Layout>

      <SectionTitleBar title="More" backButton />

      <SectionBox border={false}>
        <Grid container>
          <Grid item xs={12} sm={8}>
            <UserInfoBox
              name={TEST_USER.name}
              image={TEST_USER.image}
              bio={TEST_USER.bio}
              followers={TEST_USER.followers}
              followings={TEST_USER.followings}
              dense
            />
          </Grid>
          <Grid item xs={12} sm={4} align="right">
            <BaseButton label="My info" onClick={() => router.push('/user')} />
            <BaseButton label="Sign in" onClick={() => router.push('/signin')} />
          </Grid>
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

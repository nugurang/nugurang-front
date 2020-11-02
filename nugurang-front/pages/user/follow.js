import React from 'react';

import Layout from '../../components/Layout';
import BaseTabs from '../../components/BaseTabs';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import UserList from '../../components/UserList';


const TEST_FOLLOWING_LIST = [
  {
    id: 0,
    name: "Test Following 1",
    email: "Test email",
    image: "/static/images/sample_1.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
  {
    id: 1,
    name: "Test Following 2",
    email: "Test email",
    image: "/static/images/sample_2.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
  {
    id: 2,
    name: "Test Following 3",
    email: "Test email",
    image: "/static/images/sample_3.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
  {
    id: 3,
    name: "Test Following 4",
    email: "Test email",
    image: "/static/images/sample_4.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
]


const TEST_FOLLOWERS_LIST = [
  {
    id: 0,
    name: "Test Follower 1",
    email: "Test email",
    image: "/static/images/sample_1.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
  {
    id: 1,
    name: "Test Follower 2",
    email: "Test email",
    image: "/static/images/sample_2.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
  {
    id: 2,
    name: "Test Follower 3",
    email: "Test email",
    image: "/static/images/sample_3.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
  {
    id: 3,
    name: "Test Follower 4",
    email: "Test email",
    image: "/static/images/sample_4.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
]



const TAB_PROPS = [
  {
    id: 0,
    label: "Following",
  },
  {
    id: 1,
    label: "Followers",
  },
]


export default function Follow() {
  /* const data = getData(); */
  return (
    <Layout>

      <SectionTitleBar title="Followings" backButton backButtonLink="/user" />

      <SectionBox>
        <BaseTabs tabProps={TAB_PROPS}>
          <UserList
            items={TEST_FOLLOWING_LIST}
          />
          <UserList
            items={TEST_FOLLOWERS_LIST}
          />
        </BaseTabs>
      </SectionBox>

    </Layout>
  );
}

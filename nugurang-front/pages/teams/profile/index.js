import React from 'react';

import Layout from '../../../components/Layout';
import BaseTabs from '../../../components/BaseTabs';
import ProjectList from '../../../components/ProjectList';
import SectionBox from '../../../components/SectionBox';
import SectionTitleBar from '../../../components/SectionTitleBar';
import TeamInfoBox from '../../../components/TeamInfoBox';
import UserList from '../../../components/UserList';


const TEST_USER_LIST = [
  {
    id: 0,
    name: "Test User",
    email: "Test email",
    image: "/static/images/sample_1.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
  {
    id: 1,
    name: "Test User",
    email: "Test email",
    image: "/static/images/sample_2.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
  {
    id: 2,
    name: "Test User",
    email: "Test email",
    image: "/static/images/sample_3.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
  {
    id: 3,
    name: "Test User",
    email: "Test email",
    image: "/static/images/sample_4.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
]



const TEST_PROJECT_LIST = [
  {
    id: 0,
    name: "Test project 1",
    users: TEST_USER_LIST,
  },
  {
    id: 1,
    name: "Test project 2",
    users: TEST_USER_LIST,
  },
  {
    id: 2,
    name: "Test project 3",
    users: TEST_USER_LIST,
  },
]



const TAB_PROPS = [
  {
    id: 0,
    label: "Projects",
  },
  {
    id: 1,
    label: "Teammates",
  },
]


export default function Home() {
  /* const data = getData(); */
  return (
    <Layout>

      <SectionTitleBar title="My info" backButton="true" />

      <SectionBox border={false}>
        <TeamInfoBox
          name="Test team"
          bio="Test team bio"
          users={TEST_USER_LIST}
          dense={false}
        />
      </SectionBox>


      <BaseTabs tabProps={TAB_PROPS}>
        <ProjectList
          items={TEST_PROJECT_LIST}
        />
        <UserList
          items={TEST_USER_LIST}
        />
      </BaseTabs>


    </Layout>
  );
}

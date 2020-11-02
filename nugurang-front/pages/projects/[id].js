import React from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import Grid from '@material-ui/core/Grid';

import Layout from '../../components/Layout';
import BaseButton from '../../components/BaseButton';
import BaseTabs from '../../components/BaseTabs';
import GraphQlError from '../../components/GraphQlError';
import ProjectInfoBox from '../../components/ProjectInfoBox';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import UserList from '../../components/UserList';
import WorkList from '../../components/WorkList';
import withAuth from '../../components/withAuth';
import Loading from '../../components/Loading';


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



const TEST_WORK_LIST = [
  {
    id: 0,
    name: "Test work 1",
    users: TEST_USER_LIST,
  },
  {
    id: 1,
    name: "Test work 2",
    users: TEST_USER_LIST,
  },
  {
    id: 2,
    name: "Test work 3",
    users: TEST_USER_LIST,
  },
]



const TAB_PROPS = [
  {
    id: 0,
    label: "Works",
  },
  {
    id: 1,
    label: "Teammates",
  },
]


export default function ProjectInfo() {
  /* const data = getData(); */
  return (
    <Layout>

      <SectionTitleBar title="Project info" backButton="true" backButtonLink="/teams"/>
        <SectionBox border={false}>
        <>
          <Grid item xs={12}>
            <ProjectInfoBox
              name="Test project"
              event="Null"
              users={TEST_USER_LIST}
              dense={false}
            />
          </Grid>
          <Grid item xs align="right">
            <BaseButton label="Create work" onClick={() => router.push({pathname: "/works/create", query: { project: router.query.name }})} />
          </Grid>
        </>
      </SectionBox>


      <BaseTabs tabProps={TAB_PROPS}>
        <WorkList
          items={TEST_WORK_LIST}
        />
        <UserList
          items={TEST_USER_LIST}
        />
      </BaseTabs>


    </Layout>
  );
}

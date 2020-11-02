import React from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import Grid from '@material-ui/core/Grid';

import Layout from '../../components/Layout';
import BaseButton from '../../components/BaseButton';
import BaseTabs from '../../components/BaseTabs';
import GraphQlError from '../../components/GraphQlError';
import ProjectList from '../../components/ProjectList';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import TeamInfoBox from '../../components/TeamInfoBox';
import UserList from '../../components/UserList';
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

const GET_TEAM = gql`
  query getTeam($id: ID!) {
    getTeam(id: $id) {
      id
      name
      projects {
        id
        name
        getUsers(page: 0, pageSize: 100) {
          id
          name
          image {
            id
          }
        }
      }
      getUsers(page: 0, pageSize: 100) {
        id
        name
        email
      }
    }
  }
`;

export default function TeamInfo() {
  const router = useRouter();
  const responses = [
    useQuery(GET_TEAM, {variables: {id: router.query.id}}),
  ];
  const errorResponse = responses.find((response) => response.error)
  if (errorResponse)
    return <GraphQlError error={errorResponse.error} />
  if (responses.some((response) => response.loading))
    return <Loading />;
  const team = responses[0].data ? responses[0].data.getTeam : null;
  const users = responses[0].data.getTeam ? responses[0].data.getTeam.getUsers : null;

  return (
    <Layout>

      <SectionTitleBar title="Team info" backButton="true" />
        <SectionBox border={false}>
        <>
          <Grid item xs={12}>
            <TeamInfoBox
              name={team.name}
              bio="Test team bio"
              users={team.getUsers}
              dense={false}
            />
          </Grid>
          <Grid item xs align="right">
            <BaseButton label="Create project" onClick={() => router.push({pathname: "/projects/create", query: { team: router.query.id }})} />
          </Grid>
        </>
      </SectionBox>


      <BaseTabs tabProps={TAB_PROPS}>
        <ProjectList
          items={team.projects}
        />
        <UserList
          items={team.getUsers}
        />
      </BaseTabs>


    </Layout>
  );
}

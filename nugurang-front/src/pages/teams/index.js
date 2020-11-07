import React from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/Group';

import BaseButton from '../../components/BaseButton';
import GraphQlError from '../../components/GraphQlError';
import Layout from '../../components/Layout';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import TeamList from '../../components/TeamList';
import withAuth from '../../components/withAuth';
import Loading from '../../components/Loading';


const TEST_TEAM_LIST = [
  {
    id: 0,
    name: "Test team name",
    users:[
      {
        id: 1,
        name: "User 1",
        image: "/static/images/sample_2.jpg",
        followers: 10,
        followings: 20,
        bio: "Bio"
      },
      {
        id: 2,
        name: "User 2",
        image: "/static/images/sample_3.jpg",
        followers: 10,
        followings: 20,
        bio: "Bio"
      },
      {
        id: 3,
        name: "User 3",
        image: "/static/images/sample_4.jpg",
        followers: 10,
        followings: 20,
        bio: "Bio"
      },
    ],
  },
  {
    id: 1,
    name: "Test team name",
    users:[
      {
        id: 1,
        name: "User 1",
        image: "/static/images/sample_2.jpg",
        followers: 10,
        followings: 20,
        bio: "Bio"
      },
      {
        id: 2,
        name: "User 2",
        image: "/static/images/sample_3.jpg",
        followers: 10,
        followings: 20,
        bio: "Bio"
      },
      {
        id: 3,
        name: "User 3",
        image: "/static/images/sample_4.jpg",
        followers: 10,
        followings: 20,
        bio: "Bio"
      },
    ],
  },
]



export const GET_CURRENT_USER = gql`
  query {
    currentUser {
      id
      getTeams(page: 0, pageSize: 100) {
        id
        name
        getUsers(page: 0, pageSize: 100) {
          id
          image {
            id
            address
          }
        }
      }
    }
  }
`;


function Teams() {
  const router = useRouter();
  const responses = [
    useQuery(GET_CURRENT_USER),
  ];
  const errorResponse = responses.find((response) => response.error)
  if (errorResponse)
    return <GraphQlError error={errorResponse.error} />
  if (responses.some((response) => response.loading))
    return <Loading />;

  const teams = responses[0].data.currentUser ? responses[0].data.currentUser.getTeams : null;

  return (
    <Layout>
      <SectionTitleBar title="Teams" backButton backButtonLink="/home" />

      <SectionBox
        titleBar={(
          <SectionTitleBar title="My teams" icon={<GroupIcon />}>
            <BaseButton label="Create team" onClick={() => router.push('/teams/create')} />
          </SectionTitleBar>
        )}
      >
        <TeamList items={teams} link="/teams" buttonLink="/teams/invite"/>
      </SectionBox>
    </Layout>
  );
}

export default withAuth(Teams);
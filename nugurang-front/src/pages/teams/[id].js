import React from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import withAuth from '../../components/withAuth';
import BaseTabs from '../../components/BaseTabs';
import GraphQlError from '../../components/GraphQlError';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import ProjectList from '../../components/ProjectList';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import TeamInfoBox from '../../components/TeamInfoBox';
import UserList from '../../components/UserList';


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

      <SectionTitleBar title="Team info" backButton="true" backButtonLink="/teams">
        <Button onClick={() => router.push({pathname: "/projects/create", query: { team: router.query.id }})}>Create project</Button>
      </SectionTitleBar>
      <SectionBox border={false}>
        <TeamInfoBox team={team}/>
      </SectionBox>


      <SectionBox>
        <BaseTabs tabProps={TAB_PROPS}>
          <ProjectList
            items={team.projects}
            link="/projects"
            buttonLink="/projects/invite"
          />
          <UserList
            items={team.getUsers}
            link="/user"
          />
        </BaseTabs>
      </SectionBox>

    </Layout>
  );
}

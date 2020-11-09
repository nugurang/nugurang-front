import React from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';

import withAuth from '../../components/withAuth';
import BaseTabs from '../../components/BaseTabs';
import GraphQlError from '../../components/GraphQlError';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import PageTitleBar from '../../components/PageTitleBar';
import ProjectInfoCardGrid from '../../components/ProjectInfoCardGrid';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import TeamInfoBox from '../../components/TeamInfoBox';
import UserInfoCardGrid from '../../components/UserInfoCardGrid';


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

function TeamInfo() {
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

      <PageTitleBar title="Team info" backButton="true" backButtonLink="/teams">
        <Button onClick={() => router.push({pathname: "/projects/create", query: { team: router.query.id }})}>Create project</Button>
      </PageTitleBar>
      <SectionBox border={false}>
        <TeamInfoBox team={team} />
      </SectionBox>


      <SectionBox>
        <BaseTabs tabProps={TAB_PROPS}>
          <ProjectInfoCardGrid items={team.projects} link="/projects" addButtonLink="/projects/invite" xs={12} sm={6} md={4} />
          <UserInfoCardGrid items={team.getUsers} link="/user" xs={12} sm={6} md={4} />
        </BaseTabs>
      </SectionBox>

    </Layout>
  );
}

export default withAuth(TeamInfo);
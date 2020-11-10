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
import NoContentsBox from '../../components/NoContentsBox';
import PageTitleBar from '../../components/PageTitleBar';
import ProjectInfoCard from '../../components/ProjectInfoCard';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import TeamInfoBox from '../../components/TeamInfoBox';
import UserInfoCard from '../../components/UserInfoCard';


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
            address
          }
        }
      }
      getUsers(page: 0, pageSize: 100) {
        id
        name
        email
        image {
          id
          address
        }
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

  team.projects.forEach(function(project){
    project.onClick = () => router.push(`/projects/${project.id}`);
  });
  team.getUsers.forEach(function(user){
    user.onClick = () => router.push(`/user/${user.id}`);
  });

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
          {
            team.projects && (team.projects.length)
            ? <Grid container>{[team.projects].flat().map((project) => <Grid item xs={12} sm={6} md={4}><ProjectInfoCard project={project} /></Grid>)}</Grid>
            : <NoContentsBox />
          }
          {
            team.getUsers && (team.getUsers.length)
            ? <Grid container>{[team.getUsers].flat().map((user) => <Grid item xs={12} sm={6} md={4}><UserInfoCard user={user} /></Grid>)}</Grid>
            : <NoContentsBox />
          }
        </BaseTabs>
      </SectionBox>

    </Layout>
  );
}

export default withAuth(TeamInfo);
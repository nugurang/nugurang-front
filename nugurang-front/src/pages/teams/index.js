import React from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/Group';

import GraphQlError from '../../components/GraphQlError';
import Layout from '../../components/Layout';
import NoContentsBox from '../../components/NoContentsBox';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import TeamInfoCard from '../../components/TeamInfoCard';
import withAuth from '../../components/withAuth';
import Loading from '../../components/Loading';


export const GET_CURRENT_USER = gql`
  query {
    currentUser {
      id
      getTeams(page: 0, pageSize: 100) {
        id
        name
        owner {
          id
          image {
            id
            address
          }
        }
        getMembers(page: 0, pageSize: 100) {
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
  teams.forEach(function(team){
    team.getUsers = [team.owner].concat(team.getMembers);
    team.onClick = () => router.push(`/teams/${team.id}`);
  });

  return (
    <Layout>
      <PageTitleBar title="Teams" backButton backButtonLink="/home">
        <IconButton onClick={() => router.push(`/teams/create`)}>
          <AddIcon />
        </IconButton>
      </PageTitleBar>
      <Container maxWidth="md">
        <SectionBox titleBar={(<SectionTitleBar title="My teams" icon={<GroupIcon />} />)}>
          {
            teams && (teams.length)
            ? <Grid container>{[teams].flat().map((team) => <Grid item xs={12} sm={6}><TeamInfoCard team={team} /></Grid>)}</Grid>
            : <NoContentsBox />
          }
        </SectionBox>
      </Container>
    </Layout>
  );
}

export default withAuth(Teams);
import React from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';

import Button from '@material-ui/core/Button';
import GroupIcon from '@material-ui/icons/Group';

import GraphQlError from '../../components/GraphQlError';
import Layout from '../../components/Layout';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import TeamInfoCardGrid from '../../components/TeamInfoCardGrid';
import withAuth from '../../components/withAuth';
import Loading from '../../components/Loading';


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
      <PageTitleBar title="Teams" backButton backButtonLink="/home" />

      <SectionBox
        titleBar={(
          <SectionTitleBar title="My teams" icon={<GroupIcon />}>
            <Button onClick={() => router.push('/teams/create')}>Create team</Button>
          </SectionTitleBar>
        )}
      >
        <TeamInfoCardGrid items={teams} link="/teams" addButtonLink="/teams/invite" xs={12} sm={6} md={4} />
      </SectionBox>
    </Layout>
  );
}

export default withAuth(Teams);
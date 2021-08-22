import React from 'react';
import { useRouter } from 'next/router';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/Group';

import withAuthServerSide from '../../utils/withAuthServerSide';
import { queryToBackend } from "../../utils/requestToBackend";
import { GetCurrentUserQueryBuilder } from '../../queries/user';

import Layout from '../../components/Layout';
import NoContentsBox from '../../components/NoContentsBox';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import TeamInfoCard from '../../components/TeamInfoCard';

export const getServerSideProps = withAuthServerSide(async ({ context }) => {
  const currentUserResult = await queryToBackend({
    context,
    query: new GetCurrentUserQueryBuilder().withTeams().build(),
  });

  return {
    props: {
      teams: currentUserResult.data.currentUser.getTeams,
    },
  };
});

function Teams({ teams }) {
  const router = useRouter();

  teams = teams.map(team => {
    return {
      ...team,
      getUsers: [team.owner].concat(team.getMembers),
      onClick: () => router.push(`/teams/${team.id}`),
    };
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

export default Teams;

import React, { useState } from 'react'
import { useRouter } from 'next/router';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FindInPageIcon from '@material-ui/icons/FindInPage';

import withAuthServerSide from '../../utils/withAuthServerSide';
import {
  mutateToBackend,
  queryToBackend,
} from "../../utils/requestToBackend";
import {
  CreateProjectInvitationsMutationBuilder,
  GetProjectQueryBuilder,
} from '../../queries/project';

import Layout from '../../components/Layout';
import NoContentsBox from '../../components/NoContentsBox'
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import UserInfoCard from '../../components/UserInfoCard'

export const getServerSideProps = withAuthServerSide( async ({ context }) => {
  const projectResult = await queryToBackend({
    context,
    query: new GetProjectQueryBuilder().withTeam().build(),
    variables: {
      id: context.query.id,
    },
  });

  if (!projectResult.data.getProject) {
    return {
      notFound: true,
    };
  };

  return {
    props: {
      project: projectResult.data.getProject,
      members: projectResult.data.getProject.team.getMembers,
    },
  };
});

function Invite({ project, members }) {
  const router = useRouter();
  const [selectedUsers, setSelectedUsers] = useState([]);

  members = members.map(member => {
    return {
      ...member,
      onClick: () => setSelectedUsers(Array.from(new Set(selectedUsers.concat([user]))).map(selectedUser => {
        return {
          ...selectedUser,
          onClick: () => setSelectedUsers(selectedUsers.filter(i => [user].flat().indexOf(i) < 0)),
        }
      })),
    };
  });

  return (
    <Layout>
      <PageTitleBar title="Invite user to project" backButton />
      <Container maxWidth="md">

        <Box display={selectedUsers && selectedUsers.length ? "block" : "none"}>
          <SectionBox titleBar={<SectionTitleBar title="Selected users beta" icon={<FindInPageIcon />} />}>
            <Grid container>{[selectedUsers].flat().map((user) => <Grid item xs={12} sm={6} md={4}><UserInfoCard user={user} /></Grid>)}</Grid>
          </SectionBox>
        </Box>

        <SectionBox title={<SectionTitleBar title="Result" icon={<FindInPageIcon />} />}>
          {
            project.team.getMembers && project.team.getMembers.length
            ? <Grid container>{[project.team.getMembers].flat().map((user) => <Grid item xs={12} sm={6} md={4}><UserInfoCard user={user} /></Grid>)}</Grid>
            : <NoContentsBox />
          }
        </SectionBox>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await mutateToBackend({
              mutation: new CreateProjectInvitationsMutationBuilder().build(),
              variables: {
                invitation: {
                  project: router.query.id,
                  users: selectedUsers.map(user => user.id)
                }
              }
            });
            router.push(`/projects/${project.id}`);
          }}
        >
          <Box align="center">
            <Button type="submit" variant="outlined">Invite</Button>
          </Box>
        </form>

      </Container>
    </Layout>
  );
}

export default Invite;

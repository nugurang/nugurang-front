import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import SearchIcon from '@material-ui/icons/Search';

import withAuthServerSide from '../../utils/withAuthServerSide';
import { mutateToBackend, queryToBackend } from "../../utils/requestToBackend";
import { GetUserByNameQueryBuilder } from '../../queries/user';
import {
  GetTeamQueryBuilder,
  CreateTeamInvitationsMutationBuilder,
} from '../../queries/team';

import Layout from '../../components/Layout';
import NoContentsBox from '../../components/NoContentsBox'
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import UserInfoCard from '../../components/UserInfoCard'

export const getServerSideProps = withAuthServerSide(async ({ context }) => {
  const teamResult = await queryToBackend({
    context,
    query: new GetTeamQueryBuilder().withProjects().build(),
    variables: {
      id: context.query.id,
    },
  });

  if (!teamResult.data.getTeam) {
    return {
      notFound: true,
    };
  };

  return {
    props: {
      team: teamResult.data.getTeam,
    },
  };
});

function Invite({ team }) {
  const router = useRouter();
  const keywordName = useRef(null);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  function handleKeywordNameChange() {
    keywordName.current.focus();
  }

  return (
    <Layout>
      <PageTitleBar title="Invite user to team" backButton />

      <Container maxWidth="md">
        <SectionBox border={false}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
                  inputRef={keywordName}
                  label="Enter username"
                  variant="outlined"
                  onClick={handleKeywordNameChange}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <form
                onSubmit = { async (e) => {
                  e.preventDefault();
                  const userResponse = await queryToBackend({
                    query: new GetUserByNameQueryBuilder().withFollows().build(),
                    variables: {
                      name: keywordName.current.value
                    }
                  });
                  setUsers(userResponse.data.getUserByName.map(user => {
                    return {
                      ...user,
                      onClick: () => {
                        setSelectedUsers(Array.from(new Set(selectedUsers.concat([user]))).map(selectedUser => {
                          return {
                            ...selectedUser,
                            onClick: () => setSelectedUsers(selectedUsers.filter(i => [selectedUser].flat().indexOf(i) < 0)),
                          }
                        }));
                      },
                    };
                  }));
                }}
              >
                <IconButton type="submit" aria-label="search">
                  <SearchIcon />
                </IconButton>
              </form>
            </Grid>
          </Grid>
        </SectionBox>

        <Box display={selectedUsers && selectedUsers.length ? "block" : "none"}>
          <SectionBox titleBar={<SectionTitleBar title="Selected users" icon={<FindInPageIcon />} />} >
            <Grid container>{[selectedUsers].flat().map((user) => <Grid item xs={12} sm={6} md={4}><UserInfoCard user={user} /></Grid>)}</Grid>
          </SectionBox>
        </Box>

        <SectionBox titleBar={<SectionTitleBar title="Results" icon={<FindInPageIcon />} />} >
          {
            users && users.length
            ? <Grid container>{[users].flat().map((user) => <Grid item xs={12} sm={6} md={4}><UserInfoCard user={user} /></Grid>)}</Grid>
            : <NoContentsBox />
          }
        </SectionBox>
      </Container>
      
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await mutateToBackend({
            mutation: new CreateTeamInvitationsMutationBuilder().build(),
            variables: {
              invitation: {
                team: team.id,
                users: selectedUsers.map(user => user.id),
              }
            }
          })
          router.push(`/teams/${team.id}`);
        }}
      >
        <Box align="center">
          <Button type="submit" variant="outlined">Invite</Button>
        </Box>
      </form>
    </Layout>
  );
}

export default Invite;

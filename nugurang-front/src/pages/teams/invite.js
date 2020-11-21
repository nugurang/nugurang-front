import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router';
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';

import Autocomplete from '@material-ui/lab/Autocomplete';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import SearchIcon from '@material-ui/icons/Search';

import GraphQlError from '../../components/GraphQlError';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import NoContentsBox from '../../components/NoContentsBox'
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import UserInfoCard from '../../components/UserInfoCard'
import withAuth from '../../components/withAuth';


const GET_TEAM = gql`
  query GetTeam($id: ID!) {
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

export const GET_USER_BY_NAME = gql`
  query GetUserByName($name: String!) {
    getUserByName(name: $name) {
      id
      name
      email
      image {
        id
        address
      }
      biography
      getFollowers(page:0, pageSize:100) {
        id
      }
      getFollowings(page:0, pageSize:100) {
        id
      }
    }
  }
`;

export const CREATE_TEAM_INVITATIONS = gql`
  mutation CreateTeamInvitations($invitation: TeamInvitationInput!) {
    createTeamInvitations(invitation: $invitation) {
      id
    }
  }
`;


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function Invite() {
  const router = useRouter();
  const keywordName = useRef(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const results = [
    [null, useQuery(GET_TEAM, {variables: {id: router.query.id}})],
    useLazyQuery(GET_USER_BY_NAME),
    useMutation(CREATE_TEAM_INVITATIONS)
  ];
  const getUserByName = results[1][0];
  const createTeamInvitations = results[2][0];

  const team = results[0][1].data ? results[0][1].data.getTeam : null;
  const userData = results[1][1].data;
  const users = userData && userData.getUserByName ? [userData.getUserByName] : [];

  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />

  if (users) {
    users.forEach(function(user){
      user.onClick = async (e) => {
        setSelectedUsers(Array.from(new Set(selectedUsers.concat([user]))));
        console.log(selectedUsers);
      }
    });
  }


  Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
  }
  if (selectedUsers) {
    selectedUsers.forEach(function(user){
      user.onClick = async (e) => {
        setSelectedUsers(selectedUsers.diff([user].flat()));
        console.log(selectedUsers);
      }
    });
  }

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
                  await getUserByName({ variables: { name: keywordName.current.value }})}}
              >
                <IconButton type="submit" aria-label="search">
                  <SearchIcon />
                </IconButton>
              </form>
            </Grid>
          </Grid>
        </SectionBox>

        <Box display={selectedUsers && selectedUsers.length ? "block" : "none"}>
          <SectionBox titleBar=<SectionTitleBar title="Selected users beta" icon=<FindInPageIcon /> /> >
            <Grid container>{[selectedUsers].flat().map((user) => <Grid item xs={12} sm={6} md={4}><UserInfoCard user={user} /></Grid>)}</Grid>
          </SectionBox>
        </Box>

        <SectionBox titleBar=<SectionTitleBar title="Result" icon=<FindInPageIcon /> /> >
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
          await createProjectInvitations({ variables: {invitation: { team: router.query.id, users: selectedUsers.map(user => user.id) }}})
          router.push(`/teams/${router.query.id}`);
        }}
      >
        <Box align="center">
          <Button type="submit" variant="outlined">Invite</Button>
        </Box>
      </form>
    </Layout>
  );
}

export default withAuth(Invite);
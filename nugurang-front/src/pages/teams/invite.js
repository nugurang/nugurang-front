import React, { useRef } from 'react'
import { useRouter } from 'next/router';
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';

import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
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

export const GET_USER_BY_NAME = gql`
  query getUserByName($name: String!) {
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

export const UPDATE_TEAM = gql`
  mutation updateTeam($id: ID!, $team: TeamInput!) {
    updateTeam(id: $id, team: $team) {
      id
    }
  }
`;


function Invite() {
  const router = useRouter();
  const keywordName = useRef(null);

  const results = [
    [null, useQuery(GET_TEAM, {variables: {id: router.query.id}})],
    useLazyQuery(GET_USER_BY_NAME),
    useMutation(UPDATE_TEAM)
  ];
  const getUserByName = results[1][0];
  const updateTeam = results[2][0];

  const team = results[0][1].data ? results[0][1].data.getTeam : null;
  const userData = results[1][1].data;
  const users = userData && userData.getUserByName ? [userData.getUserByName] : null;

  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />

  if (users) {
    users.forEach(function(user){
      user.onClick = async (e) => {
        const res = await updateTeam({ variables: { id: Number(router.query.id), team: { name: team.name, users: [users, user].flat().map(user => Number(user)) }}});
        router.push(`/teams/${router.query.id}`);
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
                onSubmit={async (e) => {
                  e.preventDefault();
                  await getUserByName({ variables: {name: keywordName.current.value}})}}
              >
                <IconButton type="submit" aria-label="search">
                  <SearchIcon />
                </IconButton>
              </form>
            </Grid>
          </Grid>
        </SectionBox>

        <SectionBox
          titleBar={
            <SectionTitleBar title="Result" icon=<FindInPageIcon /> />
          }
        >
          {
            users
            ? (
              <Grid container>
                {[users].flat().map((user) => <Grid item xs={12} sm={6} md={4}><UserInfoCard user={user} /></Grid>)}
              </Grid>
            )
            : <NoContentsBox />
          }
        </SectionBox>
      </Container>

    </Layout>
  );
}

export default withAuth(Invite);
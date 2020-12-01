import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router';
import { gql, useMutation, useQuery } from '@apollo/client';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
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


const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    getProject(id: $id) {
      id
      name
      team {
        id
        getMembers(page: 0, pageSize: 100) {
          id
          name
          email
        }
      }
    }
  }
`;

export const CREATE_PROJECT_INVITATIONS = gql`
  mutation CreateProjectInvitations($invitation: ProjectInvitationInput!) {
    createProjectInvitations(invitation: $invitation) {
      id
    }
  }
`;


function Invite() {
  const router = useRouter();
  const keywordName = useRef(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const results = [
    [null, useQuery(GET_PROJECT, {variables: {id: router.query.id}})],
    useMutation(CREATE_PROJECT_INVITATIONS)
  ];
  const [getProject, createProjectInvitations] = results.map(result => result[0]);
  const project = results[0][1].data?.getProject;

  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />

  project.team.getMembers.forEach(function(user){
    user.onClick = async (e) => {
      setSelectedUsers(Array.from(new Set(selectedUsers.concat([user]))));
      console.log(selectedUsers);
    }
  });


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


  return (
    <Layout>
      <PageTitleBar title="Invite user to project" backButton />
      <Container maxWidth="md">

        <Box display={selectedUsers && selectedUsers.length ? "block" : "none"}>
          <SectionBox titleBar=<SectionTitleBar title="Selected users beta" icon=<FindInPageIcon /> /> >
            <Grid container>{[selectedUsers].flat().map((user) => <Grid item xs={12} sm={6} md={4}><UserInfoCard user={user} /></Grid>)}</Grid>
          </SectionBox>
        </Box>

        <SectionBox title=<SectionTitleBar title="Result" icon=<FindInPageIcon /> /> >
          {
            project.team.getMembers && project.team.getMembers.length
            ? <Grid container>{[project.team.getMembers].flat().map((user) => <Grid item xs={12} sm={6} md={4}><UserInfoCard user={user} /></Grid>)}</Grid>
            : <NoContentsBox />
          }
        </SectionBox>
     
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await createProjectInvitations({ variables: {invitation: { project: router.query.id, users: selectedUsers.map(user => user.id) }}})
            router.push(`/projects/${router.query.id}`);
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

export default withAuth(Invite);
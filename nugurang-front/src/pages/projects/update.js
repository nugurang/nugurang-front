import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import { gql, useMutation, useQuery } from '@apollo/client';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import TitleIcon from '@material-ui/icons/Title';
import NotesIcon from '@material-ui/icons/Notes';

import withAuth from '../../components/withAuth';
import GraphQlError from '../../components/GraphQlError';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';


const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    getProject(id: $id) {
      id
      name
      team {
        id
      }
      works {
        id
        name
      }
      event {
        id
      }
      getUsers(page: 0, pageSize: 100) {
        id
        name
        email
      }
    }
  }
`;


const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: ID!, $project: ProjectInput!) {
    updateProject(id: $id, project: $project) {
      id
    }
  }
`;

function Update() {
  const router = useRouter();
  const newName = useRef(null);

  const results = [
    [null, useQuery(GET_PROJECT, {variables: {id: router.query.project}})],
    useMutation(UPDATE_PROJECT)
  ];
  const [getProject, updateProject] = results.map(result => result[0]);
  const project = results[0][1].data ? results[0][1].data.getProject : null;

  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />

  function handleNewNameChange() {
    newName.current.focus();
  }

  return (
    <Layout>
      <PageTitleBar title="Edit project" backButton="true" backButtonLink={`/projects/${router.query.project}`}>
        <Button variant="outlined" onClick={() => router.push({pathname: "/works/create", query: { project: router.query.project }})}>Create work</Button>
      </PageTitleBar>

      <Container maxWidth="md">
        <SectionBox titleBar={<SectionTitleBar title="Edit title" icon=<TitleIcon /> />}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
                  defaultValue={project.name}
                  inputRef={newName}
                  label="Enter title"
                  variant="outlined"
                  onClick={handleNewNameChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </SectionBox>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await updateProject({ variables: { id: router.query.project, project: { name: newName.current.value }}});
            router.push(`/projects/${res.data.updateProject.id}`);
          }}
        >
          <Box align="center">
            <Button variant="outlined" type="submit">Submit</Button>
          </Box>
        </form>

      </Container>
    </Layout>
  );
}

export default withAuth(Update);
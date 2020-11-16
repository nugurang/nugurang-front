import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useRef } from 'react'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

import Layout from '../../components/Layout';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import withAuth from '../../components/withAuth';


export const CREATE_PROJECT = gql`
  mutation createProject($team: ID!, $project: ProjectInput!) {
    createProject (team: $team, project: $project) {
      id
    }
  }
`;

function CreateProject() {
  const router = useRouter();
  const newName = useRef(null);

  const [
    createProject,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_PROJECT);

  function handleNewNameChange() {
    newName.current.focus();
  }

  return (
    <Layout>

      <PageTitleBar title="Create new project" backButton />

      <Container maxWidth="md">
        <SectionBox titleBar={<SectionTitleBar title="Add project name" icon=<GroupAddIcon /> />}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
                  inputProps={{ style: { fontFamily: "Ubuntu" } }}
                  InputLabelProps={{ style: { fontFamily: "Ubuntu" } }}
                  inputRef={newName}
                  label="Enter project name"
                  variant="outlined"
                  onClick={handleNewNameChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const projectRes = await createProject({ variables: { team: router.query.team, project: { name: newName.current.value }}});
                  const projectId = projectRes.data.createProject.id;
                  router.push(`/projects/${projectId}`);
                }}
              >
                <Box align="center">
                  <Button type="submit" variant="outlined">Submit</Button>
                </Box>
              </form>
              {mutationLoading && <p>Loading...</p>}
              {mutationError && <p>Error :( Please try again</p>}
            </Grid>
          </Grid>
        </SectionBox>
      </Container>

    </Layout>
  );
}

export default withAuth(CreateProject);
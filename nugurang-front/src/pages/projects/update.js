import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import TitleIcon from '@material-ui/icons/Title';

import withAuthServerSide from '../../utils/withAuthServerSide';
import {
  queryToBackend,
  mutateToBackend,
} from "../../utils/requestToBackend";
import {
  GetProjectQueryBuilder,
  UpdateProjectMutationBuilder,
} from '../../queries/project';

import Layout from '../../components/Layout';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';

export const getServerSideProps = withAuthServerSide( async ({ context }) => {
  const projectResult = await queryToBackend({
    context,
    query: new GetProjectQueryBuilder().withTeam().withWorks().withEvent().withUsers().build(),
    variables: {
      id: context.query.project,
    },
  });

  return {
    props: {
      project: projectResult.data.getProject,
    },
  };
});

function Update({ project }) {
  const router = useRouter();
  const newName = useRef(null);

  function handleNewNameChange() {
    newName.current.focus();
  }

  return (
    <Layout>
      <PageTitleBar title="Edit project" backButton="true" backButtonLink={`/projects/${router.query.project}`}>
        <Button variant="contained" onClick={() => router.push({pathname: "/works/create", query: { project: router.query.project }})}>Create work</Button>
      </PageTitleBar>

      <Container maxWidth="md">
        <SectionBox titleBar={<SectionTitleBar title="Edit title" icon={<TitleIcon />} />}>
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
            const response = await mutateToBackend({
              mutation: new UpdateProjectMutationBuilder().build(),
              variables: {
                id: project.id,
                project: {
                  name: newName.current.value
                }
              }
            });
            router.push(`/projects/${response.data.updateProject.id}`);
          }}
        >
          <Box align="center">
            <Button variant="contained" type="submit">Submit</Button>
          </Box>
        </form>

      </Container>
    </Layout>
  );
}

export default Update;

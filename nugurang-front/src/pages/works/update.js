import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import { gql, useMutation, useQuery } from '@apollo/client';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import NotesIcon from '@material-ui/icons/Notes';
import TitleIcon from '@material-ui/icons/Title';

import withAuth from '../../components/withAuth';
import GraphQlError from '../../components/GraphQlError';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';

const GET_WORK = gql`
  query GetWork($id: ID!) {
    getWork(id: $id) {
      id
      name
      project {
        id
      }
      opened
      order
      tasks {
        id
        name
        difficulty
        order
      }
    }
  }
`;


const UPDATE_WORK = gql`
  mutation UpdateWork($id: ID!, $work: WorkInput!) {
    updateWork(id: $id, work: $work) {
      id
    }
  }
`;

function Update() {
  const router = useRouter();
  const newName = useRef(null);

  const results = [
    [null, useQuery(GET_WORK, {variables: {id: router.query.work}})],
    useMutation(UPDATE_WORK)
  ];
  const [getWork, updateWork] = results.map(result => result[0]);
  const work = results[0][1].data ? results[0][1].data.getWork : null;

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
      <PageTitleBar title="Edit work" backButton="true" backButtonLink={`/teams/${work.project.id}`}>
        <Button variant="outlined" onClick={() => router.push({pathname: "/works/create", query: { project: router.query.id }})}>Create work</Button>
      </PageTitleBar>

      <Container maxWidth="md">
        <SectionBox titleBar={<SectionTitleBar title="Edit name" icon=<TitleIcon /> />}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
                  defaultValue={work.name}
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
            const res = await updateWork({ variables: { id: router.query.work, work: { name: newName.current.value }}});
            router.push(`/works/${res.data.updateWork.id}`);
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
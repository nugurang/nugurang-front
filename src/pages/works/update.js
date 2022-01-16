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
import { mutateToBackend, queryToBackend } from "../../utils/requestToBackend";
import { GetWorkQueryBuilder, UpdateWorkMutationBuilder } from '../../queries/work';

import Layout from '../../components/Layout';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';

export const getServerSideProps = withAuthServerSide(async ({ context }) => {
  const workResult = await queryToBackend({
    context,
    query: new GetWorkQueryBuilder().withTasks().build(),
    variables: {
      id: context.query.work,
    },
  });

  if (!workResult.data) {
    return {
      notFound: true,
    };
  };

  return {
    props: {
      work: workResult.data.getWork,
    },
  };
});

function Update({ work }) {
  const router = useRouter();
  const newName = useRef(null);

  function handleNewNameChange() {
    newName.current.focus();
  }

  return (
    <Layout>
      <PageTitleBar title="Edit work" backButton="true" backButtonLink={`/teams/${work.project.id}`}>
        <Button variant="contained" onClick={() => router.push({pathname: "/works/create", query: { project: router.query.id }})}>Create work</Button>
      </PageTitleBar>

      <Container maxWidth="md">
        <SectionBox titleBar={<SectionTitleBar title="Edit name" icon={<TitleIcon />} />}>
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
            const response = await mutateToBackend({
              mutation: new UpdateWorkMutationBuilder().build(),
              variables: {
                id: work.id,
                work: {
                  name: newName.current.value
                }
              }
            });
            router.push(`/works/${response.data.updateWork.id}`);
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

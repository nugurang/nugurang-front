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
import { queryToBackend, mutateToBackend } from "../../utils/requestToBackend";
import {
  GetTeamQueryBuilder,
  UpdateTeamMutationBuilder,
} from '../../queries/team';

import Layout from '../../components/Layout';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';

export const getServerSideProps = withAuthServerSide(async ({ context }) => {
  const teamResult = await queryToBackend({
    context,
    query: new GetTeamQueryBuilder().build(),
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

function Update({ team }) {
  const router = useRouter();
  const newName = useRef(null);

  function handleNewNameChange() {
    newName.current.focus();
  }

  return (
    <Layout>
      <PageTitleBar title="Edit team" backButton="true" backButtonLink={`/teams/${router.query.team}`} />

      <Container maxWidth="md">
        <SectionBox titleBar={<SectionTitleBar title="Edit title" icon={<TitleIcon />} />}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
                  defaultValue={team.title}
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
              mutation: new UpdateTeamMutationBuilder().build(),
              variables: {
                id: router.query.team,
                team: {
                  name: newName.current.value
                }
              }
            });
            router.push(`/team/${response.data.updateTeam.id}`);
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

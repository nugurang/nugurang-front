import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useRef } from 'react'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

import Layout from '../../components/Layout';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import withAuth from '../../components/withAuth';


export const CREATE_TEAM = gql`
  mutation createTeam($name: String!) {
    createTeam (name: $name) {
      id
    }
  }
`;

function CreateTeam() {
  const router = useRouter();
  const newName = useRef(null);

  const [
    createTeam,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_TEAM);

  function handleNewNameChange() {
    newName.current.focus();
  }

  return (
    <Layout>

      <SectionTitleBar title="Create new team" backButton backButtonLink="/teams" />

      <SectionBox titleBar={<SectionTitleBar title="Add team name" icon=<GroupAddIcon /> />}>
        <Grid container spacing={2} alignItems="center" justify="space-between">
          <Grid item xs>
            <FormControl fullWidth variant="filled">
              <TextField
                inputProps={{ style: { fontFamily: "Ubuntu" } }}
                InputLabelProps={{ style: { fontFamily: "Ubuntu" } }}
                inputRef={newName}
                label="Enter team name"
                variant="outlined"
                onClick={handleNewNameChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <form
              onSubmit={e => {
                e.preventDefault();
                createTeam({ variables: {name: newName.current.value}});
                router.push('/teams');
              }}
            >
              <Box align="center">
                <Button type="submit">Submit</Button>
              </Box>
            </form>
          </Grid>
        </Grid>
      </SectionBox>
      {mutationLoading && <p>Loading...</p>}
      {mutationError && <p>Error :( Please try again</p>}

    </Layout>
  );
}

export default withAuth(CreateTeam);
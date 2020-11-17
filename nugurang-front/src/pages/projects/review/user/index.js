import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import Box from '@material-ui/core/Box';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import GraphQlError from '../../../../components/GraphQlError';
import Layout from '../../../../components/Layout';
import Loading from '../../../../components/Loading';
import PageTitleBar from '../../../../components/PageTitleBar';
import SectionBox from '../../../../components/SectionBox';
import SectionTitleBar from '../../../../components/SectionTitleBar';
import withAuth from '../../../../components/withAuth';


const POSITIONS = gql`
  query Positions {
    positions {
      id
      name
    }
  }
`;

const TEST_USER = {
  id: 0,
  name: "Test User",
  email: "Test email",
  image: {
    id: 0,
    address: "/static/images/sample_1.jpg",
  },
  bio: "Test bio",
  followers: 5,
  followings: 10,
}


function User() {
  const router = useRouter();
  const [newUpvotes, setNewUpvotes] = React.useState({name: "None"});
  const [newDownvotes, setNewDownvotes] = React.useState({name: "None"});

  const results = [
    [null, useQuery(POSITIONS)],
  ];
  const [positions] = results.map(result => result[0]);
  const allPositions = results[0][1].data ? results[0][1].data.positions : null;

  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />

  const handleNewUpvotesChange = (event) => {
    newUpvotes.current.focus();
    setNewUpvotes(event.target.value);
  }
  const handleNewDownvotesChange = (event) => {
    newDownvotes.current.focus();
    setNewDownvotes(event.target.value);
  }

  return (
    <Layout>
      <PageTitleBar title="Peer review" backButton />

      <Container maxWidth="sm">

        <SectionBox titleBar={<SectionTitleBar title={TEST_USER.name} avatar={TEST_USER.image.address} circleIcon="true" />}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">Did very well of...</Typography>

                <Autocomplete
                  multiple
                  limitTags={2}
                  onChange={handleNewUpvotesChange}
                  options={allPositions}
                  getOptionLabel={(option) => option.name}
                  filterSelectedOptions
                  renderInput={params => (
                    <TextField
                      variant="outlined"
                      label="Position"
                      inputRef={newUpvotes}
                      placeholder="Select position"
                      margin="normal"
                      fullWidth
                    />
                  )}
                />

            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Needs to go the extra mile to...</Typography>

                <Autocomplete
                  multiple
                  limitTags={2}
                  onChange={handleNewDownvotesChange}
                  options={allPositions}
                  getOptionLabel={(option) => option.name}
                  filterSelectedOptions
                  renderInput={params => (
                    <TextField
                      variant="outlined"
                      label="Position"
                      inputRef={newDownvotes}
                      placeholder="Select position"
                      margin="normal"
                      fullWidth
                    />
                  )}
                />

            </Grid>
          </Grid>
        </SectionBox>

        <Box align="center">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const projectRes = await createProject({ variables: { team: router.query.team, project: { name: newName.current.value }}});
              const projectId = projectRes.data.createProject.id;
              router.push({pathname: "/projects/review", query: { project: router.query.project }});
            }}
          >
            <Box align="center">
              <Button type="submit" variant="outlined">Submit</Button>
            </Box>
          </form>
        </Box>
      </Container>

    </Layout>
  );
}

export default withAuth(User);
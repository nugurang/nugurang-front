import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import withAuthServerSide from '../../../../utils/withAuthServerSide';
import {
  mutateToBackend,
  queryToBackend,
} from "../../../../utils/requestToBackend";
import { GetProjectQueryBuilder } from '../../../../queries/project';
import { GetAllTaskPositionsQueryBuilder } from '../../../../queries/task';
import {
  GetUserQueryBuilder,
  UpdateUserReviewsMutationBuilder,
} from '../../../../queries/user';

import Layout from '../../../../components/Layout';
import PageTitleBar from '../../../../components/PageTitleBar';
import SectionBox from '../../../../components/SectionBox';
import SectionTitleBar from '../../../../components/SectionTitleBar';

export const getServerSideProps = withAuthServerSide( async ({ context }) => {
  const allPositionsResult = await queryToBackend({
    context,
    query: new GetAllTaskPositionsQueryBuilder().build(),
  });
  const projectResult = await queryToBackend({
    context,
    query: new GetProjectQueryBuilder().build(),
    variables: {
      id: context.query.project,
    },
  });
  const userResult = await queryToBackend({
    context,
    query: new GetUserQueryBuilder().withEvaluations().build(),
    variables: {
      id: context.query.user,
    },
  });

  if (!projectResult.data.getProject || !userResult.data.getUser) {
    return {
      notFound: true,
    };
  };

  return {
    props: {
      allPositions: allPositionsResult.data.positions,
      project: projectResult.data.getProject,
      user: userResult.data.getUser,
    },
  };
});

function Index({ allPositions, project, user }) {
  const router = useRouter();
  const [newUpvotes, setNewUpvotes] = useState([]);
  const [newDownvotes, setNewDownvotes] = useState([]);

  const evaluation = user.getUserEvaluations.find(
    evaluation => evaluation.project.id === project.id
  );

  return (
    <Layout>
      <PageTitleBar title="Teammate review" backButton />

      <Container maxWidth="sm">

        <SectionBox titleBar={<SectionTitleBar title={user.name} avatar={user.image?.address} circleIcon="true" />}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">Did very well of...</Typography>

              <Autocomplete
                multiple
                onChange={(event, newValue) => {
            setNewUpvotes(newValue);
          }}
                options={allPositions}
                disableCloseOnSelect
                getOptionLabel={(option) => option.name}
                limitTags={2}
                renderOption={(option, { selected }) => (
                  <>
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.name}
                  </>
          )}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Select positions" placeholder="Positions" />
          )}
              />

            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Needs to go the extra mile to...</Typography>

              <Autocomplete
                multiple
                onChange={(event, newValue) => {
            setNewDownvotes(newValue);
          }}
                options={allPositions}
                disableCloseOnSelect
                getOptionLabel={(option) => option.name}
                limitTags={2}
                renderOption={(option, { selected }) => (
                  <>
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.name}
                  </>
          )}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Select positions" placeholder="Positions" />
          )}
              />

            </Grid>
          </Grid>
        </SectionBox>

        <Box align="center">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const newHonors = [];

              newUpvotes.forEach(function(position){
                newHonors.push({position: position.id, honor: 5});
              });

              newDownvotes.forEach(function(position){
                newHonors.push({position: position.id, honor: -5});
              });

              await mutateToBackend({
                mutation: new UpdateUserReviewsMutationBuilder().build(),
                variables: {
                  evaluation: evaluation.id,
                  reviews: [{
                    toUser: user.id,
                    honors: newHonors
                  }]
                }
              });
              router.push({
                pathname: "/projects/review",
                query: {
                  project: project.id,
                },
              });
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

export default Index;

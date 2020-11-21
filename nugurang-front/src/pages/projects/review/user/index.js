import { gql, useMutation, useQuery } from '@apollo/client';
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

const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      totalHonor
      image {
        id
        address
      }
      getUserEvaluations(page: 0, pageSize: 999) {
        id
        startedAt
        days
        project {
          id
        }
        reviews {
          id
        }
      }
    }
  }
`;

export const UPDATE_USER_REVIEWS = gql`
  mutation UpdateUserReviews($evaluation: ID!, $reviews: [UserReviewInput]!) {
    updateUserReviews (evaluation: $evaluation, reviews: $reviews)
  }
`;


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function Index() {
  const router = useRouter();
  const [newUpvotes, setNewUpvotes] = useState();
  const [newDownvotes, setNewDownvotes] = useState();

  const results = [
    [null, useQuery(POSITIONS)],
    [null, useQuery(GET_USER, {variables: {id: router.query.user}})],
    useMutation(UPDATE_USER_REVIEWS)
  ];
  const [positions, getUser, updateUserReviews] = results.map(result => result[0]);
  const allPositions = results[0][1].data?.positions;
  const user = results[1][1].data?.getUser;
  let evaluation = null;

  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />

  console.log(user);
  user.getUserEvaluations.forEach(function(_evaluation){
    if (_evaluation.project.id == router.query.project) {
      evaluation = _evaluation;
    }
  });
  console.log(evaluation);


  return (
    <Layout>
      <PageTitleBar title="Peer review" backButton />

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
                icon={icon}
                checkedIcon={checkedIcon}
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
                icon={icon}
                checkedIcon={checkedIcon}
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

              await updateUserReviews({ variables: { evaluation: evaluation.id, reviews: [{ toUser: user.id, honors: newHonors }]}});
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

export default withAuth(Index);
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import Box from '@material-ui/core/Box';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import GraphQlError from '../../components/GraphQlError';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import withAuth from '../../components/withAuth';


const GET_TASK = gql`
  query GetTask($id: ID!) {
    getTask(id: $id) {
      id
      work {
        id
      }
      name
      difficulty
      order
      progress {
        id
        name
      }
      users {
        id
        name
        image {
          id
          address
        }
      }
    }
  }
`;


export const UPDATE_TASK_REVIEW = gql`
  mutation UpdateTaskReview($taskReview: TaskReviewInput!) {
    updateTaskReview (taskReview: $taskReview)
  }
`;

const marks = [
  {
    value: -5,
    label: 'Bad',
  },
  {
    value: 0,
    label: 'Neutral',
  },
  {
    value: 5,
    label: 'Good',
  }
];


function Evaluate() {
  const router = useRouter();
  const [newScore, setNewScore] = React.useState();

  const results = [
    [null, useQuery(GET_TASK, {variables: {id: router.query.task}})],
    useMutation(UPDATE_TASK_REVIEW),
  ];
  const [getTask, updateTaskReview] = results.map(result => result[0]);
  console.log(results[0][1]);
  const task = results[0][1].data ? results[0][1].data.getTask : null;

  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />

  return (
    <Layout>
      <PageTitleBar title="Task review" backButton />

      <Container maxWidth="sm">

        <SectionBox titleBar={<SectionTitleBar title={task.name} />}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box style={{margin: "2rem"}}>
                <Slider
                  defaultValue={0}
                  min={-5}
                  max={5}
                  step={1}
                  onChange={(event, newValue) => {
                    setNewScore(newValue);
                  }}
                  valueLabelDisplay="on"
                  marks={marks}
                />
              </Box>
            </Grid>
          </Grid>
        </SectionBox>

        <Box align="center">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await updateTaskReview({ variables: { taskReview: { task: task.id, honor: newScore }}});
              router.push(`/tasks/${task.id}`);
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

export default withAuth(Evaluate);
import { useRouter } from 'next/router';
import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';

import withAuthServerSide from '../../utils/withAuthServerSide';
import {
  mutateToBackend,
  queryToBackend
} from "../../utils/requestToBackend";
import {
  GetTaskQueryBuilder,
  UpdateTaskReviewMutationBuilder,
} from '../../queries/task';

import Layout from '../../components/Layout';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';

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

export const getServerSideProps = withAuthServerSide( async ({ context }) => {
  const taskResult = await queryToBackend({
    context,
    query: new GetTaskQueryBuilder().withWork().withProgress().withUsers().build(),
    variables: {
      id: context.query.task,
    },
  });

  if (!taskResult.data.getTask) {
    return {
      notFound: true,
    };
  };

  return {
    props: {
      task: taskResult.data.getTask,
    },
  };
});

function Evaluate({ task }) {
  const router = useRouter();
  const [newScore, setNewScore] = React.useState();

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
              await mutateToBackend({
                mutation: new UpdateTaskReviewMutationBuilder().build(),
                variables: {
                  taskReview: {
                    task: task.id,
                    honor: newScore
                  }
                }
              });
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

export default Evaluate;

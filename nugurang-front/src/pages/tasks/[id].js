import React from 'react';
import { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';

import withAuthServerSide from '../../utils/withAuthServerSide';
import {
  mutateToBackend,
  queryToBackend
} from "../../utils/requestToBackend";
import {
  GetAllTaskProgressesQueryBuilder,
  GetTaskQueryBuilder,
  UpdateTaskMutationBuilder,
} from '../../queries/task';

import BaseTabs from '../../components/BaseTabs';
import Layout from '../../components/Layout';
import NoContentsBox from '../../components/NoContentsBox';
import PageTitleBar from '../../components/PageTitleBar';
import PositionInfoCard from '../../components/PositionInfoCard';
import SectionBox from '../../components/SectionBox';
import TaskInfoBox from '../../components/TaskInfoBox';
import UserInfoCard from '../../components/UserInfoCard';

const TAB_PROPS = [
  {
    id: 0,
    label: "Progress",
  },
  {
    id: 1,
    label: "Positions",
  },
  {
    id: 2,
    label: "Users",
  },
]

export const getServerSideProps = withAuthServerSide(async ({ context }) => {
  const allTaskProgressesResult = await queryToBackend({
    context,
    query: new GetAllTaskProgressesQueryBuilder().build(),
  });
  const taskResult = await queryToBackend({
    context,
    query: new GetTaskQueryBuilder().withProgress().withPositions().withUsers().withWork().build(),
    variables: {
      id: context.query.id,
    },
  });

  if (!taskResult.data.getTask) {
    return {
      notFound: true,
    };
  };

  return {
    props: {
      allTaskProgresses: allTaskProgressesResult.data.progresses,
      task: taskResult.data.getTask,
    },
  };
});

function Task({ allTaskProgresses, task }) {
  const router = useRouter();
  const selectableProgresses = [];

  allTaskProgresses.forEach(progress => {
    if (task.progress.id !== progress.id) {
      selectableProgresses.push(progress);
    }
  });

  return (
    <Layout>
      <PageTitleBar title="Task info" backButton="true" backButtonLink={`/works/${task.work.id}`}>
        <Button variant="" onClick={() => router.push({pathname: "/tasks/evaluate", query: { task: router.query.id }})}>
          <ThumbsUpDownIcon style={{margin: "0 0.5rem"}} />
          Evaluate
        </Button>
      </PageTitleBar>
      <Container maxWidth="md">
        <SectionBox border={false}>
          <TaskInfoBox task={task} />
        </SectionBox>
        <SectionBox>
          <BaseTabs tabProps={TAB_PROPS}>
            {
              selectableProgresses && selectableProgresses.length
              ? (
                <Box display="flex" justifyContent="center">
                  {[selectableProgresses].flat().map((progress) => 
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        await mutateToBackend({
                          mutation: new UpdateTaskMutationBuilder().build(),
                          variables: {
                            id: task.id,
                            task: {
                              name: task.name,
                              users: task.users.map(user => user.id),
                              positions: task.positions.map(position => position.id),
                              progress: progress.id,
                            }
                          }
                        });
                        router.push(`/works/${task.work.id}`);
                      }}
                    >
                      <Button variant="contained" type="submit">Move to {progress.name}</Button>
                    </form>
                  )}
                </Box>
              )
              : <NoContentsBox />
            }
            {
              task.positions && (task.positions.length)
              ? <Grid container>{[task.positions].flat().map((position) => <Grid item xs={12} sm={6} md={4}><PositionInfoCard position={position} /></Grid>)}</Grid>
              : <NoContentsBox />
            }
            {
              task.users && (task.users.length)
              ? <Grid container>{[task.users].flat().map((user) => <Grid item xs={12} sm={6} md={4}><UserInfoCard user={user} /></Grid>)}</Grid>
              : <NoContentsBox />
            }
          </BaseTabs>
        </SectionBox>
      </Container>
    </Layout>
  );
}

export default Task;

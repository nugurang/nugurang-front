import React from 'react';
import { useRouter } from 'next/router';
import { gql, useMutation, useQuery } from '@apollo/client';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';

import withAuth from '../../components/withAuth';
import BaseTabs from '../../components/BaseTabs';
import GraphQlError from '../../components/GraphQlError';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import NoContentsBox from '../../components/NoContentsBox';
import PageTitleBar from '../../components/PageTitleBar';
import PositionInfoCard from '../../components/PositionInfoCard';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
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

const PROGRESSES = gql`
  query Progresses {
    progresses {
      id
      name
    }
  }
`;

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
      positions {
        id
        name
        description
        image {
          id
          address
        }
      }
      users {
        id
        name
        image {
          id
          address
        }
      }
      work {
        id
      }
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $task: TaskInput!) {
    updateTask (id: $id, task: $task) {
      id
    }
  }
`;

function Task() {
  const router = useRouter();

  const results = [
    [null, useQuery(PROGRESSES)],
    [null, useQuery(GET_TASK, {variables: {id: router.query.id}})],
    useMutation(UPDATE_TASK),
  ];
  const [progresses, getTask, updateTask] = results.map(result => result[0]);
  const allProgresses = results[0][1].data?.progresses;
  const selectableProgresses = []
  const task = results[1][1].data?.getTask;

  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />;

  allProgresses.forEach(function(progress){
    if (task.progress.id != progress.id) {
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
            selectableProgresses && (selectableProgresses.length)
            ? (
              <Box display="flex" justifyContent="center">
                {[selectableProgresses].flat().map((progress) => 
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      await updateTask({ variables: {id: router.query.id, task: { name: task.name, users: task.users.map(user => user.id), positions: task.positions.map(position => position.id), progress: progress.id }}});
                      router.push(`/works/${task.work.id}`);
                    }}
                  >
                    <Button variant="outlined" type="submit">Move to {progress.name}</Button>
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

export default withAuth(Task);
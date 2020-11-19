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
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import TaskInfoBox from '../../components/TaskInfoBox';


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
      honors {
        honor
        position {
          id
          name
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
    <Container maxWidth="sm">
      <PageTitleBar title="Task info" backButton="true" backButtonLink={`/works/${task.work.id}`}>
        <Button variant="" onClick={() => router.push({pathname: "/tasks/evaluate", query: { project: router.query.id }})}>
          <ThumbsUpDownIcon style={{margin: "0 0.5rem"}} />
          Evaluate
        </Button>
      </PageTitleBar>
      <SectionBox border={false}>
        <TaskInfoBox task={task} />
      </SectionBox>
        {
          selectableProgresses && (selectableProgresses.length)
          ? (

            <Box display="flex" justifyContent="center">

            {[selectableProgresses].flat().map((progress) => 
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const taskRes = await updateTask({ variables: {id: router.query.id, task: { name: task.name, users: task.users, positions: task.honors.map(honor => honor.position), progress: progress.id }}});
                  router.push(`/tasks/${router.query.id}`);
                }}
              >
                <Button variant="outlined" type="submit">Move to {progress.name}</Button>
              </form>
            )}
              
            </Box>
          )
          : <NoContentsBox />
        }
    </Container>
    </Layout>
  );
}

export default withAuth(Task);
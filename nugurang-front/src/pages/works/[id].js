import React from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import withAuth from '../../components/withAuth';
import BaseTabs from '../../components/BaseTabs';
import GraphQlError from '../../components/GraphQlError';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import NoContentsBox from '../../components/NoContentsBox';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import TaskInfoCard from '../../components/TaskInfoCard';
import WorkInfoBox from '../../components/WorkInfoBox';


const TEST_USER_LIST = [
  {
    id: 0,
    name: "Test User",
    email: "Test email",
    image: "/static/images/sample_1.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
  {
    id: 1,
    name: "Test User",
    email: "Test email",
    image: "/static/images/sample_2.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
  {
    id: 2,
    name: "Test User",
    email: "Test email",
    image: "/static/images/sample_3.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
  {
    id: 3,
    name: "Test User",
    email: "Test email",
    image: "/static/images/sample_4.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
]


const TEST_TASK_TODO_LIST = [
  {
    id: 0,
    name: "Test task to-do 1",
    users: TEST_USER_LIST,
  },
  {
    id: 1,
    name: "Test task to-do 2",
    users: TEST_USER_LIST,
  },
  {
    id: 2,
    name: "Test task to-do 3",
    users: TEST_USER_LIST,
  },
]


const TEST_TASK_DOING_LIST = [
  {
    id: 0,
    name: "Test task doing 1",
    users: TEST_USER_LIST,
  },
  {
    id: 1,
    name: "Test task doing 2",
    users: TEST_USER_LIST,
  },
  {
    id: 2,
    name: "Test task doing 3",
    users: TEST_USER_LIST,
  },
]


const TEST_TASK_DONE_LIST = [
  {
    id: 0,
    name: "Test task done 1",
    users: TEST_USER_LIST,
  },
  {
    id: 1,
    name: "Test task done 2",
    users: TEST_USER_LIST,
  },
  {
    id: 2,
    name: "Test task done 3",
    users: TEST_USER_LIST,
  },
]



const TAB_PROPS = [
  {
    id: 0,
    label: "To do",
  },
  {
    id: 1,
    label: "Doing",
  },
  {
    id: 2,
    label: "Done",
  },
]

const GET_WORK = gql`
  query getWork($id: ID!) {
    getWork(id: $id) {
      id
      project {
        id
      }
      name
      opened
      order
      tasks {
        id
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
  }
`;


function WorkInfo() {
  const router = useRouter();
  const responses = [
    useQuery(GET_WORK, {variables: {id: router.query.id}}),
  ];
  const errorResponse = responses.find((response) => response.error)
  if (errorResponse)
    return <GraphQlError error={errorResponse.error} />
  if (responses.some((response) => response.loading))
    return <Loading />;
  const work = responses[0].data ? responses[0].data.getWork : null;

  work.tasks.forEach(function(task){
    task.onClick = () => router.push(`/tasks/${task.id}`);
  });

  return (
    <Layout>
      <PageTitleBar title="Work info" backButton="true" backButtonLink={`/projects/${work.project.id}`}>
        <Button onClick={() => router.push({pathname: "/tasks/create", query: { work: router.query.name }})}>
          Create task
        </Button>
      </PageTitleBar>
      <SectionBox border={false}>
        <WorkInfoBox work={work} />
      </SectionBox>
      <SectionBox>
        <BaseTabs tabProps={TAB_PROPS}>
          {
            TEST_TASK_TODO_LIST && (TEST_TASK_TODO_LIST.length)
            ? <Grid container>{[TEST_TASK_TODO_LIST].flat().map((task) => <Grid item xs={12} sm={6} md={4}><TaskInfoCard task={task} /></Grid>)}</Grid>
            : <NoContentsBox />
          }
          {
            TEST_TASK_DOING_LIST && (TEST_TASK_DOING_LIST.length)
            ? <Grid container>{[TEST_TASK_DOING_LIST].flat().map((task) => <Grid item xs={12} sm={6} md={4}><TaskInfoCard task={task} /></Grid>)}</Grid>
            : <NoContentsBox />
          }
          {
            TEST_TASK_DONE_LIST && (TEST_TASK_DONE_LIST.length)
            ? <Grid container>{[TEST_TASK_DONE_LIST].flat().map((task) => <Grid item xs={12} sm={6} md={4}><TaskInfoCard task={task} /></Grid>)}</Grid>
            : <NoContentsBox />
          }
        </BaseTabs>
      </SectionBox>
    </Layout>
  );
}

export default withAuth(WorkInfo);
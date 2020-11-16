import React from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
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
import TaskInfoCard from '../../components/TaskInfoCard';
import WorkInfoBox from '../../components/WorkInfoBox';


const GET_TASK = gql`
  query getTask($id: ID!) {
    getTask(id: $id) {
      id
      work
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


function Task() {
  const router = useRouter();
  const responses = [
    useQuery(GET_WORK, {variables: {id: router.query.id}}),
  ];
  const errorResponse = responses.find((response) => response.error)
  if (errorResponse)
    return <GraphQlError error={errorResponse.error} />
  if (responses.some((response) => response.loading))
    return <Loading />;
  const task = responses[0].data ? responses[0].data.getTask : null;

  return (
    <Layout>
      <PageTitleBar title="Task info" backButton="true" backButtonLink={`/works/${task.work.id}`}>
        <Button variant="" onClick={() => router.push({pathname: "/tasks/evaluate", query: { project: router.query.id }})}>
          <ThumbsUpDownIcon />
          Evaluate
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

export default withAuth(Task);
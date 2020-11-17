import { useRouter } from 'next/router';
import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';

import AddIcon from '@material-ui/icons/Add';

import withAuth from '../../../components/withAuth';
import ArticleListItem from '../../../components/ArticleListItem';
import EventInfoBox from '../../../components/EventInfoBox';
import GraphQlError from '../../../components/GraphQlError';
import Layout from '../../../components/Layout';
import Loading from '../../../components/Loading';
import NoContentsBox from '../../../components/NoContentsBox';
import PageTitleBar from '../../../components/PageTitleBar';
import SectionTitleBar from '../../../components/SectionTitleBar';
import SectionBox from '../../../components/SectionBox';


const GET_THREAD = gql`
  query GetThread($id: ID!) {
    getThread(id: $id) {
      id
      name
      upCount
      commentCount
      user {
        name
        image {
          address
        }
      }
      event {
        id
        name
        description
        images {
          id
          address
        }
        recruitingStart
        recruitingEnd
        eventStart
        eventEnd
      }
      firstArticle {
        images {
          address
        }
      }
      getArticles(page: 1, pageSize: 5) {
        id
        title
        content
        user {
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


function Event() {
  const router = useRouter();

  const results = [
    [null, useQuery(GET_THREAD, {variables: {id: router.query.id}})],
  ];
  const thread = results[0][1].data ? results[0][1].data.getThread : null;
  const event = results[0][1].data ? results[0][1].data.getThread.event : null;

  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />

  return (
    <Layout>
      <PageTitleBar title="Event" backButton />

      <Grid container>
        <Grid item xs={12} sm={6} md={4}>
          <SectionBox>
            <EventInfoBox event={event} />
            <Box align="right" style={{margin: "0.5rem"}}>
              <Button disabled onClick={() => router.push({pathname: "/events/join", query: { event: thread.event.id }})}>Match</Button>
            </Box>
          </SectionBox>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <SectionBox
            titleBar={
              (
                <SectionTitleBar title="Related articles" icon={<AssignmentIcon />}>
                  <IconButton onClick={() => router.push({pathname: "/threads/create", query: { board: router.query.board, event: router.query.event }})}>
                    <AddIcon />
                  </IconButton>
                </SectionTitleBar>
              )
            }
          >
            {
              thread.getArticles && (thread.getArticles.length)
              ? <List>{[thread.getArticles].flat().map((article) => <ArticleListItem article={article} />)}</List>
              : <NoContentsBox />
            }
          </SectionBox>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default withAuth(Event);

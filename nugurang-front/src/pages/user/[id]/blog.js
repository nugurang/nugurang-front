import React from 'react';
import {useRouter} from 'next/router';
import { gql, useQuery } from '@apollo/client';
import Grid from'@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Button from'@material-ui/core/Button';

import AddIcon from '@material-ui/icons/Add';

import GraphQlError from '../../../components/GraphQlError';
import HonorCard from '../../../components/HonorCard';
import Layout from '../../../components/Layout';
import Loading from '../../../components/Loading';
import NoContentsBox from '../../../components/NoContentsBox';
import PageTitleBar from '../../../components/PageTitleBar';
import SectionBox from '../../../components/SectionBox';
import ThreadListItem from '../../../components/ThreadListItem';
import withAuth from '../../../components/withAuth';


  export const GET_USER = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      image {
        id
        address
      }
      blog{
        id
        getThreads(page: 0, pageSize: 5) {
          id
          name
          user {
            name
            image {
              address
            }
          }
          firstArticle {
            id
            title
            content
            createdAt
            modifiedAt
            images {
              address
            }
            viewCount
            upCount
            downCount
            starCount
          }
        }
      }
    }
  }
`;

function Blog() {
 const router = useRouter();

  const responses = [
    useQuery(GET_USER, {variables: {id: router.query.id}})
  ];
  const errorResponse = responses.find((response) => response.error)
  if (errorResponse)
    return <GraphQlError error={errorResponse.error} />

  if (responses.some((response) => response.loading))
    return <Loading />;

  const user = responses[0].data ? responses[0].data.getUser : null;
  const threads = responses[0].data ? responses[0].data.getUser.blog.getThreads : null;

  threads.forEach(function(thread){
    thread.onClick = () => router.push(`/threads/${thread.id}`);
  });

  return (
    <Layout>
      <PageTitleBar title="Blog" backButton>
        <Button variant="" onClick={() => router.push({pathname: "/threads/create", query: { board: user.blog.id }})}>
          <AddIcon />
        </Button>
      </PageTitleBar>
      <SectionBox>
        {
          threads && threads.length
          ? <List>{[threads].flat().map((thread) => <ThreadListItem thread={thread} />)}</List>
          : <NoContentsBox />
        }
      </SectionBox>
    </Layout>
  );
}

export default withAuth(Blog);
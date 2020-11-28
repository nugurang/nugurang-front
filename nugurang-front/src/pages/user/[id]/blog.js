import React from 'react';
import {useRouter} from 'next/router';
import { gql, useQuery } from '@apollo/client';
import Grid from'@material-ui/core/Grid';
import List from '@material-ui/core/List';
import EditIcon from '@material-ui/icons/Edit';
import Button from'@material-ui/core/Button';

import GraphQlError from '../../../components/GraphQlError';
import HonorCard from '../../../components/HonorCard';
import Layout from '../../../components/Layout';
import Loading from '../../../components/Loading';
import NoContentsBox from '../../../components/NoContentsBox';
import PageTitleBar from '../../../components/PageTitleBar';
import SectionBox from '../../../components/SectionBox';
import ThreadListItem from '../../../components/ThreadListItem';
import withAuth from '../../../components/withAuth';


const COMP_OV_IMAGE_ADDRESS = "/static/images/sample_1.jpg";

const THREAD_LIST_ITEMS = [
    {
      id: 0,
      name: "Test thread 1",
      user: {
        id: 0,
        name: "Test user name",
        image: {
          id: 0,
          address: {COMP_OV_IMAGE_ADDRESS},
        },
      },
      team: null,
      event: null,
      firstArticle: {
        id: 0,
        content: "First article",
        viewCount: 10,
        createdAt: "2020-09-01 00:00:00",
        modifiedAt: "2020-09-02 00:00:00",
        title: "First article title",
        user: {
          id: 0,
          name: "Test user name",
          image: {
            id: 0,
            address: {COMP_OV_IMAGE_ADDRESS},
          },
        },
        parent: null,
        images: [
          {
            id: 0,
            address: {COMP_OV_IMAGE_ADDRESS},
          },
        ],
      },
      getArticles: {

      },
      upCount: 1,
      downCount: 2,
      starCount: 3,
      commentCount: 4,
    },
    {
      id: 0,
      name: "Test thread 2",
      user: {
        id: 0,
        name: "Test user name",
        image: {
          id: 0,
          address: {COMP_OV_IMAGE_ADDRESS},
        },
      },
      team: null,
      event: null,
      firstArticle: {
        id: 0,
        content: "First article",
        viewCount: 10,
        createdAt: "2020-09-01 00:00:00",
        modifiedAt: "2020-09-02 00:00:00",
        title: "First article title",
        user: {
          id: 0,
          name: "Test user name",
          image: {
            id: 0,
            address: {COMP_OV_IMAGE_ADDRESS},
          },
        },
        parent: null,
        images: [
          {
            id: 0,
            address: {COMP_OV_IMAGE_ADDRESS},
          },
        ],
      },
      getArticles: {

      },
      upCount: 1,
      downCount: 2,
      starCount: 3,
      commentCount: 4,
    },
  ];


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
      }
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

  const user = responses[0].data.getUser;
  THREAD_LIST_ITEMS.forEach(function(thread){
    thread.onClick = () => router.push(`/threads/${thread.id}`);
  });

  return (
    <Layout>
      <PageTitleBar title="Blog" backButton>
        <Button variant="" onClick={() => router.push({pathname: "/threads/create", query: { board: user.blog.id }})}>
          <EditIcon />
        </Button>
      </PageTitleBar>
      <SectionBox>
        {
              THREAD_LIST_ITEMS
              ? <List>{THREAD_LIST_ITEMS.flat().map((thread) => <ThreadListItem thread={thread} />)}</List>
              : <NoContentsBox />
            }
      </SectionBox>
    </Layout>
  );
}

export default withAuth(Blog);
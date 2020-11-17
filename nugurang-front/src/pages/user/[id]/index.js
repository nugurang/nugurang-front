import React from 'react';
import {useRouter} from 'next/router';
import { gql, useMutation, useQuery } from '@apollo/client';
import Box from'@material-ui/core/Box';
import Button from'@material-ui/core/Button';
import Grid from'@material-ui/core/Grid';
import IconButton from'@material-ui/core/IconButton';
import List from'@material-ui/core/List';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BookIcon from '@material-ui/icons/Book';
import EditIcon from '@material-ui/icons/Edit';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';

import withAuth from '../../../components/withAuth';
import Layout from '../../../components/Layout';
import HonorCard from '../../../components/HonorCard';
import GraphQlError from '../../../components/GraphQlError';
import Loading from '../../../components/Loading';
import NoContentsBox from '../../../components/NoContentsBox';
import PageTitleBar from '../../../components/PageTitleBar';
import SectionBox from '../../../components/SectionBox';
import SectionTitleBar from '../../../components/SectionTitleBar';
import UserInfoBox from '../../../components/UserInfoBox';
import ThreadListItem from '../../../components/ThreadListItem';


const TEST_USER = {
  id: 0,
  name: "Test User",
  email: "Test email",
  image: "/static/images/sample_1.jpg",
  bio: "Test bio",
  followers: 5,
  followings: 10,
}

const TEST_BLOG_THREAD = [
  {
    id: 0,
    user: TEST_USER,
    title: "Recent event 1",
    content: "Content and more",
    image: "/static/images/sample_1.jpg",
    like: 3,
    topic: "Test topic",
    view: 4,
    vote: 5,
  }
];

const TEST_HONOR_BADGE_LIST = [
  {
    id: 0,
    name: "Pikachu",
    image: {
      id: 0,
      address: "/static/images/sample_1.jpg",
    },
    score: "1000000",
  },
  {
    id: 1,
    name: "Raichu",
    image: {
      id: 0,
      address: "/static/images/sample_1.jpg",
    },
    score: "2000000",
  },
  {
    id: 2,
    name: "Charmander",
    image: {
      id: 0,
      address: "/static/images/sample_1.jpg",
    },
    score: "3000000",
  },
  {
    id: 3,
    name: "Squirtle",
    image: {
      id: 0,
      address: "/static/images/sample_1.jpg",
    },
    score: "4000000",
  },
];


export const GET_USER = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      biography
      totalHonor
      image {
        id
        address
      }
      blog {
        id
      }
      getThreads(page: 0, pageSize: 3) {
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
        firstArticle {
          images {
            address
          }
        }
      }
      getFollowings(page: 0, pageSize: 100) {
        id
      }
      getFollowers(page: 0, pageSize: 100) {
        id
      }
    }
  }
`;


export const CURRENT_USER = gql`
  query currentUser{
    currentUser {
      id
      name
      email
    }
  }
`;

export const CREATE_FOLLOWING = gql`
  mutation createFollowing($user: ID!) {
    createFollowing(user: $user)
  }
`;


function UserInfo() {
  const router = useRouter();
  const results = [
    [null, useQuery(GET_USER, {variables: {id: router.query.id}})],
    [null, useQuery(CURRENT_USER)],
    useMutation(CREATE_FOLLOWING)
  ];
  const user = results[0][1].data ? results[0][1].data.getUser : null;
  const recentThreads = results[0][1].data ? results[0][1].data.getUser.getThreads : [];
  const currentUser = results[1][1].data ? results[1][1].data.currentUser : null;
  const [getUser, getCurrentUser, createFollowing] = results.map(result => result[0]);

  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />;

  recentThreads.forEach(function(thread){
    thread.onClick = () => router.push(`/threads/${thread.id}`);
  });

  return (
    <Layout>
      {
        user.id === currentUser.id
        ? (
          <PageTitleBar title="My info" backButton>
            <IconButton onClick={() => router.push(`/user/update`)}>
              <EditIcon />
            </IconButton>
          </PageTitleBar>
        )
        : <PageTitleBar title="User info" backButton />
      }

      <Grid container>
        <Grid item xs={12} md={6} lg={4}>
          <SectionBox border={false}>
            <UserInfoBox user={user} />
            <Grid container direction="row" justify="flex-end">
              <Grid item align="right">
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    createFollowing({ variables: {user: router.query.id}});
                  }}
                >
                  <Box style={{margin: "1rem"}}>
                    <Button variant="outlined" onClick={() => router.push(`/user/${router.query.id}/follows`)}>
                      People
                    </Button>
                    <Button variant="outlined" type="submit">
                      Follow
                    </Button>
                  </Box>
                </form>
              </Grid>
            </Grid>
          </SectionBox>
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <SectionBox
            titleBar={(
              <SectionTitleBar title="Recent threads" icon=<AssignmentIcon />>
                <IconButton onClick={() => router.push(`/user/${router.query.id}/threads`)}>
                  <ArrowForwardIcon />
                </IconButton>
              </SectionTitleBar>
            )}
          >
            {
              user.getThreads && (user.getThreads.length)
              ? <List>{[recentThreads].flat().map((thread) => <ThreadListItem thread={thread} />)}</List>
              : <NoContentsBox />
            }
          </SectionBox>

          <SectionBox
            titleBar={(
              <SectionTitleBar title="Recent blog updates" icon=<BookIcon />>
                <IconButton onClick={() => router.push(`/blog/${router.query.id}`)}>
                  <ArrowForwardIcon />
                </IconButton>
              </SectionTitleBar>
            )}
          >
            {
              TEST_BLOG_THREAD && (TEST_BLOG_THREAD.length)
              ? <List>{[TEST_BLOG_THREAD].flat().map((thread) => <ThreadListItem thread={thread} />)}</List>
              : <NoContentsBox />
            }
          </SectionBox>

          <SectionBox
            titleBar={(
              <SectionTitleBar title="Honor badges" icon=<EmojiEventsIcon />>
                <IconButton onClick={() => router.push(`/user/${router.query.id}/honor`)}>
                  <ArrowForwardIcon />
                </IconButton>
              </SectionTitleBar>
            )}
          >
            {
              TEST_HONOR_BADGE_LIST && (TEST_HONOR_BADGE_LIST.length)
              ? <Grid container>{[TEST_HONOR_BADGE_LIST].flat().map((honor) => <Grid item xs={4} md={3}><HonorCard honor={honor} /></Grid>)}</Grid>
              : <NoContentsBox />
            }
          </SectionBox>

        </Grid>
      </Grid>
    </Layout>
  );
}

export default withAuth(UserInfo);
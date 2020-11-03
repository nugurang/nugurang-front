import React from 'react';
import {useRouter} from 'next/router';
import { gql, useMutation, useQuery } from '@apollo/client';
import Box from'@material-ui/core/Box';
import Grid from'@material-ui/core/Grid';
import BookIcon from '@material-ui/icons/Book';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';

import Layout from '../../../components/Layout';
import BaseButton from '../../../components/BaseButton';
import HonorBadgeGrid from '../../../components/HonorBadgeGrid';
import GraphQlError from '../../../components/GraphQlError';
import Loading from '../../../components/Loading';
import SectionBox from '../../../components/SectionBox';
import SectionTitleBar from '../../../components/SectionTitleBar';
import UserInfoBox from '../../../components/UserInfoBox';
import ThreadList from '../../../components/ThreadList';
import withAuth from '../../../components/withAuth';


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
    image: "/static/images/sample_1.jpg",
    score: "1000000",
  },
  {
    id: 1,
    name: "Raichu",
    image: "/static/images/sample_1.jpg",
    score: "2000000",
  },
  {
    id: 2,
    name: "Charmander",
    image: "/static/images/sample_1.jpg",
    score: "3000000",
  },
  {
    id: 3,
    name: "Squirtle",
    image: "/static/images/sample_1.jpg",
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
      getFollowings(page: 0, pageSize: 100) {
        id
      }
      getFollowers(page: 0, pageSize: 100) {
        id
      }
    }
  }
`;


export const GET_CURRENT_USER = gql`
  query {
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
  const responses = [
    useQuery(GET_USER, {variables: {id: router.query.id}}), useQuery(GET_CURRENT_USER), useMutation(CREATE_FOLLOWING)
  ];
  const errorResponse = responses.find((response) => response.error)
  if (errorResponse)
    return <GraphQlError error={errorResponse.error} />

  if (responses.some((response) => response.loading))
    return <Loading />;

  const user = responses[0].data.getUser;
  const currentUser = responses[1].data.currentUser;
  const createFollowing = responses[2][0];

  return (
    <Layout>

      {
        user.id === currentUser.id
        ? <SectionTitleBar title="My info" backButton />
        : <SectionTitleBar title="User info" backButton />
      }

      <SectionBox border={false}>
        <UserInfoBox user={user}/>
        <Grid container direction="row" justify="flex-end">
          <Grid item align="right">
            <BaseButton label="Follows" onClick={() => router.push(`/user/${router.query.id}/follows`)} />
          </Grid>
          <Grid item align="right">
            {
              user.id === currentUser.id
              ? <BaseButton label="Sign out" onClick={() => router.push('/signout')} />
              : (
                <>
                  <Box display={true ? "block" : "none"}>
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        createFollowing({ variables: {user: router.query.id}});
                      }}
                    >
                      <BaseButton
                        label="Follow"
                        type="submit"
                      />
                    </form>
                  </Box>
                  <Box display={true ? "none" : "block"}>
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        createFollowing({ variables: {user: router.query.id}});
                      }}
                    >
                      <BaseButton
                        label="Unfollow"
                        type="submit"
                      />
                    </form>
                  </Box>
                </>
              )
            }
          </Grid>
        </Grid>
      </SectionBox>


      <SectionBox
        titleBar={(
          <SectionTitleBar title="Latest blog thread" icon=<BookIcon />>
            <BaseButton label="Visit blog" onClick={() => router.push(`/blog/${router.query.id}`)}/>
          </SectionTitleBar>
        )}
      >
        <ThreadList items={TEST_BLOG_THREAD}/>
      </SectionBox>


      <SectionBox
        titleBar={(
          <SectionTitleBar title="Honor badges" icon=<EmojiEventsIcon />>
            <BaseButton label="More" onClick={() => router.push(`/user/${router.query.id}/honor`)} />
          </SectionTitleBar>
        )}
      >
        <HonorBadgeGrid items={TEST_HONOR_BADGE_LIST} />
      </SectionBox>

    </Layout>
  );
}

export default withAuth(UserInfo);
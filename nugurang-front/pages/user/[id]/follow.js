import React from 'react';
import {useRouter} from 'next/router';
import { gql, useQuery } from '@apollo/client';

import Layout from '../../../components/Layout';
import BaseTabs from '../../../components/BaseTabs';
import GraphQlError from '../../../components/GraphQlError';
import Loading from '../../../components/Loading';
import SectionBox from '../../../components/SectionBox';
import SectionTitleBar from '../../../components/SectionTitleBar';
import UserList from '../../../components/UserList';
import withAuth from '../../../components/withAuth';


const TEST_FOLLOWING_LIST = [
  {
    id: 0,
    name: "Test Following 1",
    email: "Test email",
    image: "/static/images/sample_1.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
  {
    id: 1,
    name: "Test Following 2",
    email: "Test email",
    image: "/static/images/sample_2.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
  {
    id: 2,
    name: "Test Following 3",
    email: "Test email",
    image: "/static/images/sample_3.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
  {
    id: 3,
    name: "Test Following 4",
    email: "Test email",
    image: "/static/images/sample_4.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
]


const TEST_FOLLOWERS_LIST = [
  {
    id: 0,
    name: "Test Follower 1",
    email: "Test email",
    image: "/static/images/sample_1.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
  {
    id: 1,
    name: "Test Follower 2",
    email: "Test email",
    image: "/static/images/sample_2.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
  {
    id: 2,
    name: "Test Follower 3",
    email: "Test email",
    image: "/static/images/sample_3.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
  {
    id: 3,
    name: "Test Follower 4",
    email: "Test email",
    image: "/static/images/sample_4.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
]



const TAB_PROPS = [
  {
    id: 0,
    label: "Following",
  },
  {
    id: 1,
    label: "Followers",
  },
]


export const GET_USER = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      id
      getFollowings(page: 0, pageSize: 100) {
        id
      }
      getFollowers(page: 0, pageSize: 100) {
        id
      }
    }
  }
`;


function Follow() {
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

  return (
    <Layout>

      <SectionTitleBar title="Follow" backButton />

      <SectionBox>
        <BaseTabs tabProps={TAB_PROPS}>
          <UserList
            items={user.getFollowings}
            link="/user"
          />
          <UserList
            items={user.getFollowers}
            link="/user"
          />
        </BaseTabs>
      </SectionBox>

    </Layout>
  );
}

export default withAuth(Follow);
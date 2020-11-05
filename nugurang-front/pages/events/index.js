import { useRouter } from 'next/router';
import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';

import { COMMON_BOARDS, EVENT_BOARDS } from '../../src/config';
import GraphQlError from '../../components/GraphQlError';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import SectionTitleBar from '../../components/SectionTitleBar';
import SectionBox from '../../components/SectionBox';
import ThreadBox from '../../components/ThreadBox';
import withAuth from '../../components/withAuth';


const TEST_AVATAR = "/static/images/sample_1.jpg";
const TEST_IMAGE = "/static/images/sample_2.jpg";


const TEST_USER = {
  id: 0,
  name: "Test User",
  email: "Test email",
  image: "/static/images/sample_1.jpg",
  bio: "Test bio",
  followers: 5,
  followings: 10,
};

const TEST_ARTICLE_LIST = [
  {
    id: 0,
    author: TEST_USER,
    title: "Test title",
    content: "Content and more",
    image: TEST_IMAGE,
    like: 3,
    topic: "Test topic",
    view: 4,
    vote: 5,
  },
  {
    id: 1,
    author: TEST_USER,
    title: "Ignored",
    content: "Content and more",
    image: TEST_IMAGE,
    like: 3,
    topic: "Test topic",
    view: 4,
    vote: 5,
  },
  {
    id: 2,
    author: TEST_USER,
    title: "Ignored",
    content: "Content and more",
    image: TEST_IMAGE,
    like: 3,
    topic: "Test topic",
    view: 4,
    vote: 5,
  },
];
const TEST_THREAD = {
  id: 0,
  articles: TEST_ARTICLE_LIST,
  like: 3,
  topic: "Test topic",
  view: 4,
  vote: 5,
};


function Event(threadId) {
  const router = useRouter();
  return (
    <Layout>
      <SectionTitleBar title="Event" backButton backButtonLink="/boards">
        <Button onClick={() => router.push({pathname: "/articles/create", query: { thread: thread.id }})}>Leave comment</Button>
      </SectionTitleBar>

    </Layout>
  );
}

export default withAuth(Event);
import { useRouter } from 'next/router';
import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { COMMON_BOARDS, EVENT_BOARDS } from '../../src/config';

import withAuth from '../../components/withAuth';
import Loading from '../../components/Loading';
import GraphQlError from '../../components/GraphQlError';
import Layout from '../../components/Layout';
import SectionTitleBar from '../../components/SectionTitleBar';
import SectionBox from '../../components/SectionBox';
import ThreadBox from '../../components/ThreadBox';


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
    content: "Content and moressssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
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

const GET_THREAD = gql`
  query GetThread($id: ID!) {
    getThread(id: $id) {
      id
      name
      getArticles(page: 0, pageSize: 0) {
        id
        user {
          id
          name
        }
        title
        content
        viewCount
        createdAt
        modifiedAt
      }
    }
  }
`;

function Thread(threadId) {
  const router = useRouter();
  const [showEvents, setShowEvents] = useState(false);
  const toggleShowEvents = () => {
    setShowEvents((prev) => !prev);
  };

  const responses = [
    useQuery(GET_THREAD, {variables: {id: router.query.id}})
  ];
  const errorResponse = responses.find((response) => response.error)
  if (errorResponse)
    return <GraphQlError response={errorResponse} />

  if (responses.some((response) => response.loading))
    return <Loading />;

  const thread = responses[0].data.getThread;
  const articles = responses[0].data.getThread.getArticles;

  return (
    <Layout>
      <SectionTitleBar title="Boards" backButton/>

      <SectionBox>
        <ThreadBox
          articleLeader={articles[0]}
          articles={articles.slice(1)}
          like={3}
          topic="Test topic"
          view={thread.viewCount}
          vote={5}
        />
      </SectionBox>

    </Layout>
  );
}

export default withAuth(Thread);
import { useRouter } from 'next/router';
import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';

import GraphQlError from '../../components/GraphQlError';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import SectionTitleBar from '../../components/SectionTitleBar';
import SectionBox from '../../components/SectionBox';
import ThreadBox from '../../components/ThreadBox';
import withAuth from '../../components/withAuth';


const GET_THREAD = gql`
  query GetThread($id: ID!) {
    getThread(id: $id) {
      id
      name
      firstArticle {
        id
        user {
          id
          name
          image {
            id
            address
          }
        }
        title
        content
      }
      event {
        id
        title
        content
        images {
          id
          address
        }
        recruitingStart
        recruitingEnd
        eventStart
        eventEnd
      }
      getArticles(page: 0, pageSize: 100) {
        id
        user {
          id
          name
          image {
            id
            address
          }
        }
        title
        content
        viewCount
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
    return <GraphQlError error={errorResponse.error} />

  if (responses.some((response) => response.loading))
    return <Loading />;

  const thread = responses[0].data.getThread;
  const articles = responses[0].data.getThread.getArticles;

  return (
    <Layout>
      <SectionTitleBar title="Thread" backButton backButtonLink="/boards">
        <Button onClick={() => router.push({pathname: "/articles/create", query: { thread: thread.id }})}>Leave comment</Button>
      </SectionTitleBar>

      <SectionBox>
        <ThreadBox
          articleLeader={thread.firstArticle}
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

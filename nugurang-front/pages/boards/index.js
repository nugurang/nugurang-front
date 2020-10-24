import { useRouter } from 'next/router';
import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { COMMON_BOARDS, EVENT_BOARDS } from '../../src/config';

import withAuth from '../../components/withAuth';
import Loading from '../../components/Loading';
import GraphQlError from '../../components/GraphQlError';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import BaseSwitch from '../../components/BaseSwitch';
import Layout from '../../components/Layout';
import SectionTitleBar from '../../components/SectionTitleBar';
import SectionBox from '../../components/SectionBox';
import ThreadGrid from '../../components/ThreadGrid';
import ThreadList from '../../components/ThreadList';

const TEST_HOT_THREAD_LIST = [
  {
    id: 1,
    title: "Article 1",
    content: "Content 1",
    like: 1,
    comment: 3,
    image: "/static/images/sample_1.jpg",
    chip: "Basic1",
  },
  {
    id: 2,
    title: "Article 2 with no images",
    content: "Content 2",
    like: 4,
    comment: 2,
    chip: "Basic2",
  },
  {
    id: 3,
    title: "Article 3 with no chips",
    content: "Content 3",
    like: 9,
    image: "/static/images/sample_3.jpg",
    comment: 1,
  }
];

const TEST_RECENT_THREAD_LIST = [
  {
    id: 1,
    title: "Article 1",
    content: "Content 1",
    like: 1,
    comment: 3,
    image: "/static/images/sample_1.jpg",
    chip: "Basic1",
  },
  {
    id: 2,
    title: "Article 2 with no images",
    content: "Content 2",
    like: 4,
    comment: 2,
    chip: "Basic2",
  },
  {
    id: 3,
    title: "Article 3 with no chips",
    content: "Content 3",
    like: 9,
    image: "/static/images/sample_3.jpg",
    comment: 1,
  }
];

const TEST_HOT_EVENT_LIST = [
  {
    id: 1,
    title: "Article 1",
    content: "Content 1",
    like: 1,
    comment: 3,
    image: "/static/images/sample_1.jpg",
    chip: "Basic1",
  },
  {
    id: 2,
    title: "Article 2 with no images",
    content: "Content 2",
    like: 4,
    comment: 2,
    chip: "Basic2",
  },
  {
    id: 3,
    title: "Article 3 with no chips",
    content: "Content 3",
    like: 9,
    image: "/static/images/sample_3.jpg",
    comment: 1,
  }
];

const TEST_RECENT_EVENT_LIST = [
  {
    id: 1,
    title: "Article 1",
    content: "Content 1",
    like: 1,
    comment: 3,
    image: "/static/images/sample_1.jpg",
    chip: "Basic1",
  },
  {
    id: 2,
    title: "Article 2 with no images",
    content: "Content 2",
    like: 4,
    comment: 2,
    chip: "Basic2",
  },
  {
    id: 3,
    title: "Article 3 with no chips",
    content: "Content 3",
    like: 9,
    image: "/static/images/sample_3.jpg",
    comment: 1,
  }
];

function Boards() {
  const router = useRouter();
  const [showEvents, setShowEvents] = useState(false);
  const toggleShowEvents = () => {
    setShowEvents((prev) => !prev);
  };

  const GET_RECENT_THREADS = gql`
    query getThreads($boardNames: [String]!) {
      getThreadsByBoardNames(boards: $boardNames, page: 0, pageSize: 5) {
        id
        name
      }
    }
  `;
  const GET_RECENT_EVENTS = gql`
    query getThreads($boardNames: [String]!) {
      getThreadsByBoardNames(boards: $boardNames, page: 0, pageSize: 5) {
        id
        name
      }
    }
  `;

  const responses = [
    useQuery(GET_RECENT_THREADS, {variables: {boardNames: COMMON_BOARDS}}),
    useQuery(GET_RECENT_EVENTS, {variables: {boardNames: EVENT_BOARDS}})
  ];

  const errorResponse = responses.find((response) => response.error)
  if (errorResponse)
    return <GraphQlError response={errorResponse} />

  if (responses.some((response) => response.loading))
    return <Loading />;

  console.log(responses);

  return (
    <Layout>
      <SectionTitleBar title="Boards" backButton>
        <BaseSwitch label="Show events" checked={showEvents} onChange={toggleShowEvents} />
      </SectionTitleBar>
      { showEvents ?
        (
          <>
            <SectionBox
              titleBar={<SectionTitleBar title="Hot Events" icon={<WhatshotIcon />} />}
            >
              <ThreadGrid items={TEST_HOT_EVENT_LIST} />
            </SectionBox>

            <SectionBox
              titleBar={<SectionTitleBar title="Recent Events" icon={<TrendingUpIcon />} />}
            >
              <ThreadGrid items={TEST_RECENT_EVENT_LIST} />
            </SectionBox>

          </>
        )
        : (
          <>
            <SectionBox
              titleBar={<SectionTitleBar title="Hot Threads" icon={<WhatshotIcon />} />}
            >
              <ThreadList items={TEST_HOT_THREAD_LIST} />
            </SectionBox>
            <SectionBox
              titleBar={<SectionTitleBar title="Recent Threads" icon={<TrendingUpIcon />} />}
            >
              <ThreadList items={TEST_RECENT_THREAD_LIST} />
            </SectionBox>
          </>
        )}
    </Layout>
  );
}

export default withAuth(Boards);

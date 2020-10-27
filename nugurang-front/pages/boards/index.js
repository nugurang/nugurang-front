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

const GET_THREADS = gql`
  query GetThreads($boardNames: [String]!) {
    getThreadsByBoardNames(boards: $boardNames, page: 0, pageSize: 5) {
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
      image {
        address
      }
    }
  }
`;

const GET_HOT_THREADS = gql`
  query GetHotThreads($boardNames: [String]!) {
    getHotThreadsByBoardNames(boards: $boardNames, page: 0, pageSize: 5) {
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
      image {
        address
      }
    }
  }
`;

function Boards() {
  const router = useRouter();
  const [showEvents, setShowEvents] = useState(false);
  const toggleShowEvents = () => {
    setShowEvents((prev) => !prev);
  };

  const responses = [
    useQuery(GET_THREADS, {variables: {boardNames: COMMON_BOARDS}}),
    useQuery(GET_THREADS, {variables: {boardNames: EVENT_BOARDS}}),
    useQuery(GET_HOT_THREADS, {variables: {boardNames: COMMON_BOARDS}}),
    useQuery(GET_HOT_THREADS, {variables: {boardNames: EVENT_BOARDS}})
  ];

  const errorResponse = responses.find((response) => response.error)
  if (errorResponse)
    return <GraphQlError response={errorResponse} />

  if (responses.some((response) => response.loading))
    return <Loading />;

  const recentThreads = responses[0].data.getThreadsByBoardNames;
  const recentEvents = responses[1].data.getThreadsByBoardNames;
  const hotThreads = responses[2].data.getHotThreadsByBoardNames;
  const hotEvents = responses[3].data.getHotThreadsByBoardNames;

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
              <ThreadGrid items={recentEvents} />
            </SectionBox>

            <SectionBox
              titleBar={<SectionTitleBar title="Recent Events" icon={<TrendingUpIcon />} />}
            >
              <ThreadGrid items={recentEvents} />
            </SectionBox>

          </>
        )
        : (
          <>
            <SectionBox
              titleBar={<SectionTitleBar title="Hot Threads" icon={<WhatshotIcon />} />}
            >
              <ThreadList items={recentThreads} />
            </SectionBox>
            <SectionBox
              titleBar={<SectionTitleBar title="Recent Threads" icon={<TrendingUpIcon />} />}
            >
              <ThreadList items={recentThreads} />
            </SectionBox>
          </>
        )}
    </Layout>
  );
}

export default withAuth(Boards);

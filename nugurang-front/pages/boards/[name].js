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


const GET_BOARD = gql`
  query GetBoardByName($name: String!) {
    getBoardByName(name: $name) {
      id
      name
      getThreads(page: 0, pageSize: 5) {
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
  }
`;


function Board() {
  const router = useRouter();
  const [showEvents, setShowEvents] = useState(false);
  const toggleShowEvents = () => {
    setShowEvents((prev) => !prev);
  };

  const responses = [
    useQuery(GET_BOARD, {variables: {name: router.query.name}}),
  ];

  const errorResponse = responses.find((response) => response.error)
  if (errorResponse)
    return <GraphQlError error={errorResponse.error} />

  if (responses.some((response) => response.loading))
    return <Loading />;

  const threads = responses[0].data.getBoardByName.getThreads;

  return (
    <Layout>
      <SectionTitleBar title="Boards" backButton>
        <BaseSwitch label="Show events" checked={showEvents} onChange={toggleShowEvents} />
      </SectionTitleBar>

      <SectionBox
        titleBar={<SectionTitleBar title={router.query.name} icon={<WhatshotIcon />} />}
      >
        <ThreadList items={threads} />
      </SectionBox>

    </Layout>
  );
}

export default withAuth(Board);

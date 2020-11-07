import { useRouter } from 'next/router';
import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Button from '@material-ui/core/Button';

import { COMMON_BOARDS, EVENT_BOARDS } from '../../src/config';
import withAuth from '../../components/withAuth';
import EventInfoBox from '../../components/EventInfoBox';
import GraphQlError from '../../components/GraphQlError';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import SectionTitleBar from '../../components/SectionTitleBar';
import SectionBox from '../../components/SectionBox';
import ThreadGrid from '../../components/ThreadGrid';
import ThreadList from '../../components/ThreadList';


const TEST_EVENT = {
  id: 0,
  title: "Test event 1",
  content: "Test content 1",
  images: ["/static/images/sample_1.jpg"],
  recruitingStart: "2020-01-01 01:00:00",
  recruitingEnd: "2020-01-02 01:00:00",
  eventStart: "2020-01-03 01:00:00",
  eventEnd: "2020-01-04 01:00:00",
}

const GET_BOARD = gql`
  query GetBoardByName {
    getBoardByName(name: "study") {
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
        firstArticle {
          images {
            address
          }
        }
      }
    }
  }
`;


function Event() {
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

  const threads = responses[0].data.getBoardByName ? responses[0].data.getBoardByName.getThreads : null;

  return (
    <Layout>
      <SectionTitleBar title="Event" backButton>
      </SectionTitleBar>

      <SectionBox>
        <EventInfoBox event={TEST_EVENT}/>
      </SectionBox>

      <SectionBox
        titleBar={
          <SectionTitleBar title="Related threads" icon={<AssignmentIcon />}>
            <Button onClick={() => router.push({pathname: "/threads/create", query: { board: router.query.board, event: router.query.event }})}>Create thread</Button>
          </SectionTitleBar>
        }
      >
        <ThreadList items={threads} />
      </SectionBox>

    </Layout>
  );
}

export default withAuth(Event);

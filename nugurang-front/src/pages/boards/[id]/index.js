import { useRouter } from 'next/router';
import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Button from '@material-ui/core/Button';

import { COMMON_BOARDS, EVENT_BOARDS } from '../../../config';
import withAuth from '../../../components/withAuth';
import Loading from '../../../components/Loading';
import GraphQlError from '../../../components/GraphQlError';
import BaseSwitch from '../../../components/BaseSwitch';
import Layout from '../../../components/Layout';
import SectionTitleBar from '../../../components/SectionTitleBar';
import SectionBox from '../../../components/SectionBox';
import ThreadGrid from '../../../components/ThreadGrid';
import ThreadList from '../../../components/ThreadList';


const GET_BOARD = gql`
  query GetBoard($id: ID!) {
    getBoard(id: $id) {
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


function Board() {
  const router = useRouter();
  const [showEvents, setShowEvents] = useState(false);
  const toggleShowEvents = () => {
    setShowEvents((prev) => !prev);
  };

  const responses = [
    useQuery(GET_BOARD, {variables: {id: router.query.id}}),
  ];

  const errorResponse = responses.find((response) => response.error)
  if (errorResponse)
    return <GraphQlError error={errorResponse.error} />

  if (responses.some((response) => response.loading))
    return <Loading />;

  const threads = responses[0].data.getBoard ? responses[0].data.getBoard.getThreads : null;

  return (
    <Layout>
      <SectionTitleBar title="Boards" backButton/>

      <SectionBox
        titleBar={
          <SectionTitleBar title={router.query.board} icon={<AssignmentIcon />}>
            <Button onClick={() => router.push({pathname: "/threads/create", query: { board: router.query.id }})}>Create thread</Button>
          </SectionTitleBar>
        }
      >
        <ThreadList items={threads} />
      </SectionBox>

    </Layout>
  );
}

export default withAuth(Board);

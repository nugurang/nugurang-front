import { useRouter } from 'next/router';
import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import AssignmentIcon from '@material-ui/icons/Assignment';

import withAuth from '../../../components/withAuth';
import Loading from '../../../components/Loading';
import GraphQlError from '../../../components/GraphQlError';
import Layout from '../../../components/Layout';
import PageTitleBar from '../../../components/PageTitleBar';
import SectionTitleBar from '../../../components/SectionTitleBar';
import SectionBox from '../../../components/SectionBox';
import ThreadGrid from '../../../components/ThreadGrid';


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

  const board = responses[0].data.getBoard ? responses[0].data.getBoard : null;
  const threads = responses[0].data.getBoard ? responses[0].data.getBoard.getThreads : null;

  return (
    <Layout>
      <PageTitleBar title="Boards" backButton />

      <SectionBox
        titleBar={
          (
            <SectionTitleBar title={board.name} icon={<AssignmentIcon />}>
              <Button onClick={() => router.push({pathname: "/threads/create", query: { board: router.query.id }})}>Create thread</Button>
            </SectionTitleBar>
          )
        }
      >
        <ThreadGrid items={threads} xs={12} sm={6} md={4} />
      </SectionBox>

    </Layout>
  );
}

export default withAuth(Board);

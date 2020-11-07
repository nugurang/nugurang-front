import { useRouter } from 'next/router';
import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { COMMON_BOARDS, EVENT_BOARDS } from '../../config';

import withAuth from '../../components/withAuth';
import Loading from '../../components/Loading';
import GraphQlError from '../../components/GraphQlError';
import BaseButton from '../../components/BaseButton';
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
      <SectionTitleBar title="Boards" backButton>
      </SectionTitleBar>

      <SectionBox
        titleBar={
          <SectionTitleBar title={router.query.name} icon={<AssignmentIcon />}>
            <BaseButton label="Create thread" onClick={() => router.push({pathname: "/threads/create", query: { board: router.query.name }})} />
          </SectionTitleBar>
        }
      >
        <ThreadList items={threads} />
      </SectionBox>

    </Layout>
  );
}

export default withAuth(Board);

import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';
import GraphQlError from '../components/GraphQlError';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import withAuth from '../components/withAuth';
import { useEffect, useState } from 'react';
import { COMMON_BOARDS, EVENT_BOARDS, ALL_BOARDS } from '../src/config';
import client from '../src/graphQlClient';

const GET_BOARDS = gql`
  query GetBoardsByNames($names: [String]!) {
    getBoardsByNames(names: $names) {
      id
      name
    }
  }
`;

const CREATE_BOARD = gql`
  mutation CreateBoard($name: String!) {
    createBoard(name: $name) {
      id
      name
    }
  }
`;

const CREATE_THREAD = gql`
  mutation CreateThread($board: ID!, $name: String!) {
    createThread(board: $board, name: $name) {
      id
      name
    }
  }
`;

const CREATE_ARTICLE = gql`
  mutation CreateArticle($title: String, $content: String!, $thread: ID!, $parent: ID) {
    createArticle(title: $title, content: $content, thread: $thread, parent: $parent) {
      id
    }
  }
`;

function Init() {
  const [done, setDone] = useState(false);
  const [error, setError] = useState();

  const init = async () => {
    if (error || done)
      return;
    try {
      for (const name of ALL_BOARDS) {
        const createBoard = await client.mutate({mutation: CREATE_BOARD, variables: {name}});
        console.log(createBoard)
      }
      const getBoards = await client.query({query: GET_BOARDS, variables: {names: ALL_BOARDS}})
      for (const board of getBoards.data.getBoardsByNames.map(board => board.id)) {
        for (let i = 0; i < 10; ++i) {
          const createThread = await client.mutate({mutation: CREATE_THREAD, variables: {board: board, name: String(Math.random())}});
          const createArticle = await client.mutate({
            mutation: CREATE_ARTICLE,
            variables: {
              thread: createThread.data.createThread.id,
              title: String(Math.random()),
              content: String(Math.random())
            }
          });

          for (let i = 0; i < 10; ++i) {
            const createComment = await client.mutate({
              mutation: CREATE_ARTICLE,
              variables: {
                thread: createThread.data.createThread.id,
                parent: createArticle.data.createArticle.id,
                content: String(Math.random())
              }
            });
          }
        }
      }
      setDone(true);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    init();
  });

  if (error)
    return <GraphQlError error={error} />;

  if (!done)
    return <Loading />

  return (
    <Layout>
      <h1>Initialization Done</h1>
    </Layout>
  );
}

export default withAuth(Init);

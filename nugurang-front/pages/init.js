import { gql, useQuery, useMutation } from '@apollo/client';
import GraphQlError from '../components/GraphQlError';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import withAuth from '../components/withAuth';
import { useEffect, useState } from 'react';
import { COMMON_BOARDS, EVENT_BOARDS } from '../src/config';

/*
const GET_BOARDS_BY_NAMES = gql`
  query GetBoardsByNames() {
  }
`;
*/

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

function Init() {
  const results = [useMutation(CREATE_BOARD), useMutation(CREATE_THREAD)];
  const [createBoard, createThread] = results;
  const [done, setDone] = useState(false);
  const init = async () => {
    if (done)
      return;
    try {
      /*
      for (const name of COMMON_BOARDS.concat(EVENT_BOARDS)) {
        const res = await createBoard[0]({variables: {name}});
        console.log(res)
      }*/
      for (let board = 1; board <= 12; ++board) {
        for (let i = 0; i < 10; ++i) {
          const res = await createThread[0]({variables: {board: board, name: String(Math.random())}});
          console.log(res)
        }
      }
      setDone(true);
    } catch (err) {
      console.log(err);
    }
  }

  const onClick = async (event) => {
    event.preventDefault();
  }
  useEffect(() => {
    init();
  });
  if (results.some((result) => result[1].loading))
    return <Loading />;
  const errorResult = results.find((result) => result[1].error)
  if (errorResult)
    return <GraphQlError response={errorResult} />;
  return (
    <Layout>
      {done && <h1>Initialization Done</h1>}
    </Layout>
  );
}

export default withAuth(Init);

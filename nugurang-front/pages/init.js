import { gql } from '@apollo/client';
import { withApollo } from '@apollo/react-hoc';
import { loremIpsum } from 'lorem-ipsum';
import { useEffect, useState } from 'react';
import GraphQlError from '../components/GraphQlError';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import withAuth from '../components/withAuth';
import { ALL_BOARDS } from '../src/config';

const ALL_POSITIONS = ['C++', 'Java', 'Python', 'Presentation', 'Report', 'Testing', 'Research'];

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
  mutation CreateThread($thread: ThreadInput!) {
    createThread(thread: $thread) {
      id
      name
    }
  }
`;

const CREATE_ARTICLE = gql`
  mutation CreateArticle($article: ArticleInput!, $thread: ID!, $parent: ID) {
    createArticle(article: $article, thread: $thread, parent: $parent) {
      id
      title
    }
  }
`;

const CREATE_POSITION = gql`
  mutation CreatePosition($name: String!) {
    createPosition(name: $name) {
      id
      name
    }
  }
`;

const CREATE_TEAM = gql`
  mutation CreateTeam($name: String!) {
    createTeam(name: $name) {
      id
      name
    }
  }
`

const CREATE_PROJECT = gql`
  mutation CreateProject($team: ID!, $name: String!) {
    createProject(team: $team, name: $name) {
      id
      name
    }
  }
`

const CREATE_WORK = gql`
  mutation CreateWork($project: ID!, $name: String!, $order: Int) {
    createWork(project: $project, name: $name, order: $order) {
      id
      name
    }
  }
`

function Init({client}) {
  const [done, setDone] = useState(false);
  const [error, setError] = useState();

  const init = async () => {
    if (error || done)
      return;
    try {
      const createTeam = await client.mutate({mutation: CREATE_TEAM, variables: {name: 'Capstone'}});
      console.log(createTeam);
      const createProject = await client.mutate({
        mutation: CREATE_PROJECT,
        variables: {team: createTeam.data.createTeam.id, name: 'Capstone-Project'}
      });
      console.log(createProject);
      const createWork = await client.mutate({
        mutation: CREATE_WORK,
        variables: {project: createProject.data.createProject.id, name: 'Sprint1'}
      });
      console.log(createWork);
      for (const name of ALL_POSITIONS) {
        const createPosition = await client.mutate({mutation: CREATE_POSITION, variables: {name}});
        console.log(createPosition);
      }
      for (const name of ALL_BOARDS) {
        const createBoard = await client.mutate({mutation: CREATE_BOARD, variables: {name}});
        console.log(createBoard);
      }
      const getBoards = await client.query({query: GET_BOARDS, variables: {names: ALL_BOARDS}})
      for (const board of getBoards.data.getBoardsByNames.map(board => board.id)) {
        for (let i = 0; i < 10; ++i) {
          const createThread = await client.mutate({
            mutation: CREATE_THREAD,
              variables: {
                thread: {
                  name: loremIpsum(),
                  article: {
                    title: loremIpsum(),
                    content: loremIpsum(),
                    images: []
                  },
                  board
                }
              }
          });
          const createArticle = await client.mutate({
            mutation: CREATE_ARTICLE,
            variables: {
              article: {
                title: loremIpsum(),
                content: loremIpsum(),
                images: []
              },
              thread: createThread.data.createThread.id
            }
          });

          for (let i = 0; i < 5; ++i) {
            const createComment = await client.mutate({
              mutation: CREATE_ARTICLE,
              variables: {
                thread: createThread.data.createThread.id,
                parent: createArticle.data.createArticle.id,
                article: {
                  content: loremIpsum(),
                  images: []
                }
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

export default withAuth(withApollo(Init));

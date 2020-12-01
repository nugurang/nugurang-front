import dayjs from "dayjs";
import { gql } from '@apollo/client';
import { withApollo } from '@apollo/react-hoc';
import { loremIpsum } from 'lorem-ipsum';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DayjsUtils from "@date-io/dayjs";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { ALL_BOARDS, COMMON_BOARDS, EVENT_BOARDS } from '../config';
import withAuth from '../components/withAuth';
import FullScreenDialogBox from '../components/FullScreenDialogBox';
import GraphQlError from '../components/GraphQlError';
import Loading from '../components/Loading';

const ALL_POSITIONS = ['C++', 'Java', 'Python', 'Presentation', 'Report', 'Testing', 'Research'];

export const CURRENT_USER = gql`
  query {
    currentUser {
      id
      oauth2Provider
      oauth2Id
      name
      email
      image {
        id
        address
      }
      biography
      getFollowers(page:0, pageSize:100) {
        id
      }
      getFollowings(page:0, pageSize:100) {
        id
      }
    }
  }
`;

const GET_BOARDS_BY_NAMES = gql`
  query GetBoardsByNames($names: [String]!) {
    getBoardsByNames(names: $names) {
      id
      name
    }
  }
`;

const POSITIONS = gql`
  query Positions {
    positions {
      id
      name
    }
  }
`;

const PROGRESSES = gql`
  query Progresses {
    progresses {
      id
      name
    }
  }
`;

const CREATE_BOARD = gql`
  mutation CreateBoard($board: BoardInput!) {
    createBoard(board: $board) {
      id
      name
    }
  }
`;

const CREATE_THREAD = gql`
  mutation CreateThread($board: ID!, $thread: ThreadInput!) {
    createThread(board: $board, thread: $thread) {
      id
      name
      firstArticle {
        id
      }
    }
  }
`;

const CREATE_EVENT = gql`
  mutation CreateEvent($event: EventInput!) {
    createEvent(event: $event) {
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
  mutation CreatePosition($position: PositionInput!) {
    createPosition(position: $position) {
      id
      name
    }
  }
`;

const CREATE_TEAM = gql`
  mutation CreateTeam($team: TeamInput!) {
    createTeam(team: $team) {
      id
      name
    }
  }
`;

const CREATE_PROJECT = gql`
  mutation CreateProject($team: ID!, $project: ProjectInput!) {
    createProject(team: $team, project: $project) {
      id
      name
    }
  }
`;

const CREATE_WORK = gql`
  mutation CreateWork($project: ID!, $work: WorkInput!) {
    createWork(project: $project, work: $work) {
      id
      name
    }
  }
`;

const CREATE_TASK = gql`
  mutation CreateTask($work: ID!, $task: TaskInput!) {
    createTask(work: $work, task: $task) {
      id
      name
    }
  }
`;


function Init({client}) {
  const [done, setDone] = useState(false);
  const [error, setError] = useState();
  const router = useRouter();

  const init = async () => {
    if (error || done)
      return;
    try {
      const positions = await client.mutate({
        mutation: POSITIONS,
      });
      const progresses = await client.mutate({
        mutation: PROGRESSES,
      });
      const eventList = [];
      for (let i = 0; i < 10; ++i) {
        const createEvent = await client.mutate({
          mutation: CREATE_EVENT,
          variables: {
            event: {
              name: loremIpsum({units: "word"}),
              description: loremIpsum(),
              recruitingStart: new Date(dayjs()),
              recruitingEnd: new Date(dayjs()),
              eventStart: new Date(dayjs()),
              eventEnd: new Date(dayjs()),
              images: []
            }
          }
        });
        eventList.push(createEvent.data.createEvent);
      }
      const createTeam = await client.mutate({
        mutation: CREATE_TEAM,
        variables: {team: {name: 'Capstone'}}
      });
      console.log(createTeam);
      const createProject = await client.mutate({
        mutation: CREATE_PROJECT,
        variables: {team: createTeam.data.createTeam.id, project: {name: 'Capstone-Project'}}
      });
      console.log(createProject);
      const createWork = await client.mutate({
        mutation: CREATE_WORK,
        variables: {project: createProject.data.createProject.id, work: {name: 'Sprint1'}}
      });
      console.log(createWork);
      const createTask = await client.mutate({
        mutation: CREATE_TASK,
        variables: {work: createWork.data.createWork.id, task: {name: 'Sprint1', users: [], positions: []}}
      });
      console.log(createTask);
      for (const name of ALL_POSITIONS) {
        const createPosition = await client.mutate({mutation: CREATE_POSITION, variables: { position: {name}}});
        console.log(createPosition);
      }
      for (const name of ALL_BOARDS) {
        const createBoard = await client.mutate({mutation: CREATE_BOARD, variables: {board: {name}}});
        console.log(createBoard);
      }
      const getCommonBoards = await client.query({query: GET_BOARDS_BY_NAMES, variables: {names: COMMON_BOARDS}})
      for (const board of getCommonBoards.data.getBoardsByNames.map(board => board.id)) {
        for (let i = 0; i < 10; ++i) {
          const threadName = loremIpsum();
          const createThread = await client.mutate({
            mutation: CREATE_THREAD,
            variables: {
              board,
              thread: {
                name: threadName,
                firstArticle: {
                  title: threadName,
                  content: loremIpsum(),
                  images: []
                }
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
      const getEventBoards = await client.query({query: GET_BOARDS_BY_NAMES, variables: {names: EVENT_BOARDS}})
      for (const board of getEventBoards.data.getBoardsByNames.map(board => board.id)) {
        for (let i = 0; i < 10; ++i) {
          const createThread = await client.mutate({
            mutation: CREATE_THREAD,
            variables: {
              board,
              thread: {
                name: loremIpsum(),
                firstArticle: {
                  title: loremIpsum(),
                  content: loremIpsum(),
                  images: []
                },
                event: eventList[i].id
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
    if(done){
      console.log("before");
      router.push(`/home`);
    }
  });

  if (error)
    return <GraphQlError error={error} />;

  if (!done)
    return <Loading circular="true" />

  return (
    <FullScreenDialogBox>
      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item xs={12} align="center">
          <Typography variant="h4">Initialization done.</Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Box align="center">
            <Button variant="outlined" onClick={() => router.push(`/home`)}>Go Home</Button>
          </Box>
        </Grid>
      </Grid>
    </FullScreenDialogBox>
  );
}

export default withAuth(withApollo(Init));
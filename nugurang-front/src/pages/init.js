import dayjs from "dayjs";
import { loremIpsum } from 'lorem-ipsum';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { ALL_BOARDS, COMMON_BOARDS, EVENT_BOARDS } from '../config';
import withAuthServerSide from "../utils/withAuthServerSide";
import { queryToBackend, mutateToBackend } from "../utils/requestToBackend";
import {
  GetBoardsByNamesQueryBuilder,
  CreateBoardMutationBuilder,
} from '../queries/board';
import { CreateThreadMutationBuilder } from '../queries/thread';
import { CreateEventMutationBuilder } from '../queries/event';
import { CreateArticleMutationBuilder } from '../queries/article';
import {
  GetAllTaskPositionsQueryBuilder,
  GetAllTaskProgressesQueryBuilder,
  CreateTaskMutationBuilder,
  CreateTaskPositionMutationBuilder,
} from '../queries/task';
import { CreateTeamMutationBuilder } from '../queries/team';
import { CreateProjectMutationBuilder } from '../queries/project';
import { CreateWorkMutationBuilder } from '../queries/work';

import FullScreenDialogBox from '../components/FullScreenDialogBox';
import GraphQlError from '../components/GraphQlError';
import Loading from '../components/Loading';

const ALL_POSITIONS = ['C++', 'Java', 'Python', 'Presentation', 'Report', 'Testing', 'Research'];

export const getServerSideProps = withAuthServerSide();

function Init() {
  const [done, setDone] = useState(false);
  const [error, setError] = useState();
  const router = useRouter();

  const init = async () => {
    if (error || done)
      return;
    try {
      await mutateToBackend({
        mutation: new GetAllTaskPositionsQueryBuilder().build(),
      });
      await mutateToBackend({
        mutation: new GetAllTaskProgressesQueryBuilder().build(),
      });
      const eventList = [];
      for (let i = 0; i < 10; ++i) {
        const createEvent = await mutateToBackend({
          mutation: new CreateEventMutationBuilder().build(),
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
      const createTeam = await mutateToBackend({
        mutation: new CreateTeamMutationBuilder().build(),
        variables: {team: {name: 'Capstone'}}
      });
      const createProject = await mutateToBackend({
        mutation: new CreateProjectMutationBuilder().build(),
        variables: {team: createTeam.data.createTeam.id, project: {name: 'Capstone-Project'}}
      });
      const createWork = await mutateToBackend({
        mutation: new CreateWorkMutationBuilder().build(),
        variables: {project: createProject.data.createProject.id, work: {name: 'Sprint1'}}
      });
      const createTask = await mutateToBackend({
        mutation: new CreateTaskMutationBuilder().build(),
        variables: {work: createWork.data.createWork.id, task: {name: 'Sprint1', users: [], positions: []}}
      });
      for (const name of ALL_POSITIONS) {
        const createPosition = await mutateToBackend({
          mutation: new CreateTaskPositionMutationBuilder().build(),
          variables: { position: {name}},
        });
      }
      for (const name of ALL_BOARDS) {
        const createBoard = await mutateToBackend({
          mutation: new CreateBoardMutationBuilder().build(),
          variables: {board: {name}},
        });
      }
      const getCommonBoards = await queryToBackend({
        query: new GetBoardsByNamesQueryBuilder().build(),
        variables: {names: COMMON_BOARDS}
      });
      for (const board of getCommonBoards.data.getBoardsByNames.map(board => board.id)) {
        for (let i = 0; i < 10; ++i) {
          const threadName = loremIpsum();
          const createThread = await mutateToBackend({
            mutation: new CreateThreadMutationBuilder().build(),
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
          const createArticle = await mutateToBackend({
            mutation: new CreateArticleMutationBuilder().build(),
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
            await mutateToBackend({
              mutation: new CreateArticleMutationBuilder().build(),
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
      const getEventBoards = await queryToBackend({
        query: new GetBoardsByNamesQueryBuilder().build(),
        variables: {names: EVENT_BOARDS}
      });
      for (const board of getEventBoards.data.getBoardsByNames.map(board => board.id)) {
        for (let i = 0; i < 10; ++i) {
          const createThread = await mutateToBackend({
            mutation: new CreateThreadMutationBuilder().build(),
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
          const createArticle = await mutateToBackend({
            mutation: new CreateArticleMutationBuilder().build(),
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
            await mutateToBackend({
              mutation: new CreateArticleMutationBuilder().build(),
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
            <Button variant="contained" onClick={() => router.push(`/home`)}>Go Home</Button>
          </Box>
        </Grid>
      </Grid>
    </FullScreenDialogBox>
  );
}

export default Init;

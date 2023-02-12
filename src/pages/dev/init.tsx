import { gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { faker } from '@faker-js/faker';
import Box from '@/components/layout/Box';
import Button from '@/components/button/Button';
import ButtonGroup from '@/components/button/ButtonGroup';
import CenterizedContainer from '@/compositions/container/CenterizedContainer';
import { WithCheckUserServerSideProps } from '@/hocs/WithServerSideProps';
import { queryToBackend, mutateToBackend } from '@/utilities/network/graphQl';
import CircularLoader from '@/components/progress/CircularLoader';
import Header2 from '@/components/text/Header2';
import Paragraph from '@/components/text/Paragraph';

export const getServerSideProps = WithCheckUserServerSideProps();

const COMMON_BOARDS = ['study_group', 'learned_society', 'club', 'indie_band', 'startup'];
const EVENT_BOARDS = COMMON_BOARDS.map(name => `${name}_event`);
const ALL_BOARDS = [...COMMON_BOARDS, ...EVENT_BOARDS];
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
  mutation CreateThread($thread: ThreadInput!, $board: ID!) {
    createThread(thread: $thread, board: $board) {
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
  mutation CreateProject($project: ProjectInput!, $team: ID!) {
    createProject(project: $project, team: $team) {
      id
      name
    }
  }
`;

const CREATE_WORK = gql`
  mutation CreateWork($work: WorkInput!, $project: ID!) {
    createWork(work: $work, project: $project) {
      id
      name
    }
  }
`;

const CREATE_TASK = gql`
  mutation CreateTask($task: TaskInput!, $work: ID!) {
    createTask(task: $task, work: $work) {
      id
      name
    }
  }
`;

export default () => {
  const { t: commonTranslation } = useTranslation('common');
  const router = useRouter();

  const [isDone, setDone] = useState(false);
  const [isErrorOccurred, setError] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const initializeDatabase = async () => {
    setTitle('초기화 진행중...');
    setContent('초기화 진행중...');
    if (isErrorOccurred || isDone)
      return;
    try {
      const positions = await mutateToBackend({
        mutation: POSITIONS,
      });
      const progresses = await mutateToBackend({
        mutation: PROGRESSES,
      });
      const eventList = [];
      for (let i = 0; i < 10; ++i) {
        const createEvent = await mutateToBackend({
          mutation: CREATE_EVENT,
          variables: {
            event: {
              name: faker.commerce.productName(),
              description: faker.commerce.productDescription(),
              recruitingStart: new Date(),
              recruitingEnd: new Date(),
              eventStart: new Date(),
              eventEnd: new Date(),
              images: []
            }
          }
        });
        eventList.push(createEvent.data.createEvent);
      }
      const createTeam = await mutateToBackend({
        mutation: CREATE_TEAM,
        variables: {team: {name: 'Test-Team'}}
      });
      console.log(createTeam);
      const createProject = await mutateToBackend({
        mutation: CREATE_PROJECT,
        variables: {team: createTeam.data.createTeam.id, project: {name: 'Test-Project'}}
      });
      console.log(createProject);
      const createWork = await mutateToBackend({
        mutation: CREATE_WORK,
        variables: {project: createProject.data.createProject.id, work: {name: 'Sprint1'}}
      });
      console.log(createWork);
      const createTask = await mutateToBackend({
        mutation: CREATE_TASK,
        variables: {work: createWork.data.createWork.id, task: {name: 'Sprint1', users: [], positions: []}}
      });
      console.log(createTask);
      for (const name of ALL_POSITIONS) {
        const createPosition = await mutateToBackend({mutation: CREATE_POSITION, variables: { position: {name}}});
        console.log(createPosition);
      }
      for (const name of ALL_BOARDS) {
        const createBoard = await mutateToBackend({mutation: CREATE_BOARD, variables: {board: {name}}});
        console.log(createBoard);
      }
      const getCommonBoards = await queryToBackend({query: GET_BOARDS_BY_NAMES, variables: {names: COMMON_BOARDS}})
      for (const board of getCommonBoards.data.getBoardsByNames.map(board => board.id)) {
        for (let i = 0; i < 10; ++i) {
          const threadName = faker.commerce.productName();
          const createThread = await mutateToBackend({
            mutation: CREATE_THREAD,
            variables: {
              board,
              thread: {
                name: threadName,
                firstArticle: {
                  title: threadName,
                  content: faker.commerce.productDescription(),
                  images: []
                }
              }
            }
          });
          const createArticle = await mutateToBackend({
            mutation: CREATE_ARTICLE,
            variables: {
              article: {
                title: faker.commerce.productName(),
                content: faker.commerce.productDescription(),
                images: []
              },
              thread: createThread.data.createThread.id
            }
          });

          for (let i = 0; i < 5; ++i) {
            const createComment = await mutateToBackend({
              mutation: CREATE_ARTICLE,
              variables: {
                thread: createThread.data.createThread.id,
                parent: createArticle.data.createArticle.id,
                article: {
                  content: faker.commerce.productDescription(),
                  images: []
                }
              }
            });
          }
        }
      }
      const getEventBoards = await queryToBackend({query: GET_BOARDS_BY_NAMES, variables: {names: EVENT_BOARDS}})
      for (const board of getEventBoards.data.getBoardsByNames.map(board => board.id)) {
        for (let i = 0; i < 10; ++i) {
          const createThread = await mutateToBackend({
            mutation: CREATE_THREAD,
            variables: {
              board,
              thread: {
                name: faker.commerce.productName(),
                firstArticle: {
                  title: faker.commerce.productName(),
                  content: faker.commerce.productDescription(),
                  images: []
                },
                event: eventList[i].id
              }
            }
          });
          const createArticle = await mutateToBackend({
            mutation: CREATE_ARTICLE,
            variables: {
              article: {
                title: faker.commerce.productName(),
                content: faker.commerce.productDescription(),
                images: []
              },
              thread: createThread.data.createThread.id
            }
          });

          for (let i = 0; i < 5; ++i) {
            const createComment = await mutateToBackend({
              mutation: CREATE_ARTICLE,
              variables: {
                thread: createThread.data.createThread.id,
                parent: createArticle.data.createArticle.id,
                article: {
                  content: faker.commerce.productDescription(),
                  images: []
                }
              }
            });
          }
        }
      }
      setDone(true);
      setTitle('초기화 완료!');
      setContent('초기화를 완료했습니다.');
    } catch (error) {
      console.error(error)
      setError(true);
      setTitle('오류 발생');
      setContent('초기화를 진행하는 중 오류가 발생하였습니다');
    }
  }

  useEffect(() => {
    initializeDatabase();
  }, []);

  const onClickGoHomeButton = () => router.push('/');

  return (
    <CenterizedContainer>
      <Box
        width='400px'
        maxWidth='100vw'
        horizontalPaddingLevel={2}
        verticalPaddingLevel={2}
        flex
        centerizeHorizontally
      >
        {(!isDone && !isErrorOccurred) && (<>
          <CircularLoader size='48px'/>
        </>)}
        <Header2>
          {title}
        </Header2>
        <Paragraph>
          {content}
        </Paragraph>
        <ButtonGroup direction='vertical'>
          {(isDone || isErrorOccurred) && (<>
            <Button fullWidth onClick={onClickGoHomeButton}>
              홈으로 가기
            </Button>
          </>)}
        </ButtonGroup>
      </Box>
    </CenterizedContainer>
  );
}

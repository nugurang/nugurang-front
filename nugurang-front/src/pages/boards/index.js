import { useRouter } from 'next/router';
import { useState } from 'react';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

import withAuthServerSide from '../../utils/withAuthServerSide';
import { queryToBackend } from "../../utils/requestToBackend";
import { GetBoardByNameQueryBuilder } from '../../queries/board';
import {
  GetThreadsByBoardNamesQueryBuilder,
  GetHotThreadsByBoardNamesQueryBuilder,
} from '../../queries/thread';

import CategoryIcon from '@material-ui/icons/Category';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import WhatshotIcon from '@material-ui/icons/Whatshot';

import 'array-flat-polyfill';
import { COMMON_BOARDS, EVENT_BOARDS } from '../../config';
import BaseSwitch from '../../components/BaseSwitch';
import CallingCard from '../../components/CallingCard';
import Layout from '../../components/Layout';
import NoContentsBox from '../../components/NoContentsBox';
import PageTitleBar from '../../components/PageTitleBar';
import SectionTitleBar from '../../components/SectionTitleBar';
import SectionBox from '../../components/SectionBox';
import ThreadListItem from '../../components/ThreadListItem';

export const getServerSideProps = withAuthServerSide( async ({ context }) => {
  const commomBoardThreadsResult = await queryToBackend({
    context,
    query: new GetThreadsByBoardNamesQueryBuilder().withUser().withFirstArticle().build(),
    variables: {
      boardNames: COMMON_BOARDS,
    },
  });
  const eventBoardThreadsResult = await queryToBackend({
    context,
    query: new GetThreadsByBoardNamesQueryBuilder().withUser().withFirstArticle().build(),
    variables: {
      boardNames: EVENT_BOARDS,
    },
  });
  const hotCommomBoardThreadsResult = await queryToBackend({
    context,
    query: new GetHotThreadsByBoardNamesQueryBuilder().withUser().withFirstArticle().build(),
    variables: {
      boardNames: COMMON_BOARDS,
    },
  });
  const hotEventBoardThreadsResult = await queryToBackend({
    context,
    query: new GetHotThreadsByBoardNamesQueryBuilder().withUser().withFirstArticle().build(),
    variables: {
      boardNames: EVENT_BOARDS,
    },
  });

  console.log(commomBoardThreadsResult);

  return {
    props: {
      commomBoardThreads: commomBoardThreadsResult.data.getThreadsByBoardNames,
      eventBoardThreads: eventBoardThreadsResult.data.getThreadsByBoardNames,
      hotCommomBoardThreads: hotCommomBoardThreadsResult.data.getHotThreadsByBoardNames,
      hotEventBoardThreads: hotEventBoardThreadsResult.data.getHotThreadsByBoardNames,
    },
  };
});

function Boards({
  commomBoardThreads,
  eventBoardThreads,
  hotCommomBoardThreads,
  hotEventBoardThreads,
}) {
  const router = useRouter();
  const [showEvents, setShowEvents] = useState(false);
  const toggleShowEvents = () => {
    setShowEvents((prev) => !prev);
  };

  commomBoardThreads = commomBoardThreads.map(thread => {
    return {
      ...thread,
      onClick: () => router.push(`/threads/${thread.id}`),
    };
  });
  eventBoardThreads = eventBoardThreads.map(thread => {
    return {
      ...thread,
      onClick: () => router.push(`/threads/${thread.id}`),
    };
  });
  hotCommomBoardThreads = hotCommomBoardThreads.map(thread => {
    return {
      ...thread,
      onClick: () => router.push(`/threads/${thread.id}`),
    };
  });
  hotEventBoardThreads = hotEventBoardThreads.map(thread => {
    return {
      ...thread,
      onClick: () => router.push(`/threads/${thread.id}`),
    };
  });

  let key = 0;
  const currentBoard = showEvents ? EVENT_BOARDS : COMMON_BOARDS;
  return (
    <Layout>
      <PageTitleBar title="Boards" backButton>
        <BaseSwitch label="Show events" checked={showEvents} onChange={toggleShowEvents} />
      </PageTitleBar>
      <Grid container>
        <Grid item xs={12}>
          <SectionBox titleBar={<SectionTitleBar title="Categories" icon={<CategoryIcon />} />}>
            <Grid container>
              {[currentBoard].flat().map((boardName) =>
                (
                  <Grid item key={++key} xs={6} sm={4} md={3} align="center">
                    <CallingCard
                      label={boardName}
                      image="/static/images/sample_1.jpg"
                      onClick={async (e) => {
                        e.preventDefault();
                        const boardResponse = await queryToBackend({
                          query: new GetBoardByNameQueryBuilder().build(),
                          variables: { name: boardName },
                        });
                        const boardId = boardResponse.data.getBoardByName ? boardResponse.data.getBoardByName.id : ``;
                        router.push(`/boards/${boardId}`);
                      }}
                    />
                  </Grid>
                )
              )}
            </Grid>
          </SectionBox>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box display={showEvents ? "none" : "block"}>
            <SectionBox
              titleBar={<SectionTitleBar title="Hot Threads" icon={<WhatshotIcon />} />}
            >
              {
                hotCommomBoardThreads && hotCommomBoardThreads.length
                ? <List>{[hotCommomBoardThreads].flat().map((thread) => <ThreadListItem thread={thread} />)}</List>
                : <NoContentsBox />
              }
            </SectionBox>
          </Box>
          <Box display={showEvents ? "block" : "none"}>
            <SectionBox
              titleBar={<SectionTitleBar title="Hot Events" icon={<WhatshotIcon />} />}
            >
              {
                hotEventBoardThreads && hotEventBoardThreads.length
                ? <List>{[hotEventBoardThreads].flat().map((thread) => <ThreadListItem thread={thread} />)}</List>
                : <NoContentsBox />
              }
            </SectionBox>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box display={showEvents ? "none" : "block"}>
            <SectionBox
              titleBar={<SectionTitleBar title="Recent Threads" icon={<TrendingUpIcon />} />}
            >
              {
                commomBoardThreads && commomBoardThreads.length
                ? <List>{[commomBoardThreads].flat().map((thread) => <ThreadListItem thread={thread} />)}</List>
                : <NoContentsBox />
              }
            </SectionBox>
          </Box>
          <Box display={showEvents ? "block" : "none"}>
            <SectionBox
              titleBar={<SectionTitleBar title="Recent Events" icon={<TrendingUpIcon />} />}
            >
              {
                eventBoardThreads && eventBoardThreads.length
                ? <List>{[eventBoardThreads].flat().map((thread) => <ThreadListItem thread={thread} />)}</List>
                : <NoContentsBox />
              }
            </SectionBox>
          </Box>
        </Grid>

      </Grid>
    </Layout>
  );
}

export default Boards;

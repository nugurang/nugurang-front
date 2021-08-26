import { useRouter } from 'next/router';
import { useState } from 'react';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

import withAuthServerSide from '../../utils/withAuthServerSide';
import { queryToBackend } from "../../utils/requestToBackend";
import { GetBoardsByNamesQueryBuilder } from '../../queries/board';
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

  const commonBoardsResponse = await queryToBackend({
    context,
    query: new GetBoardsByNamesQueryBuilder().build(),
    variables: { names: COMMON_BOARDS },
  });
  const eventBoardsResponse = await queryToBackend({
    context,
    query: new GetBoardsByNamesQueryBuilder().build(),
    variables: { names: EVENT_BOARDS },
  });
  const commomBoardThreadsResponse  = await queryToBackend({
    context,
    query: new GetThreadsByBoardNamesQueryBuilder().withUser().withFirstArticle().build(),
    variables: { boardNames: COMMON_BOARDS },
  });
  const eventBoardThreadsResponse  = await queryToBackend({
    context,
    query: new GetThreadsByBoardNamesQueryBuilder().withUser().withFirstArticle().build(),
    variables: { boardNames: EVENT_BOARDS },
  });
  const hotCommomBoardThreadsResponse  = await queryToBackend({
    context,
    query: new GetHotThreadsByBoardNamesQueryBuilder().withUser().withFirstArticle().build(),
    variables: { boardNames: COMMON_BOARDS },
  });
  const hotEventBoardThreadsResponse  = await queryToBackend({
    context,
    query: new GetHotThreadsByBoardNamesQueryBuilder().withUser().withFirstArticle().build(),
    variables: { boardNames: EVENT_BOARDS },
  });

  return {
    props: {
      commonBoards: commonBoardsResponse.data.getBoardsByNames,
      eventBoards: eventBoardsResponse.data.getBoardsByNames,
      commomBoardThreads: commomBoardThreadsResponse.data.getThreadsByBoardNames,
      eventBoardThreads: eventBoardThreadsResponse.data.getThreadsByBoardNames,
      hotCommomBoardThreads: hotCommomBoardThreadsResponse.data.getHotThreadsByBoardNames,
      hotEventBoardThreads: hotEventBoardThreadsResponse.data.getHotThreadsByBoardNames,
    },
  };
});

function Boards({
  commonBoards,
  eventBoards,
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
    return { ...thread, onClick: () => router.push(`/threads/${thread.id}`) };
  });
  eventBoardThreads = eventBoardThreads.map(thread => {
    return { ...thread, onClick: () => router.push(`/threads/${thread.id}`), };
  });
  hotCommomBoardThreads = hotCommomBoardThreads.map(thread => {
    return { ...thread, onClick: () => router.push(`/threads/${thread.id}`), };
  });
  hotEventBoardThreads = hotEventBoardThreads.map(thread => {
    return { ...thread, onClick: () => router.push(`/threads/${thread.id}`), };
  });

  let key = 0;
  const currentBoards = showEvents ? eventBoards : commonBoards;
  return (
    <Layout>
      <PageTitleBar title="Boards" backButton>
        <BaseSwitch label="Show events" checked={showEvents} onChange={toggleShowEvents} />
      </PageTitleBar>
      <Grid container>
        <Grid item xs={12}>
          <SectionBox titleBar={<SectionTitleBar title="Categories" icon={<CategoryIcon />} />}>
            {
              currentBoards.length > 0
              ? <Grid container>
                {currentBoards.map(board =>
                  <Grid item key={++key} xs={6} sm={4} md={3} align="center">
                    <CallingCard
                      label={board.name}
                      image="/images/sample_1.jpg"
                      onClick={e => {
                        e.preventDefault();
                        router.push(`/boards/${board.id}`);
                      }}
                    />
                  </Grid>
                )}
              </Grid>
              : <NoContentsBox />
            }
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

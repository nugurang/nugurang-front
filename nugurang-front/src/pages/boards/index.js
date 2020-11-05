import { makeStyles } from '@material-ui/styles';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ListIcon from '@material-ui/icons/List';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import 'array-flat-polyfill';

import { COMMON_BOARDS, EVENT_BOARDS } from '../../config';
import withAuth from '../../components/withAuth';
import CallingCard from '../../components/CallingCard';
import Loading from '../../components/Loading';
import GraphQlError from '../../components/GraphQlError';
import BaseCard from '../../components/BaseCard';
import BaseSwitch from '../../components/BaseSwitch';
import Layout from '../../components/Layout';
import SectionTitleBar from '../../components/SectionTitleBar';
import SectionBox from '../../components/SectionBox';
import ThreadGrid from '../../components/ThreadGrid';
import ThreadList from '../../components/ThreadList';



const useStyles = makeStyles(() => ({
  typography: {
    fontFamily: "Ubuntu",
    fontSize: 20,
    fontWeight: 400,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
}));

const GET_THREADS = gql`
  query GetThreads($boardNames: [String]!) {
    getThreadsByBoardNames(boards: $boardNames, page: 0, pageSize: 5) {
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
`;

const GET_HOT_THREADS = gql`
  query GetHotThreads($boardNames: [String]!) {
    getHotThreadsByBoardNames(boards: $boardNames, page: 0, pageSize: 5) {
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
`;

function Boards() {
  const router = useRouter();
  const classes = useStyles();
  const [showEvents, setShowEvents] = useState(false);
  const toggleShowEvents = () => {
    setShowEvents((prev) => !prev);
  };

  const responses = [
    useQuery(GET_THREADS, {variables: {boardNames: COMMON_BOARDS}}),
    useQuery(GET_THREADS, {variables: {boardNames: EVENT_BOARDS}}),
    useQuery(GET_HOT_THREADS, {variables: {boardNames: COMMON_BOARDS}}),
    useQuery(GET_HOT_THREADS, {variables: {boardNames: EVENT_BOARDS}})
  ];

  const errorResponse = responses.find((response) => response.error)
  if (errorResponse)
    return <GraphQlError error={errorResponse.error} />

  if (responses.some((response) => response.loading))
    return <Loading />;

  const recentThreads = responses[0].data.getThreadsByBoardNames;
  const recentEvents = responses[1].data.getThreadsByBoardNames;
  const hotThreads = responses[2].data.getHotThreadsByBoardNames;
  const hotEvents = responses[3].data.getHotThreadsByBoardNames;

  let key = 0;
  let currentBoards = showEvents ? EVENT_BOARDS : COMMON_BOARDS;
  return (
    <Layout>
      <SectionTitleBar title="Boards" backButton />

            <SectionBox
              titleBar={
                <SectionTitleBar title="Categories" icon={<ListIcon />}>
                  <BaseSwitch label="Show events" checked={showEvents} onChange={toggleShowEvents} />
                </SectionTitleBar>
              }
            >
              <Grid container>
                {[currentBoards].flat().map((board) =>
                  (
                    <Grid item key={++key} xs={6} align="center">
                      <CallingCard image="/static/images/sample_1.jpg" onClick={() => router.push(`/boards/${board}`)}>
                        <Typography className={classes.typography}>{board}</Typography>
                      </CallingCard>
                    </Grid>
                  )
                )}
              </Grid>
            </SectionBox>

            <SectionBox
              titleBar={<SectionTitleBar title="Hot Threads" icon={<WhatshotIcon />} />}
            >
              <ThreadList items={hotThreads} />
            </SectionBox>

            <SectionBox
              titleBar={<SectionTitleBar title="Recent Threads" icon={<TrendingUpIcon />} />}
            >
              <ThreadList items={recentThreads} />
            </SectionBox>

    </Layout>
  );
}

export default withAuth(Boards);

import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import WhatshotIcon from '@material-ui/icons/Whatshot';

import { COMMON_BOARDS, EVENT_BOARDS } from '../config';
import withAuthServerSide from '../utils/withAuthServerSide';
import graphQlClient from "../graphQlClient";
import GraphQlError from '../components/GraphQlError';
import {
  GetCurrentUserQueryBuilder,
} from '../queries/user';
import {
  GetThreadsByBoardNamesQueryBuilder,
  GetHotThreadsByBoardNamesQueryBuilder,
} from '../queries/thread';

import Layout from '../components/Layout';
import Loading from '../components/Loading';
import NoContentsBox from '../components/NoContentsBox';
import PageTitleBar from '../components/PageTitleBar';
import SectionBox from '../components/SectionBox';
import SectionTitleBar from '../components/SectionTitleBar';
import ThreadCard from '../components/ThreadCard';
import ThreadListItem from '../components/ThreadListItem';

export const getServerSideProps = withAuthServerSide(async () => {
  const currentUserResult = await graphQlClient.query({
    query: new GetCurrentUserQueryBuilder().withNotifications().build(),
  });
  const hotThreadsResult = await graphQlClient.query({
    query: new GetHotThreadsByBoardNamesQueryBuilder().withUser().withEvent().withFirstArticle().withArticles().build(),
    variables: {
      boardNames: COMMON_BOARDS,
    },
  });
  const eventsResult = await graphQlClient.query({
    query: new GetThreadsByBoardNamesQueryBuilder().withUser().withEvent().withFirstArticle().withArticles().build(),
    variables: {
      boardNames: EVENT_BOARDS,
    },
  });

  return {
    props: {
      currentUser: currentUserResult.data.currentUser,
      hotThreads: hotThreadsResult.data.getHotThreadsByBoardNames,
      events: eventsResult.data.getThreadsByBoardNames,
    },
  };
})

function Home({ currentUser, hotThreads, events }) {
  const router = useRouter();

  hotThreads.forEach(function(thread){
    thread.onClick = () => router.push(`/threads/${thread.id}`);
  });
  events.forEach(function(thread){
    thread.onClick = () => router.push(`/threads/${thread.id}`);
  });

  return (
    <Layout>
      <PageTitleBar title="Home" icon=<HomeIcon />>
        <IconButton onClick={() => router.push(`/notifications/${currentUser.id}`)}>
          <Badge badgeContent={currentUser.getNotifications.length} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Avatar
          alt={currentUser.name}
          src={currentUser.image ? currentUser.image.address : null}
          onClick={() => router.push(`/user/${currentUser.id}`)}
          variant="circle"
        >
          {currentUser.name.charAt(0).toUpperCase()}
        </Avatar>
      </PageTitleBar>

      <Grid container>
        <Grid item xs={12} md={6}>
          <SectionBox
            titleBar={(
              <SectionTitleBar title="Starred threads" icon=<FavoriteIcon />>
                <IconButton disabled onClick={() => router.push(`/user/${currentUser.id}/star`)}>
                  <ArrowForwardIcon />
                </IconButton>
              </SectionTitleBar>
            )}
          >
            {
              hotThreads && (hotThreads.length)
              ? <List>{[hotThreads].flat().map((thread) => <ThreadListItem thread={thread} />)}</List>
              : <NoContentsBox />
            }
          </SectionBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <SectionBox
            titleBar={(
              <SectionTitleBar title="Hot threads" icon=<WhatshotIcon /> />
            )}
          >
            {
              hotThreads && (hotThreads.length)
              ? <List>{[hotThreads].flat().map((thread) => <ThreadListItem thread={thread} />)}</List>
              : <NoContentsBox />
            }
          </SectionBox>
        </Grid>
        <Grid item xs={12}>
          <SectionBox
            titleBar={(
              <SectionTitleBar title="Recent events" icon=<TrendingUpIcon /> />
            )}
          >
            {
              events && (events.length)
              ? <Grid container>{[events].flat().map((thread) => <Grid item xs={12} sm={6} md={4}><ThreadCard thread={thread} /></Grid>)}</Grid>
              : <NoContentsBox />
            }
          </SectionBox>
        </Grid>
      </Grid>

    </Layout>
  );
}

export default Home;
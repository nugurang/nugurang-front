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
import withAuth from '../components/withAuth';
import GraphQlError from '../components/GraphQlError';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import NoContentsBox from '../components/NoContentsBox';
import PageTitleBar from '../components/PageTitleBar';
import SectionBox from '../components/SectionBox';
import SectionTitleBar from '../components/SectionTitleBar';
import ThreadCard from '../components/ThreadCard';
import ThreadListItem from '../components/ThreadListItem';

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      name
      image {
        id
        address
      }
      getNotifications(page: 0, pageSize: 100) {
        id
        isRead
        createdAt
        data
        type {
          id
          name
        }
      }
    }
  }
`;


const GET_THREADS_BY_BOARD_NAMES = gql`
  query GetThreadsByBoardNames($boardNames: [String]!) {
    getThreadsByBoardNames(boards: $boardNames, page: 0, pageSize: 5) {
      id
      name
      user {
        id
        name
        image {
          address
        }
      }
      firstArticle {
        id
        title
        content
        createdAt
        modifiedAt
        images {
          address
        }
        viewCount
        upCount
        downCount
        starCount
      }
    }
  }
`;

const GET_HOT_THREADS_BY_BOARD_NAMES = gql`
  query GetHotThreadsByBoardNames($boardNames: [String]!) {
    getHotThreadsByBoardNames(boards: $boardNames, page: 0, pageSize: 5) {
      id
      name
      user {
        id
        name
        image {
          address
        }
      }
      firstArticle {
        id
        title
        content
        createdAt
        modifiedAt
        images {
          address
        }
        viewCount
        upCount
        downCount
        starCount
      }
    }
  }
`;



function Home() {
  const router = useRouter();
  const results = [
    [null, useQuery(CURRENT_USER)],
    [null, useQuery(GET_HOT_THREADS_BY_BOARD_NAMES, {variables: {boardNames: COMMON_BOARDS}})],
    [null, useQuery(GET_THREADS_BY_BOARD_NAMES, {variables: {boardNames: EVENT_BOARDS}})],
  ];
  const user = results[0][1].data ? results[0][1].data.currentUser : null;
  const hotThreads = results[1][1].data ? results[1][1].data.getHotThreadsByBoardNames : [];
  const recentEvents = results[2][1].data ? results[2][1].data.getThreadsByBoardNames : [];

  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />;

  hotThreads.forEach(function(thread){
    thread.onClick = () => router.push(`/threads/${thread.id}`);
  });
  recentEvents.forEach(function(thread){
    thread.onClick = () => router.push(`/threads/${thread.id}`);
  });

  return (
    <Layout>
      <PageTitleBar title="Home" icon=<HomeIcon />>
        <IconButton onClick={() => router.push(`/notifications/${user.id}`)}>
          <Badge badgeContent={user.getNotifications.length} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Avatar
          alt={user.name}
          src={user.image ? user.image.address : null}
          onClick={() => router.push(`/user/${user.id}`)}
          variant="circle"
        >
          {user.name.charAt(0).toUpperCase()}
        </Avatar>
      </PageTitleBar>

      <Grid container>
        <Grid item xs={12} md={6}>
          <SectionBox
            titleBar={(
              <SectionTitleBar title="Starred threads" icon=<FavoriteIcon />>
                <IconButton disabled onClick={() => router.push(`/user/${user.id}/star`)}>
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
              recentEvents && (recentEvents.length)
              ? <Grid container>{[recentEvents].flat().map((thread) => <Grid item xs={12} sm={6} md={4}><ThreadCard thread={thread} /></Grid>)}</Grid>
              : <NoContentsBox />
            }
          </SectionBox>
        </Grid>
      </Grid>

    </Layout>
  );
}

export default withAuth(Home);
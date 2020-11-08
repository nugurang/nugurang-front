import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import FavoriteIcon from '@material-ui/icons/Favorite';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import WhatshotIcon from '@material-ui/icons/Whatshot';

import { COMMON_BOARDS, EVENT_BOARDS } from '../config';
import withAuth from '../components/withAuth';
import GraphQlError from '../components/GraphQlError';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import SectionBox from '../components/SectionBox';
import SectionTitleBar from '../components/SectionTitleBar';
import ThreadGrid from '../components/ThreadGrid';
import ThreadList from '../components/ThreadList';

export const GET_CURRENT_USER = gql`
  query {
    currentUser {
      id
      name
      image {
        id
        address
      }
    }
  }
`;


const GET_THREADS_BY_BOARD_NAMES = gql`
  query GetThreadsByBoardNames($boardNames: [String]!) {
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

const GET_HOT_THREADS_BY_BOARD_NAMES = gql`
  query GetHotThreadsByBoardNames($boardNames: [String]!) {
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



function Home() {
  const router = useRouter();
  const responses = [
    useQuery(GET_CURRENT_USER),
    useQuery(GET_HOT_THREADS_BY_BOARD_NAMES, {variables: {boardNames: COMMON_BOARDS}}),
    useQuery(GET_THREADS_BY_BOARD_NAMES, {variables: {boardNames: EVENT_BOARDS}}),
  ];

  const errorResponse = responses.find((response) => response.error)
  if (errorResponse)
    return <GraphQlError error={errorResponse.error} />

  if (responses.some((response) => response.loading))
    return <Loading />;

  const {currentUser} = responses[0].data;
  const hotThreads = responses[1].data.getHotThreadsByBoardNames;
  const recentEvents = responses[2].data.getThreadsByBoardNames;

  return (
    <Layout>
      <SectionTitleBar title="Home" icon=<HomeIcon />>
        <IconButton aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton onClick={() => router.push(`/user/${currentUser.id}`)} >
          <PersonIcon />
        </IconButton>
      </SectionTitleBar>

      <Grid container>
        <Grid item xs={12} md={6}>
          <SectionBox
            titleBar={(
              <SectionTitleBar title="Starred threads" icon=<FavoriteIcon />>
                <Button disabled>More</Button>
              </SectionTitleBar>
            )}
          >
            <ThreadList items={hotThreads} />
          </SectionBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <SectionBox
            titleBar={(
              <SectionTitleBar title="Hot threads" icon=<WhatshotIcon /> />
            )}
          >
            <ThreadList items={hotThreads} />
          </SectionBox>
        </Grid>
        <Grid item xs={12}>
          <SectionBox
            titleBar={(
              <SectionTitleBar title="Recent events" icon=<TrendingUpIcon /> />
            )}
          >
            <ThreadGrid items={recentEvents} xs={12} sm={6} md={4} />
          </SectionBox>
        </Grid>
      </Grid>

    </Layout>
  );
}

export default withAuth(Home);
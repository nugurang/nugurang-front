/* import { gql, useQuery } from '@apollo/client'; */
import {useRouter} from 'next/router';

import FavoriteIcon from '@material-ui/icons/Favorite';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import WhatshotIcon from '@material-ui/icons/Whatshot';

import Layout from '../components/Layout';
import BaseButton from '../components/BaseButton';
import BaseIconButton from '../components/BaseIconButton';
import SectionBox from '../components/SectionBox';
import SectionTitleBar from '../components/SectionTitleBar';
import ThreadGrid from '../components/ThreadGrid';
import ThreadList from '../components/ThreadList';


const TEST_FAVORITE_ARTICLE_LIST = [
  {
    id: 0,
    author: "Test user 1",
    avatar: "/static/images/sample_1.jpg",
    title: "Favorite article 1",
    content: "Content and more",
    image: "/static/images/sample_1.jpg",
    like: 3,
    topic: "Test topic",
    view: 4,
    vote: 5,
  },
  {
    id: 1,
    author: "Test user 2",
    avatar: "/static/images/sample_1.jpg",
    title: "Favorite article 2",
    content: "Content and more",
    image: "/static/images/sample_1.jpg",
    like: 3,
    topic: "Test topic",
    view: 4,
    vote: 5,
  },
  {
    id: 2,
    author: "Test user 3",
    avatar: "/static/images/sample_1.jpg",
    title: "Favorite article 3",
    content: "Content and more",
    image: "/static/images/sample_1.jpg",
    like: 3,
    topic: "Test topic",
    view: 4,
    vote: 5,
  },
]

const TEST_HOT_ARTICLE_LIST = [
  {
    id: 0,
    author: "Test user 1",
    avatar: "/static/images/sample_1.jpg",
    title: "Hot article 1",
    content: "Content and more",
    image: "/static/images/sample_1.jpg",
    like: 3,
    topic: "Test topic",
    view: 4,
    vote: 5,
  },
  {
    id: 1,
    author: "Test user 2",
    avatar: "/static/images/sample_1.jpg",
    title: "Hot article 2",
    content: "Content and more",
    image: "/static/images/sample_1.jpg",
    like: 3,
    topic: "Test topic",
    view: 4,
    vote: 5,
  },
  {
    id: 2,
    author: "Test user 3",
    avatar: "/static/images/sample_1.jpg",
    title: "Hot article 3",
    content: "Content and more",
    image: "/static/images/sample_1.jpg",
    like: 3,
    topic: "Test topic",
    view: 4,
    vote: 5,
  },
]

const TEST_RECENT_EVENT_LIST = [
  {
    id: 0,
    author: "Test user 1",
    avatar: "/static/images/sample_1.jpg",
    title: "Recent event 1",
    content: "Content and more",
    image: "/static/images/sample_1.jpg",
    like: 3,
    topic: "Test topic",
    view: 4,
    vote: 5,
  },
  {
    id: 1,
    author: "Test user 2",
    avatar: "/static/images/sample_1.jpg",
    title: "Recent event 2",
    content: "Content and more",
    image: "/static/images/sample_1.jpg",
    like: 3,
    topic: "Test topic",
    view: 4,
    vote: 5,
  },
  {
    id: 2,
    author: "Test user 3",
    avatar: "/static/images/sample_1.jpg",
    title: "Recent event 3",
    content: "Content and more",
    image: "/static/images/sample_1.jpg",
    like: 3,
    topic: "Test topic",
    view: 4,
    vote: 5,
  },
]

/*
function getData() {
  const { loading, error, data } = useQuery(gql`
    query {
      favoriteArticles {
        getCurrentUser() {
          favoriteArticles {
            id
            title
            image
            starredCount
            votedCount
          }
        }
      }
      hotArticles {
        getHotArticles(
          count: "4"
        ) {
          id
          title
          image
          starredCount
          votedCount
        }
      }
      recentEvents {
        getRecentEvents(
          count: "4"
        ) {
          id
          title
          image
          starredCount
          votedCount
        }
      }
    }
  `);
  if (loading)
    return (<p>Loading...</p>);
  if (error) {
    console.log(error);
  }
  return data;
}
*/

export default function Home() {
  const router = useRouter();
  /* const data = getData(); */
  return (
    <Layout>

      <SectionTitleBar title="Home" backButton>
        <BaseIconButton icon=<NotificationsIcon onClick={() => router.push('/notification')} /> />
        <BaseIconButton icon=<PersonIcon onClick={() => router.push('/user')} /> />
      </SectionTitleBar>


      <SectionBox
        titleBar={(
          <SectionTitleBar title="Favorite threads" icon=<FavoriteIcon />>
            <BaseButton label="More" />
          </SectionTitleBar>
        )}
      >
        <ThreadList items={TEST_FAVORITE_ARTICLE_LIST} />
      </SectionBox>


      <SectionBox
        titleBar={(
          <SectionTitleBar title="Hot threads" icon=<WhatshotIcon />>
            <BaseButton label="More" />
          </SectionTitleBar>
        )}
      >
        <ThreadList items={TEST_HOT_ARTICLE_LIST} />
      </SectionBox>


      <SectionBox
        titleBar={(
          <SectionTitleBar title="Recent events" icon=<TrendingUpIcon />>
            <BaseButton label="More" />
          </SectionTitleBar>
        )}
      >
        <ThreadGrid items={TEST_RECENT_EVENT_LIST} />
      </SectionBox>

    </Layout>
  );
}

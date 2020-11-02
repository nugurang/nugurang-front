import React from 'react';
import {useRouter} from 'next/router';
import { gql, useQuery } from '@apollo/client';
import Grid from'@material-ui/core/Grid';
import BookIcon from '@material-ui/icons/Book';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';

import Layout from '../../components/Layout';
import BaseButton from '../../components/BaseButton';
import HonorBadgeGrid from '../../components/HonorBadgeGrid';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import UserInfoBox from '../../components/UserInfoBox';
import ThreadList from '../../components/ThreadList';
import withAuth from '../../components/withAuth';


const TEST_USER = {
  id: 0,
  name: "Test User",
  email: "Test email",
  image: "/static/images/sample_1.jpg",
  bio: "Test bio",
  followers: 5,
  followings: 10,
}

const TEST_BLOG_THREAD = [
  {
    id: 0,
    user: TEST_USER,
    title: "Recent event 1",
    content: "Content and more",
    image: "/static/images/sample_1.jpg",
    like: 3,
    topic: "Test topic",
    view: 4,
    vote: 5,
  }
];



const TEST_HONOR_BADGE_LIST = [
  {
    id: 0,
    name: "Pikachu",
    image: "/static/images/sample_1.jpg",
    score: "1000000",
  },
  {
    id: 1,
    name: "Raichu",
    image: "/static/images/sample_1.jpg",
    score: "2000000",
  },
  {
    id: 2,
    name: "Charmander",
    image: "/static/images/sample_1.jpg",
    score: "3000000",
  },
  {
    id: 3,
    name: "Squirtle",
    image: "/static/images/sample_1.jpg",
    score: "4000000",
  },
]

export const GET_USER = gql`
  query {
    currentUser {
      id
      name
      email
    }
  }
`;

function User() {
  const router = useRouter();
  const { loading: queryLoading, error: queryError, data } = useQuery(GET_USER);
  if (queryLoading) return <p>Loading...</p>;
  if (queryError) return <p>Error :(</p>;

  return (
    <Layout>

      <SectionTitleBar title="My info" backButton />

      <SectionBox border={false}>
        <UserInfoBox
          name={data.currentUser.name}
          image={data.currentUser.image ? data.currentUser.image.address : null}
          bio={data.currentUser.biography || "No biography"}
          followers={TEST_USER.followers}
          followings={TEST_USER.followings}
          dense={false}
        />
        <Grid container direction="row" justify="flex-end">
          <Grid item align="right">
            <BaseButton label="My followers" onClick={() => router.push('/user/follow')} />
            <BaseButton label="Sign out" onClick={() => router.push('/signout')} />
          </Grid>
        </Grid>
      </SectionBox>


      <SectionBox
        titleBar={(
          <SectionTitleBar title="New blog thread" icon=<BookIcon />>
            <BaseButton label="Visit blog" />
          </SectionTitleBar>
        )}
      >
        <ThreadList items={TEST_BLOG_THREAD} />
      </SectionBox>


      <SectionBox
        titleBar={(
          <SectionTitleBar title="My honor badges" icon=<EmojiEventsIcon />>
            <BaseButton label="More" onClick={() => router.push('/user/honor')} />
          </SectionTitleBar>
        )}
      >
        <HonorBadgeGrid items={TEST_HONOR_BADGE_LIST} />
      </SectionBox>

    </Layout>
  );
}

export default withAuth(User);
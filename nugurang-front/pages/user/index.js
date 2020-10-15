import React from 'react';
import Grid from '@material-ui/core/Grid';

import BookIcon from '@material-ui/icons/Book';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';

import Layout from '../../components/Layout';

import BriefArticleListWithLikeComment from '../../components/BriefArticleListWithLikeComment';
import ContentPaper from '../../components/ContentPaper';
import HonorBadgeGrid from '../../components/HonorBadgeGrid';
import PageTitleBox from '../../components/PageTitleBox';
import SectionTitleBoxWithButton from '../../components/SectionTitleBoxWithButton';
import UniversalButton from '../../components/UniversalButton';
import UserInfoBox from '../../components/UserInfoBox';

const userTest = {
  id: 1,
  name: "Username",
  image: "/static/favicon/sample_1.jpg",
  statistics: "Statistics",
  bio: "BioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBio"
}


const singleArticleListTest = [
  {
    id: 1,
    title: "Article 1",
    author: "User 1",
    content: "Content 111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111",
    like: 1,
    comment: 3,
    image: "/static/images/sample_1.jpg",
  },
];



const honorBadgesTest = [
  {
    id: 1,
    name: "Badge 1",
    value: 7000,
    image: "/static/favicons/favicon-nugurang.png",
  },
  {
    id: 2,
    name: "Badge 2",
    value: 8000,
    image: "/static/favicons/favicon-nugurang.png",
  },
  {
    id: 3,
    name: "Badge 3",
    value: 9000,
    image: "/static/favicons/favicon-nugurang.png",
  },
  {
    id: 4,
    name: "Badge 4",
    value: 10000,
    image: "/static/favicons/favicon-nugurang.png",
  },
  {
    id: 5,
    name: "Badge 5",
    value: 200000,
    image: "/static/favicons/favicon-nugurang.png",
  },
  {
    id: 6,
    name: "Badge 6",
    value: 3000000,
    image: "/static/favicons/favicon-nugurang.png",
  },
  {
    id: 7,
    name: "Badge 7",
    value: 40000000,
    image: "/static/favicons/favicon-nugurang.png",
  },
];


export default function Home() {
  return (
    <Layout>

      <PageTitleBox title="User" />
      <UserInfoBox user={userTest} />

      <Grid container spacing={2} alignItems="center" direction="row" justify="space-evenly">
        <Grid item align="left">
          <UniversalButton label="Chat" />
        </Grid>
        <Grid item align="left">
          <UniversalButton label="Invite" />
        </Grid>
        <Grid item align="left">
          <UniversalButton label="Follow" />
        </Grid>
      </Grid>

      <SectionTitleBoxWithButton title="Blog" label="More" icon={<BookIcon />} />
      <ContentPaper>
        <BriefArticleListWithLikeComment articles={singleArticleListTest} />
      </ContentPaper>
      <SectionTitleBoxWithButton title="Honor points" label="More" icon={<EmojiEventsIcon />} />
      <ContentPaper>
        <HonorBadgeGrid honorBadges={honorBadgesTest} />
      </ContentPaper>

    </Layout>
  );
}

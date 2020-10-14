import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import FavoriteIcon from '@material-ui/icons/Favorite';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import WhatshotIcon from '@material-ui/icons/Whatshot';

import Layout from '../../components/Layout';

import BriefArticleListWithLikeComment from '../../components/BriefArticleListWithLikeComment';
import CardGrid from '../../components/CardGrid';
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




const useStyles = makeStyles((theme) => ({
  box: {
    border: '0px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '5px',
    padding: '0px',
    variant: 'outlined',
  },
  iconButton: {
    backgroundColor: "white",
    color: "black",
    height: '40px',
    width: '40px',
  },
  titleTypography: {
    fontFamily: "Ubuntu",
    fontSize: 30,
    fontWeight: 300,
  },
}));


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

      <SectionTitleBoxWithButton title="Blog" label="More" icon={<WhatshotIcon />} />
      <ContentPaper>
        <BriefArticleListWithLikeComment articles={singleArticleListTest}/>
      </ContentPaper>
      <SectionTitleBoxWithButton title="Honor points" label="More" icon={<TrendingUpIcon />} />
      <ContentPaper>
        <HonorBadgeGrid honorBadges={honorBadgesTest} />
      </ContentPaper>

    </Layout>
  );
}

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

import ArticleDenseList from '../../components/ArticleDenseList';
import CardGrid from '../../components/CardGrid';
import ContentPaper from '../../components/ContentPaper';
import PageTitleBoxWithoutBackButton from '../components/PageTitleBoxWithoutBackButton';
import SectionTitleBox from '../../components/SectionTitleBox';


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

      <PageTitleBox title="Community" />
      <SectionTitleBox title="Favorite articles" icon={<FavoriteIcon />} />
      <ContentPaper>
        <ArticleDenseList articles={favoriteArticlesListTest} />
      </ContentPaper>
      <SectionTitleBox title="Hot articles" icon={<WhatshotIcon />} />
      <ContentPaper>
        <ArticleDenseList articles={hotArticlesListTest} />
      </ContentPaper>
      <SectionTitleBox title="Recent comps" icon={<TrendingUpIcon />} />
      <ContentPaper>
        <CardGrid cards={recentCompsGridTest} />
      </ContentPaper>

    </Layout>
  );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import FavoriteIcon from '@material-ui/icons/Favorite';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import WhatshotIcon from '@material-ui/icons/Whatshot';

import Layout from '../components/Layout';

import ArticleDenseListWithLikeComment from '../components/ArticleDenseListWithLikeComment';
import ArticleGridWithLikeComment from '../components/ArticleGridWithLikeComment';
import ContentPaper from '../components/ContentPaper';
import SectionTitleBox from '../components/SectionTitleBox';


const favoriteArticlesListTest = [
  {
    id: 1,
    title: "Article 1",
    content: "Content 1",
    like: 1,
    comment: 3,
    image: "/static/images/sample_1.jpg",
    chip: "Basic1",
  },
  {
    id: 2,
    title: "Article 2 with no images",
    content: "Content 2",
    like: 4,
    comment: 2,
    chip: "Basic2",
  },
  {
    id: 3,
    title: "Article 3 with no chips",
    content: "Content 3",
    like: 9,
    image: "/static/images/sample_3.jpg",
    comment: 1,
  }
];

const hotArticlesListTest = [
  {
    id: 1,
    title: "Article 1",
    content: "Content 1",
    like: 1,
    comment: 3,
    image: "/static/images/sample_1.jpg",
    chip: "Basic1",
  },
  {
    id: 2,
    title: "Article 2 with no images",
    content: "Content 2",
    like: 4,
    comment: 2,
    chip: "Basic2",
  },
  {
    id: 3,
    title: "Article 3 with no chips",
    content: "Content 3",
    like: 9,
    image: "/static/images/sample_3.jpg",
    comment: 1,
  }
];

const recentEventsTest = [
  {
    id: 1,
    title: "Article 1",
    content: "Content 1",
    like: 1,
    comment: 3,
    image: "/static/images/sample_1.jpg",
    chip: "Basic1",
  },
  {
    id: 2,
    title: "Article 2 with no images",
    content: "Content 2",
    like: 4,
    comment: 2,
    chip: "Basic2",
  },
  {
    id: 3,
    title: "Article 3 with no chips",
    content: "Content 3",
    like: 9,
    image: "/static/images/sample_3.jpg",
    comment: 1,
  }
];


const useStyles = makeStyles(() => ({
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

function PageTitle() {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.box}>
        <Grid container spacing={2} alignItems="center" direction="row" justify="space-between">

          <Grid item align="left">
            <Typography className={classes.titleTypography}>
              Home
            </Typography>
          </Grid>
          <Grid item xs align="right">

            <Grid container spacing={2} alignItems="center" direction="row" justify="flex-end">
              <Grid item align="right">
                <Link href="/">
                  <IconButton className={classes.iconButton} color="primary" aria-label="Notifications" component="span">
                    <NotificationsIcon />
                  </IconButton>
                </Link>
                <Link href="/user">
                  <IconButton className={classes.iconButton} color="primary" aria-label="My Info" component="span">
                    <PersonIcon />
                  </IconButton>
                </Link>
              </Grid>
            </Grid>

          </Grid>
        </Grid>
      </Box>
    </>
  );
}


export default function Home() {
  return (
    <Layout>

      <PageTitle />
      <SectionTitleBox title="Favorite articles" icon={<FavoriteIcon />} />
      <ContentPaper>
        <ArticleDenseListWithLikeComment articles={favoriteArticlesListTest} />
      </ContentPaper>
      <SectionTitleBox title="Hot articles" icon={<WhatshotIcon />} />
      <ContentPaper>
        <ArticleDenseListWithLikeComment articles={hotArticlesListTest} />
      </ContentPaper>
      <SectionTitleBox title="Recent Events" icon={<TrendingUpIcon />} />
      <ContentPaper>
        <ArticleGridWithLikeComment articles={recentEventsTest} />
      </ContentPaper>

    </Layout>
  );
}

import React from 'react';

import FavoriteIcon from '@material-ui/icons/Favorite';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

import Layout from '../components/Layout';

import ArticleDenseList from '../components/ArticleDenseList';
import CardGrid from '../components/CardGrid';
import ContentPaper from '../components/ContentPaper';
import PageTitleBoxWithoutBackButton from '../components/PageTitleBoxWithoutBackButton';
import SectionTitleBox from '../components/SectionTitleBox';


const favoriteArticlesListTest = [
  {
    id: 1,
    title: "Article 1",
  },
  {
    id: 2,
    title: "Article 2",
  },
  {
    id: 3,
    title: "Article 3",
  }
];

const hotArticlesListTest = [
  {
    id: 1,
    title: "Article 1",
  },
  {
    id: 2,
    title: "Article 2",
  },
  {
    id: 3,
    title: "Article 3",
  }
];

const recentCompsGridTest = [
  {
    id: 1,
    title: "Article 1",
    image: "/static/images/team.jpg",
  },
  {
    id: 2,
    title: "Article 2",
    image: "/static/images/team.jpg",
  },
  {
    id: 3,
    title: "Article 3",
    image: "/static/images/team.jpg",
  }
];


export default function Home() {
  return (
    <Layout>

      <PageTitleBoxWithoutBackButton title="Home" />
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

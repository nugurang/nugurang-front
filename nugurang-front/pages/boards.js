import { useRouter } from 'next/router';
import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SectionTitleBox from '../components/SectionTitleBox';
import ContentPaper from '../components/ContentPaper';
import ArticleGridWithLikeComment from '../components/ArticleGridWithLikeComment';
import ArticleListWithLikeComment from '../components/ArticleListWithLikeComment';
import PageTitleBox from '../components/PageTitleBox';
import Layout from '../components/Layout';

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


export default function Index() {
  const router = useRouter();
  const [showEvents, setShowEvents] = useState(false);
  const toggleShowEvents = () => {
    setShowEvents((prev) => !prev);
  };
  const { loading, error/* , data */} = useQuery(gql`
    query  {
      ping
    }
  `);
  if (loading)
    return (<p>Loading...</p>);
  if (error) {
    console.log(error);
    router.push('/signin');
    return (<p>Error :(</p>);
  }
  return (
    <Layout>
      <PageTitleBox title="Boards">
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>
              <Switch name="events" checked={showEvents} onChange={toggleShowEvents} />
            </Grid>
            <Grid item><Typography>Show Events</Typography></Grid>
          </Grid>
        </Typography>
      </PageTitleBox>
      { showEvents ?
        (
          <>
            <SectionTitleBox title="Hot Events" icon={<WhatshotIcon />} />
            <ContentPaper>
              <ArticleGridWithLikeComment articles={recentEventsTest} />
            </ContentPaper>
            <SectionTitleBox title="Recent Events" icon={<TrendingUpIcon />} />
            <ContentPaper>
              <ArticleGridWithLikeComment articles={recentEventsTest} />
            </ContentPaper>
          </>
)
        :
        (
          <>
            <SectionTitleBox title="Hot Articles" icon={<WhatshotIcon />} />
            <ContentPaper>
              <ArticleListWithLikeComment dense articles={hotArticlesListTest} />
            </ContentPaper>
            <SectionTitleBox title="Recent Articles" icon={<TrendingUpIcon />} />
            <ContentPaper>
              <ArticleListWithLikeComment dense articles={hotArticlesListTest} />
            </ContentPaper>
          </>
)}
    </Layout>
  );
}

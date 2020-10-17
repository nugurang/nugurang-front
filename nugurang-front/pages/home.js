import Link from 'next/link';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import Layout from '../components/Layout';
import ArticleListWithLikeComment from '../components/ArticleListWithLikeComment';
import ArticleGridWithLikeComment from '../components/ArticleGridWithLikeComment';
import ContentPaper from '../components/ContentPaper';
import SectionTitleBox from '../components/SectionTitleBox';
import PageTitleBox from '../components/PageTitleBox';


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

export default function Home() {
  return (
    <Layout>
      <PageTitleBox title="Home" backButton={false}>
        <Link href="/notifications">
          <IconButton aria-label="Notifications" component="span">
            <NotificationsIcon />
          </IconButton>
        </Link>
        <Link href="/user">
          <IconButton aria-label="User" component="span">
            <PersonIcon />
          </IconButton>
        </Link>
      </PageTitleBox>
      <SectionTitleBox title="Favorite articles" icon={<FavoriteIcon />} />
      <ContentPaper>
        <ArticleListWithLikeComment dense articles={favoriteArticlesListTest} />
      </ContentPaper>
      <SectionTitleBox title="Hot articles" icon={<WhatshotIcon />} />
      <ContentPaper>
        <ArticleListWithLikeComment dense articles={hotArticlesListTest} />
      </ContentPaper>
      <SectionTitleBox title="Recent Events" icon={<TrendingUpIcon />} />
      <ContentPaper>
        <ArticleGridWithLikeComment dense articles={recentEventsTest} />
      </ContentPaper>
    </Layout>
  );
}

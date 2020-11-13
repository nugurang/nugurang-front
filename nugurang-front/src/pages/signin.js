import {useRouter} from 'next/router';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

import BaseListItem from '../components/BaseListItem';
import Layout from '../components/Layout';
import SectionBox from '../components/SectionBox';
import PageTitleBar from '../components/PageTitleBar';
import { BACKEND_ADDR } from '../config';

export default function SignIn() {
  const router = useRouter();
  const SIGNIN_LIST = [
    {
      id: 1,
      name: "Facebook",
      title: "Sign in with Facebook",
      image: "/static/favicons/favicon-facebook.png",
      onClick: () => alert('Facebook not supported')
    },
    {
      id: 2,
      name: "GitHub",
      title: "Sign in with GitHub",
      image: "/static/favicons/favicon-github.png",
      onClick: () => router.push(`${BACKEND_ADDR}/oauth2/authorization/github`)
    },
    {
      id: 3,
      name: "Kakao",
      title: "Sign in with Kakao",
      image: "/static/favicons/favicon-kakao.png",
      onClick: () => router.push(`${BACKEND_ADDR}/oauth2/authorization/kakao`)
    },
];

  return (
    <Layout>
      <PageTitleBar title="Sign In" backButton />
      <Container maxWidth="sm">
        <SectionBox>
            {
              SIGNIN_LIST && (SIGNIN_LIST.length)
              ? <List container>{[SIGNIN_LIST].flat().map((item) => <BaseListItem avatar={item.image} primary={item.title} onClick={item.onClick} />)}</List>
              : <NoContentsBox />
            }
        </SectionBox>
      </Container>
    </Layout>
  );
}

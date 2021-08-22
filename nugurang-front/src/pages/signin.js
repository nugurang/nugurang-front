import { useRouter } from 'next/router';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';

import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import TextsmsIcon from '@material-ui/icons/Textsms';

import BaseListItem from '../components/BaseListItem';
import Layout from '../components/Layout';
import NoContentsBox from '../components/NoContentsBox';
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
      icon: <FacebookIcon />,
      image: "/static/favicons/favicon-facebook.png",
      onClick: () => alert('Facebook not supported')
    },
    {
      id: 2,
      name: "GitHub",
      title: "Sign in with GitHub",
      icon: <GitHubIcon />,
      image: "/static/favicons/favicon-github.png",
      onClick: () => router.push(`${BACKEND_ADDR}/oauth2/authorization/github`)
    },
    {
      id: 3,
      name: "Kakao",
      title: "Sign in with Kakao",
      icon: <TextsmsIcon />,
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
              ? <List container>{[SIGNIN_LIST].flat().map((item) => <BaseListItem icon={item.icon} primary={item.title} onClick={item.onClick} />)}</List>
              : <NoContentsBox />
            }
        </SectionBox>
      </Container>
    </Layout>
  );
}

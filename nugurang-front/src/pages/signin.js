import {useRouter} from 'next/router';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';

import BaseListItem from '../components/BaseListItem';
import Layout from '../components/Layout';
import SectionBox from '../components/SectionBox';
import PageTitleBar from '../components/PageTitleBar';
import { BACKEND_ADDR } from '../config';

export default function SignIn() {
  const router = useRouter();
  const TEST_SIGNIN_LIST = [
    {
      id: 1,
      name: "Facebook",
      primary: "Sign in with Facebook",
      avatar: "/static/favicons/favicon-facebook.png",
      onClick: () => alert('facebook not supported')
    },
    {
      id: 2,
      name: "GitHub",
      primary: "Sign in with GitHub",
      avatar: "/static/favicons/favicon-github.png",
      onClick: () => router.push(`${BACKEND_ADDR}/oauth2/authorization/github`)
    },
    {
      id: 3,
      name: "Kakao",
      primary: "Sign in with Kakao",
      avatar: "/static/favicons/favicon-kakao.png",
      onClick: () => router.push(`${BACKEND_ADDR}/oauth2/authorization/kakao`)
    },
];

  return (
    <Layout>
      <SectionBox
        titleBar={<PageTitleBar title="Sign In" backButton />}
      >

      <Container maxWidth="md">
        <List>
          {TEST_SIGNIN_LIST.map(
            (item) => (
              <BaseListItem
                key={item.id}
                avatar={item.avatar}
                avatarDescription={item.name}
                primary={item.primary}
                onClick={item.onClick}
              />
            )
          )}
        </List>
      </Container>
      
      </SectionBox>
    </Layout>
  );
}

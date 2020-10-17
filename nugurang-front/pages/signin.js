import {useRouter} from 'next/router';
import Layout from '../components/Layout';
import ContentPaper from '../components/ContentPaper';
import PageTitleBox from '../components/PageTitleBox';
import UniversalList from '../components/UniversalList';

export default function SignIn() {
  const router = useRouter();
  const signInListTest = [
    {
      id: 1,
      name: "Facebook",
      primary: "Sign in with Facebook",
      icon: "/static/favicons/favicon-facebook.png",
      onClick: () => alert('facebook not supported')
    },
    {
      id: 2,
      name: "GitHub",
      primary: "Sign in with GitHub",
      icon: "/static/favicons/favicon-github.png",
      onClick: () => router.push('http://localhost:8080/oauth2/authorization/github')
    },
    {
      id: 3,
      name: "Kakao",
      primary: "Sign in with Kakao",
      icon: "/static/favicons/favicon-kakao.png",
      onClick: () => router.push('http://localhost:8080/oauth2/authorization/kakao')
    },
];

  return (
    <Layout>
      <PageTitleBox title="Sign In" />
      <ContentPaper>
        <UniversalList list={signInListTest} />
      </ContentPaper>
    </Layout>
  );
}

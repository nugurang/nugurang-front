import React from 'react';

import Layout from '../components/Layout';

import ContentPaper from '../components/ContentPaper';
import PageTitleBox from '../components/PageTitleBox';
import UniversalList from '../components/UniversalList';


const signInListTest = [
  {
    id: 1,
    name: "Facebook",
    primary: "Sign in with Facebook",
    icon: "/static/favicons/favicon-facebook.png",
  },
  {
    id: 2,
    name: "GitHub",
    primary: "Sign in with GitHub",
    icon: "/static/favicons/favicon-github.png",
  },
  {
    id: 3,
    name: "Kakao",
    primary: "Sign in with Kakao",
    icon: "/static/favicons/favicon-kakao.png",
  },
];


export default function SignIn() {
  return (
    <Layout>
      <PageTitleBox title="Sign In" />
      <ContentPaper>
        <UniversalList list={signInListTest} />
      </ContentPaper>
    </Layout>
  );
}

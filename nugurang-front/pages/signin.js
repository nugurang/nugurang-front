import { useRouter } from 'next/router'
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Layout from '../components/Layout';

import ContentPaper from '../components/ContentPaper';
import PageTitleBox from '../components/PageTitleBox';
import SectionTitleBox from '../components/SectionTitleBox';
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

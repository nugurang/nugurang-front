import { useRouter } from 'next/router'
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Layout from '../components/Layout';

import PageTitleBox from '../components/PageTitleBox';
import SectionTitleBox from '../components/SectionTitleBox';
import UniversalButton from '../components/UniversalButton';


const signInButtons = [
  {
  	name: "Facebook",
    content: "Sign in with Facebook",
    favicon: "/static/favicons/favicon-facebook.png",
  },
  {
  	name: "GitHub",
    content: "Sign in with GitHub",
    favicon: "/static/favicons/favicon-github.png",
  },
  {
  	name: "Kakao",
    content: "Sign in with Kakao",
    favicon: "/static/favicons/favicon-kakao.png",
  },
];


function SignInField() {
  const router = useRouter()
  return (
	  <Grid container spacing={2} alignItems="center" direction="row" justify="center">

        {signInButtons.map(signInButton => (
        <Grid item xs={12} align="center">
          <Button
            fullWidth
            startIcon={
              <Avatar alt={signInButton.name}
              src={signInButton.favicon}
              variant="square"
            />}
            type="submit"
            variant="outlined"
          >
            <Typography>{signInButton.content}</Typography>
          </Button>
          </Grid>
        ))}

	  </Grid>
  );
}


export default function SignIn() {
  return (
    <Layout>
      <PageTitleBox title="Sign In" />
      <Container maxWidth='xs'>
        <SignInField />
      </Container>
    </Layout>
  );
}

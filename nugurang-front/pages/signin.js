import { useRouter } from 'next/router'
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Layout from '../components/Layout';
import ContentTitleTypography from '../components/typographies/ContentTitleTypography';
import ContentTypography from '../components/typographies/ContentTypography';
import SelectButton from '../components/buttons/SelectButton';
import ButtonTypography from '../components/buttons/ButtonTypography';
import ContentCard from '../components/cards/ContentCard';
import CardTitleTypography from '../components/cards/CardTitleTypography';
import PageTitlePaper from '../components/papers/PageTitlePaper';
import BackgroundPaper from '../components/papers/BackgroundPaper';
import ContentPaper from '../components/papers/ContentPaper';
import PageTitleTypography from '../components/typographies/PageTitleTypography';
import ContentPaperTitleTypography from '../components/papers/ContentPaperTitleTypography';
import ListItemTextPrimaryTypography from '../components/lists/ListItemTextPrimaryTypography';
import ListItemTextSecondaryTypography from '../components/lists/ListItemTextSecondaryTypography';


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


function PageTitle() {
  return (
    <PageTitleTypography>
      Sign In
    </PageTitleTypography>
  );
}

function SignInField() {
  const router = useRouter()
  return (
	  <Grid container spacing={2} alignItems="center" justify="center">
      <Grid item xs={12} justify='space-around'>
        <ContentPaperTitleTypography>
          Sign In
        </ContentPaperTitleTypography>

        {signInButtons.map(signInButton => (
        <Grid item xs={12}>
          <SelectButton
            fullWidth
            startIcon={
              <Avatar alt={signInButton.name}
              src={signInButton.favicon}
              variant="square"
            />}
            type="submit"
            variant="outlined"
          >
            <ButtonTypography>{signInButton.content}</ButtonTypography>
          </SelectButton>
          </Grid>
        ))}

        <Grid item xs={12}>
          <SelectButton onClick={() => router.back()} startIcon={<ArrowBackIcon />} >
            <ButtonTypography>Back</ButtonTypography>
          </SelectButton>
          </Grid>

	    </Grid>
	  </Grid>
  );
}


export default function SignIn() {
  return (
    <Layout>
      <Grid container spacing={2}>
      
        <Grid item xs={12}>
          <PageTitlePaper>
            <PageTitle />
          </PageTitlePaper>
        </Grid>

        <Grid item xs={12} align='center'>
          <Box width="75%">
            <SignInField />
          </Box>
        </Grid>

      </Grid>
    </Layout>
  );
}

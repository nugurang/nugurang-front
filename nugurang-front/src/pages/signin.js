import { useRouter } from 'next/router';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import TextsmsIcon from '@material-ui/icons/Textsms';

import { makeStyles } from '@material-ui/styles';
import BaseListItem from '../components/BaseListItem';
import Layout from '../components/Layout';
import NoContentsBox from '../components/NoContentsBox';
import SectionBox from '../components/SectionBox';
import PageTitleBar from '../components/PageTitleBar';

const useStyles = makeStyles(() => ({
  logo: {
    width: '20vh',
    marginBottom: '5vh',
  },
}));

export default function SignIn() {
  const router = useRouter();
  const classes = useStyles();

  const SIGNIN_LIST = [
    {
      id: 1,
      name: "Facebook",
      title: "Sign in with Facebook",
      icon: <FacebookIcon />,
      onClick: () => alert('Facebook not supported')
    },
    {
      id: 2,
      name: "GitHub",
      title: "Sign in with GitHub",
      icon: <GitHubIcon />,
      onClick: () => router.push(`${process.env.NEXT_PUBLIC_BACKEND_ADDR_PUBLIC}/oauth2/authorization/github`)
    },
    {
      id: 3,
      name: "Kakao",
      title: "Sign in with Kakao",
      icon: <TextsmsIcon />,
      onClick: () => router.push(`${process.env.NEXT_PUBLIC_BACKEND_ADDR_PUBLIC}/oauth2/authorization/kakao`)
    },
];

  return (
    <Layout>
      <PageTitleBar title="Sign In" backButton />
      <Container maxWidth="sm">
        <Grid container justify="center">
          <img src="/images/nugurang-logo.png" className={classes.logo} />
        </Grid>
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

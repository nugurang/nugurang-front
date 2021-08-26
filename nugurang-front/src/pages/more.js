import { useRouter } from 'next/router';
import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import CodeIcon from '@material-ui/icons/Code';
import PersonIcon from '@material-ui/icons/Person';
import QueueIcon from '@material-ui/icons/Queue';

import withAuthServerSide from '../utils/withAuthServerSide';
import { queryToBackend } from "../utils/requestToBackend";
import { GetCurrentUserQueryBuilder } from '../queries/user';

import BaseListItem from '../components/BaseListItem';
import Layout from '../components/Layout';
import NoContentsBox from '../components/NoContentsBox';
import PageTitleBar from '../components/PageTitleBar';
import SectionBox from '../components/SectionBox';
import SectionTitleBar from '../components/SectionTitleBar';
import UserInfoBox from '../components/UserInfoBox';
import YesNoDialog from '../components/YesNoDialog';

export const getServerSideProps = withAuthServerSide(async ({ context }) => {
  const currentUserResult = await queryToBackend({
    context,
    query: new GetCurrentUserQueryBuilder().withFollows().build(),
  });
  return {
    props: {
      currentUser: currentUserResult.data.currentUser,
    },
  };
});

function More({ currentUser }) {
  const router = useRouter();

  const MENU_USER = [
    {
      id: 0,
      title: "My information",
      onClick: () => router.push(`/user/${currentUser.id}`)
    },
    {
      id: 1,
      title: "My blog",
      onClick: () => router.push(`/user/${currentUser.id}/blog`)
    },
  ]

  const MENU_SEARCH = [
    {
      id: 0,
      title: "Find user",
      onClick: () => router.push(`/user/find`)
    },
    {
      id: 1,
      title: "Positions",
      onClick: () => router.push(`/positions`)
    },
  ]

  const MENU_DEVELOPERS = [
    {
      id: 0,
      title: "Initialize database",
      onClick: () => router.push(`/init`)
    },
  ]

  return (
    <Layout>
      <PageTitleBar title="More" backButton backButtonLink="/home" />

      <Grid container>
        <Grid item xs={12} md={6} lg={4}>
          <SectionBox border={false}>
            <Grid container alignItems="center">
              {
                !currentUser
                ? (
                  <>
                    <Grid item xs={12} sm={8}>
                      <Typography>You need to sign in first.</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} align="right">
                      <Button variant="contained" onClick={() => router.push('/signin')}>Sign in</Button>
                    </Grid>
                  </>
                )
                : (
                  <>
                    <Grid item xs={12}>
                      <UserInfoBox user={currentUser} dense />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container justify="flex-end">
                        <Grid item>
                          <Button variant="contained" onClick={() => router.push(`/user/${currentUser.id}`)}>
                            My info
                          </Button>
                        </Grid>
                        <Grid item>
                          <YesNoDialog
                            title="Logout"
                            content="Are you sure to logout?"
                            onClickYes={() => router.push(`${process.env.NEXT_PUBLIC_BACKEND_ADDR_PUBLIC}/logout`)}
                          >
                            <Button variant="contained">
                              Sign out
                            </Button>
                          </YesNoDialog>
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                )
              }
            </Grid>
          </SectionBox>
        </Grid>
        <Grid item xs={12} md={6} lg={8}>

          <SectionBox titleBar={<SectionTitleBar title="My account" icon={<PersonIcon />} />}>
            {
              MENU_USER && (MENU_USER.length)
              ? <List container>{[MENU_USER].flat().map((item) => <BaseListItem primary={item.title} onClick={item.onClick} />)}</List>
              : <NoContentsBox />
            }
          </SectionBox>

          <SectionBox titleBar={<SectionTitleBar title="Search tools" icon={<QueueIcon />} />}>
            {
              MENU_SEARCH && (MENU_SEARCH.length)
              ? <List container>{[MENU_SEARCH].flat().map((item) => <BaseListItem primary={item.title} onClick={item.onClick} />)}</List>
              : <NoContentsBox />
            }
          </SectionBox>

          <SectionBox titleBar={<SectionTitleBar title="Developer options" icon={<CodeIcon /> }/>}>
            {
              MENU_DEVELOPERS && (MENU_DEVELOPERS.length)
              ? <List container>{[MENU_DEVELOPERS].flat().map((item) => <BaseListItem primary={item.title} onClick={item.onClick} />)}</List>
              : <NoContentsBox />
            }
          </SectionBox>
        </Grid>
      </Grid>

    </Layout>
  );
}

export default More;

import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

import CodeIcon from '@material-ui/icons/Code';
import QueueIcon from '@material-ui/icons/Queue';

import { BACKEND_ADDR } from '../config';
import withAuth from '../components/withAuth';
import BaseListItem from '../components/BaseListItem';
import GraphQlError from '../components/GraphQlError';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import PageTitleBar from '../components/PageTitleBar';
import SectionBox from '../components/SectionBox';
import SectionTitleBar from '../components/SectionTitleBar';
import UserInfoBox from '../components/UserInfoBox';


export const CURRENT_USER = gql`
  query {
    currentUser {
      id
      oauth2Provider
      oauth2Id
      name
      email
      image {
        id
        address
      }
      biography
      getFollowers(page:0, pageSize:100) {
        id
      }
      getFollowings(page:0, pageSize:100) {
        id
      }
    }
  }
`;


function More() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const MENU_SEARCH = [
    {
      id: 0,
      title: "Find user",
      onClick: () => router.push(`/user/find`)
    },
  ]

  const MENU_DEVELOPERS = [
    {
      id: 0,
      title: "Initialize database",
      onClick: () => router.push(`/init`)
    },
    {
      id: 1,
      title: "Components overview",
      onClick: () => router.push(`/comp-ov`)
    },
  ]

  const results = [
    [null, useQuery(CURRENT_USER)],
  ];
  const user = results[0][1].data ? results[0][1].data.currentUser : null;

  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Layout>
      <PageTitleBar title="More" backButton backButtonLink="/home" />

      <Grid container>
        <Grid item xs={12} md={6} lg={4}>
          <SectionBox border={false}>
            <Grid container alignItems="center">
              {
                !user
                ? (
                  <>
                    <Grid item xs={12} sm={8}>
                      <Typography>You need to sign in first.</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} align="right">
                      <ButtonGroup color="primary">
                        <Button variant="outlined" onClick={() => router.push('/signin')}>Sign in</Button>
                      </ButtonGroup>
                    </Grid>
                  </>
                )
                : (
                  <>
                    <Grid item xs={12}>
                      <UserInfoBox user={user} dense />
                    </Grid>
                    <Grid item xs align="right">
                      <Button variant="outlined" onClick={() => router.push(`/user/${user.id}`)}>
                        My info
                      </Button>
                      <Button variant="outlined" onClick={handleClickOpen}>
                        Sign out
                      </Button>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          Sign out
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Are you sure to sign out?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => router.push(`${BACKEND_ADDR}/logout`)} color="primary" autoFocus>
                            Yes
                          </Button>
                          <Button onClick={handleClose} color="primary" autoFocus>
                            No
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Grid>
                  </>
                )
              }
            </Grid>
          </SectionBox>
        </Grid>
        <Grid item xs={12} md={6} lg={8}>

          <SectionBox titleBar={<SectionTitleBar title="Search tools" icon=<QueueIcon /> />}>
            {
              MENU_SEARCH && (MENU_SEARCH.length)
              ? <List container>{[MENU_SEARCH].flat().map((item) => <BaseListItem primary={item.title} onClick={item.onClick} />)}</List>
              : <NoContentsBox />
            }
          </SectionBox>

          <SectionBox titleBar={<SectionTitleBar title="Developer options" icon=<CodeIcon /> />}>
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

export default withAuth(More);
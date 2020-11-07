import { gql, useQuery } from '@apollo/client';
import {useRouter} from 'next/router';
import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import QueueIcon from '@material-ui/icons/Queue';

import { BACKEND_ADDR } from '../config';
import BaseListItem from '../components/BaseListItem';
import GraphQlError from '../components/GraphQlError';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import SectionBox from '../components/SectionBox';
import SectionTitleBar from '../components/SectionTitleBar';
import UserInfoBox from '../components/UserInfoBox';
import withAuth from '../components/withAuth';


const TEST_MORE_MENU_LIST = [
  {
    id: 1,
    title: "Find user",
    link: "/user/find",
  },
  {
    id: 2,
    title: "Manage my info",
    link: "/user/update",
  },
  {
    id: 101,
    title: "Initialize database",
    link: "/init",
  },
  {
    id: 102,
    title: "Component overview",
    link: "/comp-ov",
  },
];


export const GET_CURRENT_USER = gql`
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

  const responses = [
    useQuery(GET_CURRENT_USER)
  ];
  const errorResponse = responses.find((response) => response.error)
  if (errorResponse)
    return <GraphQlError error={errorResponse.error} />

  if (responses.some((response) => response.loading))
    return <Loading />;

  const currentUser = responses[0].data.currentUser;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Layout>
      <SectionTitleBar title="More" backButton backButtonLink="/home" />

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
                  <ButtonGroup color="primary">
                    <Button onClick={() => router.push('/signin')} >Sign in</Button>
                  </ButtonGroup>
                </Grid>
              </>
            )
            : (
              <>
                <Grid item xs={12}>
                  <UserInfoBox user={currentUser} dense/>
                </Grid>
                <Grid item xs align="right">
                  <ButtonGroup color="primary">
                    <Button onClick={() => router.push(`/user/${currentUser.id}`)} >
                      My info
                    </Button>
                    <Button onClick={handleClickOpen}>
                      Sign out
                    </Button>
                  </ButtonGroup>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Sign out"}
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

      <SectionBox
        titleBar={
          <SectionTitleBar title="More features" icon=<QueueIcon /> />
        }
      >
        <List>
          {TEST_MORE_MENU_LIST.map((item) => <BaseListItem item key={item.id} primary={item.title} onClick={() => {router.push(`${item.link}`)}} />)}
        </List>
      </SectionBox>

    </Layout>
  );
}

export default withAuth(More);

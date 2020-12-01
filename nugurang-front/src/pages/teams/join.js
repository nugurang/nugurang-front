import { gql, useMutation, useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';
import { useRouter } from 'next/router';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';

import FullScreenDialogBox from '../../components/FullScreenDialogBox';
import GraphQlError from '../../components/GraphQlError';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import PageTitleBar from '../../components/PageTitleBar';
import withAuth from '../../components/withAuth';


const useStyles = makeStyles(() => ({
  avatar: {
    fontSize: 48,
    height: '7.5rem',
    margin: '0rem',
    width: '7.5rem'
  },
}));

export const CURRENT_USER = gql`
  query {
    currentUser {
      id
      name
      image {
        id
        address
      }
    }
  }
`;


export const GET_TEAM_INVITATION = gql`
  query GetTeamInvitation($id: ID!) {
    getTeamInvitation(id: $id) {
      id
      status {
        id
        name
      }
      team {
        id
        name
      }
    }
  }
`;

export const UPDATE_TEAM_INVITATION_ACCEPTED = gql`
  mutation UpdateTeamInvitationAccepted($id: ID!) {
    updateTeamInvitationAccepted(id: $id)
  }
`;

export const UPDATE_TEAM_INVITATION_DENIED = gql`
  mutation UpdateTeamInvitationDenied($id: ID!) {
    updateTeamInvitationDenied(id: $id)
  }
`;


function Join() {
  const router = useRouter();
  const classes = useStyles();

  const results = [
    [null, useQuery(CURRENT_USER)],
    [null, useQuery(GET_TEAM_INVITATION, {variables: {id: router.query.invitation}})],
    useMutation(UPDATE_TEAM_INVITATION_ACCEPTED),
    useMutation(UPDATE_TEAM_INVITATION_DENIED),
  ];
  const [currentUser, getTeamInvitation, updateTeamInvitationAccepted, updateTeamInvitationDenied] = results.map(result => result[0]);
  const user = results[0][1].data?.currentUser;
  const invitation = results[1][1].data?.getTeamInvitation;

  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />;

  return (
    <Layout>
      <FullScreenDialogBox titleBar=<PageTitleBar title="Invitation" icon=<CheckIcon /> />>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={12} align="center">
            <Avatar className={classes.avatar}
              alt={invitation.team.name}
              src={null}
              variant="circle"
            >
              {invitation.team.name.charAt(0).toUpperCase()}
            </Avatar>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h4">
              {"You are invited to team "}
              {invitation.team.name}{"."}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h5">Do you want to join?</Typography>
          </Grid>
          <Grid item align="center">
            <form
              onSubmit={e => {
                e.preventDefault();
                updateTeamInvitationAccepted({ variables: { id: router.query.invitation }});
                router.push(`/teams/${invitation.team.id}`);
              }}
            >
              <Box align="center">
                <Button variant="outlined" type="submit">Accept</Button>
              </Box>
            </form>
          </Grid>
          <Grid item align="center">
            <form
              onSubmit={e => {
                e.preventDefault();
                updateTeamInvitationDenied({ variables: { id: router.query.invitation }});
                router.back();
              }}
            >
              <Box align="center">
                <Button variant="outlined" type="submit">Deny</Button>
              </Box>
            </form>
          </Grid>
        </Grid>
      </FullScreenDialogBox>
    </Layout>
  );
}

export default withAuth(Join);
import { makeStyles } from '@material-ui/styles';
import { useRouter } from 'next/router';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';

import withAuthServerSide from '../../utils/withAuthServerSide';
import { mutateToBackend, queryToBackend } from "../../utils/requestToBackend";
import {
  GetTeamInvitationQueryBuilder,
  UpdateTeamInvitationAcceptedMutationBuilder,
  UpdateTeamInvitationDeniedMutationBuilder,
} from '../../queries/team';

import FullScreenDialogBox from '../../components/FullScreenDialogBox';
import Layout from '../../components/Layout';
import PageTitleBar from '../../components/PageTitleBar';


const useStyles = makeStyles(() => ({
  avatar: {
    fontSize: 48,
    height: '7.5rem',
    margin: '0rem',
    width: '7.5rem'
  },
}));

export const getServerSideProps = withAuthServerSide(async ({ context, currentUser }) => {
  const teamInvitationResult = await queryToBackend({
    context,
    query: new GetTeamInvitationQueryBuilder().build(),
    variables: {
      id: context.query.invitation,
    },
  });

  return {
    props: {
      currentUser,
      teamInvitation: teamInvitationResult.data.getTeamInvitation,
    },
  };
});

function Join({ currentUser, teamInvitation }) {
  const router = useRouter();
  const classes = useStyles();

  return (
    <Layout>
      <FullScreenDialogBox titleBar={<PageTitleBar title="Invitation" icon={<CheckIcon />} />}>
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
                mutateToBackend({
                  mutation: new UpdateTeamInvitationAcceptedMutationBuilder().build(),
                  variables: {
                    id: teamInvitation.id,
                  }
                });
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
                mutateToBackend({
                  mutation: new UpdateTeamInvitationDeniedMutationBuilder().build(),
                  variables: {
                    id: teamInvitation.id,
                  }
                });
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

export default Join;

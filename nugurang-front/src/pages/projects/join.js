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
import {
  mutateToBackend,
  queryToBackend,
} from "../../utils/requestToBackend";
import {
  GetProjectInvitationQueryBuilder,
  UpdateProjectInvitationAcceptedMutationBuilder,
  UpdateProjectInvitationDeniedMutationBuilder,
} from '../../queries/project';

import FullScreenDialogBox from '../../components/FullScreenDialogBox';
import Layout from '../../components/Layout';

const useStyles = makeStyles(() => ({
  avatar: {
    fontSize: 48,
    height: '7.5rem',
    margin: '0rem',
    width: '7.5rem'
  },
}));

export const getServerSideProps = withAuthServerSide( async ({ context, currentUser }) => {
  const invitationResult = await queryToBackend({
    context,
    query: new GetProjectInvitationQueryBuilder().build(),
    variables: {
      id: context.query.invitation,
    },
  });

  if (!invitationResult.data.GetProjectInvitation) {
    return {
      notFound: true,
    };
  };

  return {
    props: {
      currentUser,
      invitation: invitationResult.data.GetProjectInvitation,
    },
  };
});

function Join({ currentUser, invitation }) {
  const router = useRouter();
  const classes = useStyles();

  return (
    <Layout>
      <FullScreenDialogBox titleBar={<PageTitleBar title="Invitation" icon={<CheckIcon />} />}>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={12} align="center">
            <Avatar className={classes.avatar}
              alt={currentUser.name}
              src={currentUser.image ? currentUser.image.address : null}
              variant="circle"
            >
              {currentUser.name.charAt(0).toUpperCase()}
            </Avatar>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h4">
              {"You are invited to project "}
              {invitation.project.name}
              {"."}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h5">Do you want to join?</Typography>
          </Grid>
          <Grid item align="center">
            <form
              onSubmit={async e => {
                e.preventDefault();
                await mutateToBackend({
                  mutation: new UpdateProjectInvitationAcceptedMutationBuilder().build(),
                  variables: {
                    id: invitation.id,
                  }
                });
                router.push(`/projects/${invitation.project.id}`);
              }}
            >
              <Box align="center">
                <Button variant="contained" type="submit">Accept</Button>
              </Box>
            </form>
          </Grid>
          <Grid item align="center">
            <form
              onSubmit={async e => {
                e.preventDefault();
                await mutateToBackend({
                  mutation: new UpdateProjectInvitationDeniedMutationBuilder().build(),
                  variables: {
                    id: invitation.id,
                  }
                });
                router.back();
              }}
            >
              <Box align="center">
                <Button variant="contained" type="submit">Deny</Button>
              </Box>
            </form>
          </Grid>
        </Grid>
      </FullScreenDialogBox>
    </Layout>
  );
}

export default Join;

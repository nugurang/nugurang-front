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
import { queryToBackend } from "../../utils/requestToBackend";
import { GetTeamQueryBuilder } from '../../queries/team';

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

export const getServerSideProps = withAuthServerSide( async ({ context, currentUser }) => {
  const teamResult = await queryToBackend({
    context,
    query: new GetTeamQueryBuilder().withProjects().build(),
    variables: {
      id: context.query.team,
    },
  });

  if (!teamResult.data.getTeam) {
    return {
      notFound: true,
    };
  };

  return {
    props: {
      currentUser,
      team: teamResult.data.getTeam,
    },
  };
});

function Join({ currentUser, team }) {
  const router = useRouter();
  const classes = useStyles();

  return (
    <Layout>
      <FullScreenDialogBox titleBar={<PageTitleBar title="Match joined!" icon={<CheckIcon />} />}>
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
              {"Your match request is finished and joined the team "}
              {team.name}{"."}
            </Typography>
          </Grid>
          <Grid item align="center">
            <Box align="center">
              <Button
                variant="outlined"
                type="submit"
                onSubmit={() => router.push(`/teams/${team.id}`)}
              >
                Go to team
              </Button>
            </Box>
          </Grid>
        </Grid>
      </FullScreenDialogBox>
    </Layout>
  );
}

export default Join;

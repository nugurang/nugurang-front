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
import { GetEventQueryBuilder } from '../../queries/event';

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
  const eventResult = await queryToBackend({
    context,
    query: new GetEventQueryBuilder().build(),
    variables: {
      id: context.query.event,
    },
  });

  if (!eventResult.data.getEvent) {
    return {
      notFound: true,
    };
  };

  return {
    props: {
      currentUser,
      event: eventResult.data.getEvent,
    },
  };
});

function Failed({ currentUser, event }) {
  const router = useRouter();
  const classes = useStyles();

  return (
    <Layout>
      <FullScreenDialogBox titleBar={<PageTitleBar title="Match request failed" icon={<CheckIcon />} />}>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={12} align="center">
            <Avatar className={classes.avatar}
              alt={user.name}
              src={user.image ? user.image.address : null}
              variant="circle"
            >
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h4">
              {"Your match request is expired."}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Box align="center">
              <Button variant="contained" onClick={() => router.push(`/home`)}>Go Home</Button>
            </Box>
          </Grid>
        </Grid>
      </FullScreenDialogBox>
    </Layout>
  );
}

export default Failed;

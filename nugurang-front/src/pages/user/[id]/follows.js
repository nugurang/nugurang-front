import React from 'react';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';

import withAuthServerSide from '../../../utils/withAuthServerSide';
import { queryToBackend } from "../../../utils/requestToBackend";
import { GetUserQueryBuilder } from '../../../queries/user';

import Layout from '../../../components/Layout';
import BaseTabs from '../../../components/BaseTabs';
import NoContentsBox from '../../../components/NoContentsBox';
import PageTitleBar from '../../../components/PageTitleBar';
import SectionBox from '../../../components/SectionBox';
import UserInfoCard from '../../../components/UserInfoCard';

const TAB_PROPS = [
  {
    id: 0,
    label: "Following",
  },
  {
    id: 1,
    label: "Followers",
  },
];

export const getServerSideProps = withAuthServerSide(async ({ context }) => {
  const userResult = await queryToBackend({
    context,
    query: new GetUserQueryBuilder().withFollows().build(),
    variables: {
      id: context.query.id,
    },
  });

  if (!userResult.data.getUser) {
    return {
      notFound: true,
    };
  };

  return {
    props: {
      user: userResult.data.getUser,
    },
  };
});

function Follows({ user }) {
  const router = useRouter();
  return (
    <Layout>

      <PageTitleBar title="Follows" backButton />

      <SectionBox>
        <BaseTabs tabProps={TAB_PROPS}>
          {
            user.getFollowings && (user.getFollowings.length)
            ? <Grid container>{[user.getFollowings].flat().map((user) => <Grid item xs={12} sm={6} md={4}><UserInfoCard user={user} /></Grid>)}</Grid>
            : <NoContentsBox />
          }
          {
            user.getFollowers && (user.getFollowers.length)
            ? <Grid container>{[user.getFollowers].flat().map((user) => <Grid item xs={12} sm={6} md={4}><UserInfoCard user={user} /></Grid>)}</Grid>
            : <NoContentsBox />
          }
        </BaseTabs>
      </SectionBox>

    </Layout>
  );
}

export default Follows;

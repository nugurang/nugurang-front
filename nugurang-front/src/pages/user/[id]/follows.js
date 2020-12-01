import React from 'react';
import {useRouter} from 'next/router';
import { gql, useQuery } from '@apollo/client';
import Grid from '@material-ui/core/Grid';

import Layout from '../../../components/Layout';
import BaseTabs from '../../../components/BaseTabs';
import GraphQlError from '../../../components/GraphQlError';
import Loading from '../../../components/Loading';
import NoContentsBox from '../../../components/NoContentsBox';
import PageTitleBar from '../../../components/PageTitleBar';
import SectionBox from '../../../components/SectionBox';
import UserInfoCard from '../../../components/UserInfoCard';
import withAuth from '../../../components/withAuth';


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


export const GET_USER = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      id
      getFollowings(page: 0, pageSize: 100) {
        id
        name
        image{
          id
          address
        }
        email
        biography
      }
      getFollowers(page: 0, pageSize: 100) {
        id
        name
        image{
          id
          address
        }
        email
        biography
      }
    }
  }
`;


function Follows() {
  const router = useRouter();
  const responses = [
    useQuery(GET_USER, {variables: {id: router.query.id}})
  ];
  const errorResponse = responses.find((response) => response.error)
  if (errorResponse)
    return <GraphQlError error={errorResponse.error} />

  if (responses.some((response) => response.loading))
    return <Loading />;

  const user = responses[0].data.getUser;

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

export default withAuth(Follows);
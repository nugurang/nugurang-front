import React from 'react';
import {useRouter} from 'next/router';
import { gql, useQuery } from '@apollo/client';

import Layout from '../../../components/Layout';
import BaseTabs from '../../../components/BaseTabs';
import GraphQlError from '../../../components/GraphQlError';
import Loading from '../../../components/Loading';
import PageTitleBar from '../../../components/PageTitleBar';
import SectionBox from '../../../components/SectionBox';
import UserInfoCardGrid from '../../../components/UserInfoCardGrid';
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
          <UserInfoCardGrid items={user.getFollowings} link="/user" xs={12} sm={6} md={4} />
          <UserInfoCardGrid items={user.getFollowers} link="/user" xs={12} sm={6} md={4} />
        </BaseTabs>
      </SectionBox>

    </Layout>
  );
}

export default withAuth(Follows);
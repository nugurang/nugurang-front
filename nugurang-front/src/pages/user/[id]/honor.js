import React from 'react';
import {useRouter} from 'next/router';
import { gql, useQuery } from '@apollo/client';

import Layout from '../../../components/Layout';

import GraphQlError from '../../../components/GraphQlError';
import HonorBadgeGrid from '../../../components/HonorBadgeGrid';
import Loading from '../../../components/Loading';
import PageTitleBar from '../../../components/PageTitleBar';
import SectionBox from '../../../components/SectionBox';
import withAuth from '../../../components/withAuth';


const TEST_HONOR_BADGE_LIST = [
  {
    id: 0,
    name: "Pikachu",
    image: "/static/images/sample_1.jpg",
    score: "1000000",
  },
  {
    id: 1,
    name: "Raichu",
    image: "/static/images/sample_1.jpg",
    score: "2000000",
  },
  {
    id: 2,
    name: "Charmander",
    image: "/static/images/sample_1.jpg",
    score: "3000000",
  },
  {
    id: 3,
    name: "Squirtle",
    image: "/static/images/sample_1.jpg",
    score: "4000000",
  },
]


export const GET_USER = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      id
      honors {
        honor
        position {
          id
          name
        }
      }
    }
  }
`;

function Honor() {
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

      <PageTitleBar title="Honor badges" backButton />

      <SectionBox>
        <HonorBadgeGrid items={TEST_HONOR_BADGE_LIST} />
      </SectionBox>

    </Layout>
  );
}

export default withAuth(Honor);
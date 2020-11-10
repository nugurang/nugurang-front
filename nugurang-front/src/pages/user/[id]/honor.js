import React from 'react';
import {useRouter} from 'next/router';
import { gql, useQuery } from '@apollo/client';
import Grid from'@material-ui/core/Grid';

import GraphQlError from '../../../components/GraphQlError';
import HonorCard from '../../../components/HonorCard';
import Layout from '../../../components/Layout';
import Loading from '../../../components/Loading';
import NoContentsBox from '../../../components/NoContentsBox';
import PageTitleBar from '../../../components/PageTitleBar';
import SectionBox from '../../../components/SectionBox';
import withAuth from '../../../components/withAuth';


const TEST_HONOR_BADGE_LIST = [
  {
    id: 0,
    name: "Pikachu",
    image: {
      id: 0,
      address: "/static/images/sample_1.jpg",
    },
    score: "1000000",
  },
  {
    id: 1,
    name: "Raichu",
    image: {
      id: 0,
      address: "/static/images/sample_1.jpg",
    },
    score: "2000000",
  },
  {
    id: 2,
    name: "Charmander",
    image: {
      id: 0,
      address: "/static/images/sample_1.jpg",
    },
    score: "3000000",
  },
  {
    id: 3,
    name: "Squirtle",
    image: {
      id: 0,
      address: "/static/images/sample_1.jpg",
    },
    score: "4000000",
  },
];


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
        {
          recentEvents && (recentEvents.length)
          ? <Grid container>{[TEST_HONOR_BADGE_LIST].flat().map((honor) => <Grid item xs={4} sm={3} md={2}><HonorCard honor={honor} /></Grid>)}</Grid>
          : <NoContentsBox />
        }
      </SectionBox>
    </Layout>
  );
}

export default withAuth(Honor);
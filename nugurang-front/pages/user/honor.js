import React from 'react';
/* import { gql, useQuery } from '@apollo/client'; */

import Layout from '../../components/Layout';

import HonorBadgeGrid from '../../components/HonorBadgeGrid';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';


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


/*
function getData() {
  const { loading, error, data } = useQuery(gql`
    query {
      userInfo {
        getUser(
          id: {userId}
        ) {
          id
          name
          email
          image
          biography
          followers
          followings
          blog {
            id
            threads
          }
          honors
        }
      }
    }
  `);
  if (loading)
    return (<p>Loading...</p>);
  if (error) {
    console.log(error);
  }
  return data;
}
*/

export default function Home() {
  /* const data = getData(); */
  return (
    <Layout>

      <SectionTitleBar title="My honor badges" backButton backButtonLink="/user" />

      <SectionBox>
        <HonorBadgeGrid items={TEST_HONOR_BADGE_LIST} />
      </SectionBox>

    </Layout>
  );
}

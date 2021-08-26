import React from 'react';
import { useRouter } from 'next/router';
import Grid from'@material-ui/core/Grid';

import withAuthServerSide from '../../../utils/withAuthServerSide';
import { queryToBackend } from "../../../utils/requestToBackend";
import { GetUserQueryBuilder } from '../../../queries/user';

import HonorCard from '../../../components/HonorCard';
import Layout from '../../../components/Layout';
import NoContentsBox from '../../../components/NoContentsBox';
import PageTitleBar from '../../../components/PageTitleBar';
import SectionBox from '../../../components/SectionBox';


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

export const getServerSideProps = withAuthServerSide(async ({ context }) => {
  const userResult = await queryToBackend({
    context,
    query: new GetUserQueryBuilder().withHonors().build(),
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

function Honor({ user }) {
  const router = useRouter();
  return (
    <Layout>
      <PageTitleBar title="Honor badges" backButton />
      <SectionBox>
        {
          user.honors && user.honors.length
          ? <Grid container>{user.honors.flat().map((honor) => <Grid item xs={4} sm={3} md={2}><HonorCard honor={honor} /></Grid>)}</Grid>
          : <NoContentsBox />
        }
      </SectionBox>
    </Layout>
  );
}

export default Honor;

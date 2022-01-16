import { useRouter } from 'next/router';
import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import withAuthServerSide from '../../utils/withAuthServerSide';
import { queryToBackend } from "../../utils/requestToBackend";
import { GetAllTaskPositionsQueryBuilder } from '../../queries/task';

import Layout from '../../components/Layout';
import NoContentsBox from '../../components/NoContentsBox';
import PageTitleBar from '../../components/PageTitleBar';
import PositionInfoCard from '../../components/PositionInfoCard';
import SectionBox from '../../components/SectionBox';

export const getServerSideProps = withAuthServerSide( async ({ context }) => {
  const allTaskPositionsResult = await queryToBackend({
    context,
    query: new GetAllTaskPositionsQueryBuilder().build(),
  });

  return {
    props: {
      allTaskPositions: allTaskPositionsResult.data.positions,
    },
  };
});

function Positions({ allTaskPositions }) {
  const router = useRouter();
  return (
    <Layout>
      <PageTitleBar title="Positions" backButton />
      <Container maxWidth="md">
        <SectionBox>
          {
          allTaskPositions && allTaskPositions.length
          ? <Grid container>{[allTaskPositions].flat().map((position) => <Grid item xs={12} sm={6} md={4}><PositionInfoCard position={position} /></Grid>)}</Grid>
          : <NoContentsBox />
        }
        </SectionBox>
      </Container>
    </Layout>
  );
}

export default Positions;

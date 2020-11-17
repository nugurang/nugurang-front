import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

import CodeIcon from '@material-ui/icons/Code';
import QueueIcon from '@material-ui/icons/Queue';

import { BACKEND_ADDR } from '../../config';
import withAuth from '../../components/withAuth';
import BaseListItem from '../../components/BaseListItem';
import GraphQlError from '../../components/GraphQlError';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import NoContentsBox from '../../components/NoContentsBox';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import UserInfoBox from '../../components/UserInfoBox';
import YesNoDialog from '../../components/YesNoDialog';


export const POSITIONS = gql`
  query Positions {
    positions {
      id
      name
      description
      image {
        id
        address
      }
    }
  }
`;


function Positions() {
  const router = useRouter();

  const results = [
    [null, useQuery(POSITIONS)],
  ];
  const allPositions = results[0][1].data ? results[0][1].data.positions : null;

  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />;

  return (
    <Layout>
      <PageTitleBar title="Positions" backButton />
      <Container maxWidth="md">
        <SectionBox>
        {
          allPositions && (allPositions.length)
          ? <List>{[allPositions].flat().map((position) => <BaseListItem avatar={position.image ? position.image.address : null} primary={position.name} secondary={position.description} />)}</List>
          : <NoContentsBox />
        }
        </SectionBox>
      </Container>
    </Layout>
  );
}

export default withAuth(Positions);
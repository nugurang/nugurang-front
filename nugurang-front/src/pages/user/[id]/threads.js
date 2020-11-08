import { useRouter } from 'next/router';
import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Button from '@material-ui/core/Button';

import { COMMON_BOARDS, EVENT_BOARDS } from '../../../config';
import withAuth from '../../../components/withAuth';
import Loading from '../../../components/Loading';
import GraphQlError from '../../../components/GraphQlError';
import BaseSwitch from '../../../components/BaseSwitch';
import Layout from '../../../components/Layout';
import SectionTitleBar from '../../../components/SectionTitleBar';
import SectionBox from '../../../components/SectionBox';
import ThreadGrid from '../../../components/ThreadGrid';
import ThreadList from '../../../components/ThreadList';


export const GET_USER = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      image {
        id
        address
      }
      getThreads(page: 0, pageSize: 5) {
        id
        name
        upCount
        commentCount
        user {
          name
          image {
            address
          }
        }
        firstArticle {
          images {
            address
          }
        }
      }
    }
  }
`;


function UserThreads() {
  const router = useRouter();
  const results = [
    [null, useQuery(GET_USER, {variables: {id: router.query.id}})],
  ];
  const user = results[0][1].data ? results[0][1].data.getUser : null;
  const threads = results[0][1].data ? results[0][1].data.getUser.getThreads : null;
  const [getUser] = results.map(result => result[0]);
  console.log(threads);
  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />

  return (
    <Layout>
      <SectionTitleBar title="Threads" backButton/>

      <SectionBox
        titleBar={
          <SectionTitleBar title={user.name} icon={<AssignmentIcon />} />
        }
      >
        <ThreadList items={threads} />
      </SectionBox>

    </Layout>
  );
}

export default withAuth(UserThreads);
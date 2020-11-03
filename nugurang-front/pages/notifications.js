import React from 'react';

import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import Layout from '../components/Layout';
import SectionTitleBar from '../components/SectionTitleBar';
import SectionBox from '../components/SectionBox';
import NotificationList from '../components/NotificationList';
import Loading from '../components/Loading';
import GraphQlError from '../components/GraphQlError';
import withAuth from '../components/withAuth';

const GET_NOTIFICATIONS = gql`
  query GetNotifications {
  currentUser {
    getNotifications(page: 0, pageSize: 100){
      id
      title
      content
      createdAt
      }
    }
  }
`

const TEST_NOTIFICATION_LIST = [
  {
    id: 0,
    title: "New Comments",
    content: "I don't think so",
    createdAt: "11/01 13:11",
    link: "/threads/904",
  },
  {
    id: 1,
    title: "New Comments",
    content: "I agree with you",
    createdAt: "11/02 15:23",
    link: "/threads/896",
  },
  {
    id: 2,
    title: "New Comments",
    content: "I don't know",
    createdAt: "11/04 18:37",
    link: "/threads/896",
    },
  {
    id: 3,
    title: "New Comments",
    content: "I don't know",
    createdAt: "11/05 11:52",
    link: "/threads/896",
    },
  {
    id: 4,
    title: "New Comments",
    content: "I don't know",
    createdAt: "11/06 7:26",
    link: "/threads/896",
  },
];

function Notifications(){
    const router = useRouter();
    const responses = [useQuery(GET_NOTIFICATIONS, {variables: {id: router.query.id}}),]
    const errorResponse = responses.find((response) => response.error)

    if (errorResponse)
      return <GraphQlError error={errorResponse.error} />

    if (responses.some((response) => response.loading))
      return <Loading />;
    //const notifications = responses[0].data;
    return(
      <Layout>
        <SectionTitleBar title="Notifications" backButton />
        <SectionBox>
          <NotificationList items={TEST_NOTIFICATION_LIST} />
        </SectionBox>
      </Layout>
    );
}

export default withAuth(Notifications);
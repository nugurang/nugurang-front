import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import List from '@material-ui/core/List';

import withAuth from '../../components/withAuth';
import GraphQlError from '../../components/GraphQlError';
import NotificationListItem from '../../components/NotificationListItem';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';


export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      oauth2Provider
      oauth2Id
      name
      getNotifications(page: 0, pageSize: 100) {
        id
        createdAt
        data
        type {
          id
          name
        }
      }
    }
  }
`;

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

  const results = [
    [null, useQuery(CURRENT_USER)],
  ];
  const user = results[0][1].data?.currentUser;
  const allNotifications = results[0][1].data?.currentUser.getNotifications;

  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />;

  allNotifications.forEach(function(notification){
    notification.onClick = () => router.push(`/notifications/test/${notification.data[0]}`);
  });

  return(
    <Layout>
      <PageTitleBar title="Notifications" backButton />
      <SectionBox>
        <List>
          {[TEST_NOTIFICATION_LIST].flat().map((notification) => <NotificationListItem notification={notification} />)}
        </List>
      </SectionBox>
    </Layout>
  );
}

export default withAuth(Notifications);
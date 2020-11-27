import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import List from '@material-ui/core/List';

import withAuth from '../../components/withAuth';
import GraphQlError from '../../components/GraphQlError';
import NotificationListItem from '../../components/NotificationListItem';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import NoContentsBox from '../../components/NoContentsBox';
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
        isRead
        createdAt
        data
        type {
          id
          name
        }
        user {
          id
          name
          image {
            id
            address
          }
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
    if (notification.type.name == "TEAM_INVITATION") {
      notification.onClick = () => router.push({pathname: "/teams/join", query: { invitation: notification.data[0] }});
    } else if (notification.type.name == "PROJECT_INVITATION") {
      notification.onClick = () => router.push({pathname: "/projects/join", query: { invitation: notification.data[0] }});
    }
  });

  return(
    <Layout>
      <PageTitleBar title="Notifications" backButton />
      <SectionBox>
        <List>
          {
            user.getNotifications && user.getNotifications.length
            ? [user.getNotifications].flat().map((notification) => <NotificationListItem notification={notification} />)
            : <NoContentsBox />
          }        
        </List>
      </SectionBox>
    </Layout>
  );
}

export default withAuth(Notifications);
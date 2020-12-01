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
    } else if (notification.type.name == "MATCH_SUCCESS") {
      notification.onClick = () => router.push({pathname: "/match/join", query: { matchType: notification.data[0], event: notification.data[1], team: notification.data[2] }});
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
import React from 'react';
import { useRouter } from 'next/router';
import List from '@material-ui/core/List';

import withAuthServerSide from '../../utils/withAuthServerSide';
import { queryToBackend } from "../../utils/requestToBackend";
import { GetCurrentUserQueryBuilder } from '../../queries/user';

import NotificationListItem from '../../components/NotificationListItem';
import Layout from '../../components/Layout';
import NoContentsBox from '../../components/NoContentsBox';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';

export const getServerSideProps = withAuthServerSide( async ({ context }) => {
  const currentUserResult = await queryToBackend({
    context,
    query: new GetCurrentUserQueryBuilder().withNotifications().build(),
  });

  return {
    props: {
      currentUser: currentUserResult.data.getCurrentUser,
      notifications: currentUserResult.data.getCurrentUser.getNotifications,
    },
  };
});

function Notifications({ currentUser, notifications }) {
  const router = useRouter();

  notifications.forEach(function(notification){
    if (notification.type.name == "TEAM_INVITATION") {
      notification.onClick = () => router.push({pathname: "/teams/join", query: { invitation: notification.data[0] }});
    } else if (notification.type.name == "PROJECT_INVITATION") {
      notification.onClick = () => router.push({pathname: "/projects/join", query: { invitation: notification.data[0] }});
    } else if (notification.type.name == "MATCH_SUCCESS") {
      notification.onClick = () => router.push({pathname: "/match/join", query: { matchType: notification.data[0], event: notification.data[1], team: notification.data[2] }});
    } else if (notification.type.name == "MATCH_FAILURE") {
      notification.onClick = () => router.push({pathname: "/match/failed", query: { matchType: notification.data[0], event: notification.data[1] }});
    }
  });

  return(
    <Layout>
      <PageTitleBar title="Notifications" backButton />
      <SectionBox>
        <List>
          {
            currentUser.getNotifications && currentUser.getNotifications.length
            ? [currentUser.getNotifications].flat().map((notification) => <NotificationListItem notification={notification} />)
            : <NoContentsBox />
          }        
        </List>
      </SectionBox>
    </Layout>
  );
}

export default Notifications;

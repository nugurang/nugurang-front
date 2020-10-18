import React from 'react';
import Grid from '@material-ui/core/Grid';
import Layout from '../components/Layout';
import PageTitleBox from '../components/PageTitleBox';
import TeamInfoBox from '../components/TeamInfoBox';
import FixedTabs from '../components/FixedTabs';
import UserGroupCard from '../components/UserGroupCard';
import UserBriefInfoBox from '../components/UserBriefInfoBox';

const teamTest = {
  name: "Teamname",
  image: "/static/favicon/favicon-nugurang.png",
  bio: "BioBioBioBioBioBioBioBioBioBioBoBioBoBioBioBoBioBioBioBoBioBioBoBioBioBoBioBioBoBioBioBio",
  statistic : null
}

const userGroupTest = {
  id: 1,
  title: "Article 1",
  content: "Article 1 content",
  image: "/static/images/sample_1.jpg",
  users:[
    {
      id: 1,
      name: "User 1",
      image: "/static/images/sample_2.jpg",
      followers: 10,
      followings: 20,
      bio: "Bio"
    },
    {
      id: 2,
      name: "User 2",
      image: "/static/images/sample_3.jpg",
      followers: 10,
      followings: 20,
      bio: "Bio"
    },
    {
      id: 3,
      name: "User 3",
      image: "/static/images/sample_4.jpg",
      followers: 10,
      followings: 20,
      bio: "Bio"
    },
  ]
};

const panelTest={
  panels :[
    {
      id: 1,
      title: "Projects"
    },
    {
      id: 2,
      title: "Teammates"
    },
    {
      id: 3,
      title: "Competition"
    }
  ],
}


export default function TeamProfile() {


  return (
    <Layout>
      <PageTitleBox title="Team Profile" />
      <TeamInfoBox team={teamTest} />
      <Grid container spacing={2} alignItems="center" direction="row" justify="space-evenly">
        <FixedTabs panelGroup={panelTest}>
          <UserGroupCard userGroup={userGroupTest} />
          {userGroupTest.users.map(user=> (
            <UserBriefInfoBox user={user} />
          ))}
          <UserGroupCard userGroup={userGroupTest} />
        </FixedTabs>
      </Grid>
    </Layout>

  );
}

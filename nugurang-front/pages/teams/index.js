import React from 'react';

import GroupIcon from '@material-ui/icons/Group';

import Layout from '../../components/Layout';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import TeamList from '../../components/TeamList';



const TEST_TEAM_LIST = [
  {
    id: 0,
    name: "Test team name",
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
    ],
  },
  {
    id: 1,
    name: "Test team name",
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
    ],
  },
]


export default function TeamProfile() {


  return (
    <Layout>

      <SectionTitleBar title="Teams" backButton="true" />

      <SectionBox
        titleBar={<SectionTitleBar title="My teams" icon={<GroupIcon />} />}
      >
        <TeamList items={TEST_TEAM_LIST} />
      </SectionBox>

    </Layout>

  );
}

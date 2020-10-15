import React from 'react';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import QueueIcon from '@material-ui/icons/Queue';

import Layout from '../components/Layout';

import ContentPaper from '../components/ContentPaper';
import PageTitleBox from '../components/PageTitleBox';
import SectionTitleBox from '../components/SectionTitleBox';
import UniversalButton from '../components/UniversalButton';
import UniversalList from '../components/UniversalList';
import UserBriefInfoBox from '../components/UserBriefInfoBox';


const userTest = {
  name: "Username",
  image: "/static/favicon/favicon-nugurang.png",
  statistics: "Statistics",
  bio: "Bio"
}

const settingsTest = [
  {
    id: 1,
    primary: "Message",
  },
  {
    id: 2,
    primary: "Display",
  },
  {
    id: 3,
    primary: "Notification",
  },
  {
    id: 4,
    primary: "General",
  },
];


export default function More() {
  return (
    <Layout>
      <PageTitleBox title="More" />

      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item xs={12} sm={8}>
          <UserBriefInfoBox user={userTest} />
        </Grid>
        <Grid item xs={12} sm={4} align="right">
          <Link href="/user">
            <UniversalButton label="My Info" />
          </Link>
          <Link href="/signin">
            <UniversalButton label="Sign In" />
          </Link>
        </Grid>
      </Grid>

      <SectionTitleBox title="More features" icon={<QueueIcon />} />
      <ContentPaper>
        <UniversalList list={settingsTest} />
      </ContentPaper>
    </Layout>
  );
}
